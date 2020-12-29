$("#verif").on('click', verifInscrip);

function verifInscrip() {
    let correct = true;
    let erreur = "";
    let focus = false;
    $("#nom").css("border", "2px solid black");
    $("#prenom").css("border", "2px solid black");
    $("#email").css("border", "2px solid black");
    $("#password").css("border", "2px solid black");
    $("#confPassword").css("border", "2px solid black");
    console.log(correct);

    if ($("#nom").val() == "") {
        $("#nom").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#nom").focus();
            focus = true;
        }
    }
    console.log(correct);
    if ($("#prenom").val() == "") {
        $("#prenom").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#prenom").focus();
            focus = true;
        }
    }
    console.log(correct);
    if ($("#email").val() == "") {
        $("#email").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#email").focus();
            focus = true;
        }
    }
    console.log(correct);
    if ($("#password").val() == "") {
        $("#password").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#password").focus();
            focus = true;
        }
    }
    console.log(correct);
    if ($("#confPassword").val() == "") {
        $("#confPassword").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("##confPassword").focus();
            focus = true;
        }
    }
    console.log(correct);
    if ($("#password").val() !== $("#confPassword").val()) {
        correct = false;
        if (focus === false) {
            $("#password").focus();
            focus = true;
        }
    }
    console.log(correct);
    if (correct == false) {
        let text = "veullier remplir les champs en rouge";
        $("#erreur").text(text);
        $("#erreur").css("visibility", "visible");
        console.log(correct);
    } else {
        console.log("test");
        let firstName = $("#nom").val();
        let lastName = $("#prenom").val();
        let email = $("#email").val();
        let password = $("#password").val();

        let formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);


        fetch('http://projetarendre/api/user/inscription/', {
            method: 'POST',
            body: formData
        }).catch(function (err) {
            console.log("il y a eu un problème avec l'opération fetch : " + err.message);
        });


    }

    /*
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

    */
}