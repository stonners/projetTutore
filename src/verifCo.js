$("#verif").on('click',verifInf);

function verifInf(){

    if($("#password").val() !=="" && $("#username").val() !==""){

        $("#erreur").css("visibility","hidden");

    }
    else{
        let text="veullier remplir les champs";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");

    }
}