function QuizzSolo() {
    document.location.href = "quizzSolo.html";
}

function QuizzDuo() {
    document.location.href = "quizzDuo.html";
}


let api = 'http://projetarendre/api/user/infoUsers?token=' + sessionStorage.getItem('token');
fetch(api, {
    method: 'GET'
}).then(response => response.json())
    .then(json => Info(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });

function Info(rep) {
    if (rep == 0)
        document.location = 'index.html';
    $("#point").text(rep.points);
    $("#classement").text(rep['rang'] + '/' + rep['total']);
}