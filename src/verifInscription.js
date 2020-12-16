$("#verif").on('click',verifInscrip);

function verifInscrip(){
    let correct =true;
    let erreur="";

    if($("#nom").val() !==""){
        erreur+="remplire le nom ";
        correct =false;
    }
    if($("#prenom").val() !==""){
        erreur+="remplire le prenom ";
        correct =false;
    }
    if($("#email").val() !==""){
        erreur+="remplire l'email ";
        correct =false;
    }
    if($("#password").val() !==""){
        erreur+="remplire le mot de passe ";
        correct =false;
    }
    if($("#confPassword").val() !==""){
        erreur+="remplire le confirme mot de passe ";
        correct =false;
    }
    if($("#nom").val() !== $("#confPassword").val() ){
        erreur+="le mot de passe et différent du mot de passe confirme";
        correct =false;
    }
    if(correct==false){
        let text="veullier remplir les champs";
        $("#erreur").text(text) ;
    }
    else{
       console.log("reussi")
    }
}

function reponseVerif(rep){
    if(rep['id']!==-1){
    }
    else{
        let text="identifiant incorrecte";
        $("#erreur").text(text) ;
    }
}