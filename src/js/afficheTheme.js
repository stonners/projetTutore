let MainDiv = document.getElementById("MainDiv");
let text = document.getElementById("text");

text.innerText = "Veuiller choisir un thème";

text.setAttribute("class", "h1");
text.setAttribute("id", "question");
MainDiv.appendChild(text);


fetch('http://projetarendre/api/themes', {
    method: 'GET'

}).then(response => response.json())
    .then(json => afficheTheme(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });

function afficheTheme(arg) {
    let option = document.createElement("option")
    let select = document.getElementById("selectTheme");
    option.innerText = "--Sélectionner un theme--";
    select.appendChild(option);


    for (let i = 0; i < arg.length; i++) {
        let option = document.createElement("option")
        option.setAttribute("align", "center");
        option.setAttribute("id", arg[i].id);

        option.setAttribute("value", arg[i].id);
        option.innerText = arg[i].name;
        select.appendChild(option);
        // buttonQuizz.setAttribute("onclick","QuizzStart("+this.text+")");


        document.getElementById("selectTheme").onchange = QuizzStart;
    }


}

function QuizzStart() {

    var chemin = window.location.pathname;
    idTheme = document.getElementById("selectTheme").value;
    if (chemin === "/html/quizzSolo.html") {
        document.location.href = "quizzSoloStart.html?data=" + idTheme;
console.log(idTheme);
    }else {
        var socket = null;
        try {
            socket = new WebSocket('ws://127.0.0.1:8889');
            socket.onopen = function () {
                socket.send(JSON.stringify({
                    type:'connect',
                    user_id: 'user'
                }));
                socket.send(JSON.stringify({
                    type:'forward',
                    user_id: 'user',
                    message:'test1'
                }));
                socket.send(JSON.stringify({
                    type:'theme',
                    themeId: idTheme

                }));
                socket.send(JSON.stringify({
                    type:'quizz_duel_start',
                    user_id: 

                }));
                console.log("test");

                return;
            };
            socket.onmessage = function (msg) {
                console.log('Message received: ', msg.data);

                return;
            };
            socket.onclose = function () {
                console.log('connection is closed!');

                return;
            };
        } catch (e) {
            console.log(e);
        }

    }
}