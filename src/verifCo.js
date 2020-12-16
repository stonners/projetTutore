$("#verif").on('click',verifInf);

function verifInf(){

    if($("#password").val() !=="" && $("#username").val() !==""){
        let text="Identifiants invalid";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");

    }
    else{
        let text="veuiller remplir les champs";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");

    }
}