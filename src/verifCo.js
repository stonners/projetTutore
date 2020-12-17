$("#verif").on('click',verifInf);

function verifInf(){

    if($("#password").val() !=="" && $("#username").val() !==""){
        fetch('http://localhost:3000/users/connection?username='+$("#username").val()+"&password="+$("#password").val(), {
            method: 'GET'

        }).then(response => response.json())
            .then(json => reponseVerif(json))
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });

    }
    else{
        let text="veuiller remplir les champs";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");

    }
}
function reponseVerif(rep){
    if(rep['id']!==-1){
        let text="Identifiants invalid";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");
    }
    else{
        let text="identifiant correcte";
        $("#erreur").text(text) ;

    }
}

