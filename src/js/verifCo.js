$("#verif").on('click', verifInf);

function verifInf() {
    if ($("#password").val() !== "" && $("#username").val() !== "") {
        let api = 'http://projetarendre/api/user/login?username=' + $("#username").val() + '&Password=' + $("#password").val();
        fetch(api, {
            method: 'GET'

        }).then(response => response.json())
            .then(json => reponseVerif(json))
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });

    } else {
        let text = "veuiller remplir les champs";
        $("#erreur").text(text);
        $("#erreur").css("visibility", "visible");

    }
}

function reponseVerif(rep) {
    if (rep === -2) {
        let text = "Identifiants invalid";
        $("#erreur").text(text);
        $("#erreur").css("visibility", "visible");
    } else {

        sessionStorage.setItem('token', rep);
        document.location = 'home.html'
    }
}

