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


    if ($("#nom").val() === "") {
        $("#nom").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#nom").focus();
            focus = true;
        }
    }

    if ($("#prenom").val() === "") {
        $("#prenom").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#prenom").focus();
            focus = true;
        }
    }

    if ($("#email").val() === "") {
        $("#email").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#email").focus();
            focus = true;
        }
    }

    if (!ValidateEmail($("#email").val())) {
        $("#email").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#email").focus();
            focus = true;
        }
    }



    if ($("#password").val() === "") {
        $("#password").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#password").focus();
            focus = true;
        }
    }

    if ($("#confPassword").val() === "") {
        $("#confPassword").css("border", "2px solid red");
        correct = false;
        if (focus === false) {
            $("#confPassword").focus();
            focus = true;
        }
    }
    if ($("#password").val() !== $("#confPassword").val()) {
        correct = false;
        if (focus === false) {
            $("#password").focus();
            focus = true;
        }
    }
    if (correct === false) {
        let text = "veullier remplir les champs en rouge";
        $("#erreur").text(text);
        $("#erreur").css("visibility", "visible");
    } else {
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
        }).then(response => response.json())
            .then(json => emailVerif(json))
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });


    }
}
function emailVerif(json) {

     if (json!==0){

    window.location = "../index.html";
    }else {
        let text = "email déja utiliser !";
        $("#erreur").text(text);
        $("#erreur").css("visibility", "visible");
         $("#email").css("border", "2px solid red");
         $("#email").focus();


    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}