let url = window.location.href;
let idTheme = url.split("data=");
let formQuestion = new FormData();
let formReponse = new FormData();
let tabQuestionAleat = [];
let tabReponseAleat = [];
let conteurQuestion = 0;
let myVar;
fetch('http://projetarendre/api/questions/' + idTheme[1], {
    method: 'GET'

}).then(response => response.json())
    .then(json => sauvegardeQuestion(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });


function sauvegardeQuestion(arg) {
    let tabNorm = [];

    let maxQuestions = arg.length - 1;
    for (let i = 0; i < arg.length; i++) {
        tabNorm[i] = arg[i];
    }
    console.log(tabNorm)

    let var1 = entierAleatoire(0, maxQuestions);
    let var2 = entierAleatoire(0, maxQuestions);

    while (var2 === var1) {
        var2 = entierAleatoire(0, maxQuestions);
    }
    let var3 = entierAleatoire(0, maxQuestions);

    while (var3 === var1 || var3 === var2) {
        var3 = entierAleatoire(0, maxQuestions);
    }
    let var4 = entierAleatoire(0, maxQuestions);


    while (var4 === var1 || var4 === var2 || var4 === var3) {
        var4 = entierAleatoire(0, maxQuestions);
    }
    tabQuestionAleat[0] = tabNorm[var1];

    tabQuestionAleat[1] = tabNorm[var2];
    tabQuestionAleat[2] = tabNorm[var3];
    tabQuestionAleat[3] = tabNorm[var4];

    afficheQuestion(conteurQuestion);
}

function afficheQuestion(numberQuestion) {

    let MainDiv = document.getElementById("MainDiv");
    let question = document.getElementById("question");

    question.innerText = tabQuestionAleat[numberQuestion].label;

    question.setAttribute("class", "h1");
    question.setAttribute("id", "question");
    MainDiv.appendChild(question);

    sauvegardeReponse();
    clearInterval(myVar);
    counter(conteurQuestion);
    conteurQuestion++;
}


let cpt = 10;

function counter(conteur) {
    let MainDiv = document.getElementById("MainDiv");
    if (conteur < 4) {
        let divCounter = document.getElementById("counter");
        divCounter.setAttribute("class", "h1");
        divCounter.innerText = cpt + "";
        MainDiv.appendChild(divCounter);
        myVar = setInterval(function () {
            --cpt;
            if (cpt > -1) {
                divCounter.innerText = cpt + '';
            }
            if (cpt < 1) {
                console.log("c'est fini");
                /* reponseDiv = document.getElementById("reponse");
                 reponseDiv.innerText = "Temps expiré";
                 reponseDiv.style.display = "block";
                 MainDiv.appendChild(reponseDiv);

                */
                afficheQuestion(conteur++);

                cpt = 10;

            }
        }, 1000);
    } else {
        cpt = 0;
        clearInterval(myVar);
    }
}

function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sauvegardeReponse() {

    fetch('http://projetarendre/api/possibleanswer/' + tabQuestionAleat[conteurQuestion].id, {
        method: 'GET'

    }).then(response => response.json())
        .then(json => afficheReponse(json))
        .catch(function (err) {
            console.log("il y a eu un problème avec l'opération fetch : " + err.message);
        });
}

function afficheReponse(arg) {
    let tabNorm = [];

    let maxQuestions = arg.length - 1;
    for (let i = 0; i < arg.length; i++) {
        tabNorm[i] = arg[i];
    }
    console.log(tabNorm)

    let var1 = entierAleatoire(0, maxQuestions);
    let var2 = entierAleatoire(0, maxQuestions);

    while (var2 === var1) {
        var2 = entierAleatoire(0, maxQuestions);
    }
    let var3 = entierAleatoire(0, maxQuestions);

    while (var3 === var1 || var3 === var2) {
        var3 = entierAleatoire(0, maxQuestions);
    }
    let var4 = entierAleatoire(0, maxQuestions);


    while (var4 === var1 || var4 === var2 || var4 === var3) {
        var4 = entierAleatoire(0, maxQuestions);
    }
    tabReponseAleat[0] = tabNorm[var1];

    tabReponseAleat[1] = tabNorm[var2];
    tabReponseAleat[2] = tabNorm[var3];
    tabReponseAleat[3] = tabNorm[var4];
    console.log(tabReponseAleat)
    let divReponse = document.getElementById("divBlock");
    divReponse.textContent = ' ';
    for (let i = 0; i < arg.length; i++) {
        let response = document.createElement("div");

        response.innerText = tabReponseAleat[i].label;

        response.setAttribute("class", "h1");
        response.setAttribute("id", tabReponseAleat[i].id);
        response.setAttribute("style", "border:10%; margin-left: 5px; margin-right: 5px;text-align:center; width:25%;height:25%; border:1px;border: groove;border-color: crimson;");

        response.onclick = clickResponse;
        divReponse.appendChild(response);


    }
}

function clickResponse() {


    formReponse.append("idReponse" + conteurQuestion, this.id);
    clearInterval(myVar);
    if (conteurQuestion < 4) {
        cpt = 10;
        console.log(tabQuestionAleat[conteurQuestion - 1].id);
        console.log("question" + conteurQuestion);
        formQuestion.append("question" + conteurQuestion, tabQuestionAleat[conteurQuestion - 1].id);

        afficheQuestion(conteurQuestion);
    } else {
        console.log(tabQuestionAleat[conteurQuestion - 1].id);
        console.log("question" + conteurQuestion);
        formQuestion.append("question" + conteurQuestion, tabQuestionAleat[conteurQuestion - 1].id);

        user = sessionStorage.getItem("token");
        console.log(user)
        formQuestion.append("user1", user);

        fetch('http://projetarendre/api/PossibleAnswer/save/', {
            method: 'POST',
            body: formQuestion
        })
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });

        console.log(formReponse);
        fetch('http://projetarendre/api/PossibleAnswer/correction/', {
            method: 'POST',
            body: formReponse
        })
            .then(response => response.json())
            .then(json => afficheReponseBonne(json))
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });


    }
}

function afficheReponseBonne(arg) {

    let divQuestion = document.getElementById("question");
    //calculer les bonne réponses
    divQuestion.innerText = "Bravo, vous avez " + arg + " bonnes réponses";
    let divReponse = document.getElementById("divBlock");
    divReponse.remove();
    countdown();
}

let seconds = 7;

function countdown() {
    seconds = seconds - 1;
    if (seconds < 0) {
        // Change your redirection link here
        window.location = "home.html";
    } else {
        // Update remaining seconds
        if (seconds > 1) {
            document.getElementById("counter").innerHTML = "Vous allez être rediriger dans " + seconds + " secondes";
        } else {
            document.getElementById("counter").innerHTML = "Vous allez être rediriger dans " + seconds + " seconde";
        }
        // Count down using javascript
        window.setTimeout("countdown()", 1000);
    }
}