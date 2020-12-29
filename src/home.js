
let api='http://projetarendre/api/user/infoUsers?token='+sessionStorage.getItem('token');
fetch(api, {
    method: 'GET'
}).then(response => response.json())
    .then(json => Info(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });

function Info(rep){console.log(rep.total);
    $("#point").text(rep.points);
    $("#classement").text(rep['rang']+'/'+rep['total']);
}