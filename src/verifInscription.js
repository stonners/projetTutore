$("#verif").on('click',verifInscrip);

function verifInscrip(){
    let correct =true;
    let erreur="";
    let focus=false;
    $("#nom").css("border","2px solid black");
    $("#prenom").css("border","2px solid black");
    $("#email").css("border","2px solid black");
    $("#password").css("border","2px solid black");
    $("#confPassword").css("border","2px solid black");


    if($("#nom").val() ==""){
        $("#nom").css("border","2px solid red");
        correct =false;
        if(focus===false){
            $("#nom").focus();
            focus=true;
        }
    }
    if($("#prenom").val() ==""){
        $("#prenom").css("border","2px solid red");
        correct =false;
        if(focus===false){
            $("#prenom").focus();
            focus=true;
        }
    }
    if($("#email").val() ==""){
        $("#email").css("border","2px solid red");
        correct =false;
        if(focus===false){
            $("#email").focus();
            focus=true;
        }
    }
    if($("#password").val() ==""){
        $("#password").css("border","2px solid red");
        correct =false;
        if(focus===false){
            $("#password").focus();
            focus=true;
        }
    }
    if($("#confPassword").val() ==""){
        $("#confPassword").css("border","2px solid red");
        correct =false;
        if(focus===false){
            $("##confPassword").focus();
            focus=true;
        }
    }
    if(new String($("#password").val())== new String($("#confPassword").val())) {
        correct =false;
        if(focus===false){
            $("#password").focus();
            focus=true;
        }
    }
    if(correct==false){
        console.log($("#password").val());
        console.log($("#confPassword").val());
        let text="veullier remplir les champs en rouge";
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");
    }
    else{
        fetch('http://localhost:3000/users/inscription?nom='+$("#nom").val()+'&prenom='+$("#prenom").val()+'&email='+$("#email").val()+'&password='+$("#password").val(), {
            method: 'GET'

        }).then(response => response.json())
            .then(json => reponseVerif(json))
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });
    }
}

function reponseVerif(rep){
    if(rep['id']!==-1){
        let text="se nom email est déja utilisé";
        $("#email").css("border","2px solid red");
        $("#erreur").text(text) ;
        $("#erreur").css("visibility","visible");
    }
    else{
        let text="identifiant incorrecte";
        $("#erreur").text(text) ;

    }
}