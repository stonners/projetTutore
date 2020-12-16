$("#verif").on('click',verifInf);

function verifInf(){

    if($("#password").val() !=="" && $("#username").val() !==""){


    }
    else{
        let text="veullier remplir les champs";
        $("#erreur").text(text) ;
        $("#erreur").attr("display","block");

    }
}