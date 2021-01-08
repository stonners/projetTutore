function bindEvents(p) {

    p.on('error', function (error) {

        console.log('error', error);
    });

    p.on('signal', function (data) {
        document.querySelector('#offer').textContent = JSON.stringify(data);
    });

    p.on('stream', function (stream) {
        let receiverVideo = document.querySelector('#receiver-video');
        receiverVideo.volume = 0;

        try {
            receiverVideo.srcObject = stream;
            receiverVideo.play();

        } catch (e) {

        }


    });
    document.querySelector('#incoming').addEventListener('submit', function (e) {
        e.preventDefault();
        p.signal(JSON.parse(e.target.querySelector('textarea').value));
    })
}

function startPeer(initiator) {

    navigator.getUserMedia({
        video: true,
        audio: true
    }, function (stream) {
        let p = new SimplePeer({
            initiator: initiator,
            stream: stream,
            trickle: false
        });
        bindEvents(p);

        let emitterVideo = document.querySelector('#emitter-video');
        emitterVideo.volume = 0;

        try {
            emitterVideo.srcObject = stream;
            emitterVideo.play();

        } catch (e) {

        }
    }, function () {
    });
}

document.querySelector('#start').addEventListener('click', function (e) {
    startPeer(true);
});
document.querySelector('#receive').addEventListener('click', function (e) {
    startPeer(false);
});

