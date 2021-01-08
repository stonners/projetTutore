if (sessionStorage.getItem('token') === null) {
    document.location = '../index.html';
}
let api2 = 'http://projetarendre/api/token?token=' + sessionStorage.getItem('token');
fetch(api2, {
    method: 'GET'

}).then(response => response.json())
    .then(json => repToken(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });


function repToken(rep) {
    if (rep === 0) {
        document.location = '../index.html';
    }

}

function reponseVerif(rep) {
if (rep === -2) {
let text = "Identifiants invalid";
$("#erreur").text(text);
        $("#erreur").css("visibility", "visible");
    } else {
        sessionStorage.setItem('token', rep.token);
        sessionStorage.setItem('id', rep.id);
        document.location = 'html/home.html';
    }
}


