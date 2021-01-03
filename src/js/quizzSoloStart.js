let url = window.location.href;
let idTheme = url.split("data=");
let formReponse = new FormData();
let tabAleat = [];
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
    tabAleat[0] = tabNorm[var1];

    tabAleat[1] = tabNorm[var2];
    tabAleat[2] = tabNorm[var3];
    tabAleat[3] = tabNorm[var4];

    afficheQuestion(conteurQuestion);
}

function afficheQuestion(numberQuestion) {

    let MainDiv = document.getElementById("MainDiv");
    let question = document.getElementById("question");

    question.innerText = tabAleat[numberQuestion].label;

    question.setAttribute("class", "h1");
    question.setAttribute("id", "question");
    MainDiv.appendChild(question);

    sauvegardeReponse();
    counter(conteurQuestion);
    conteurQuestion++;
}


function counter(conteur) {
    let MainDiv = document.getElementById("MainDiv");
    let cpt = 10;
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
                //         console.log("c'est fini");
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

    fetch('http://projetarendre/api/possibleanswer/' + tabAleat[conteurQuestion].id, {
        method: 'GET'

    }).then(response => response.json())
        .then(json => afficheReponse(json))
        .catch(function (err) {
            console.log("il y a eu un problème avec l'opération fetch : " + err.message);
        });
}

function afficheReponse(arg) {


    let divReponse = document.getElementById("divBlock");
    divReponse.textContent = ' ';
    for (let i = 0; i < arg.length; i++) {
        let response = document.createElement("div");

        response.innerText = arg[i].label;

        response.setAttribute("class", "h1");
        response.setAttribute("id", arg[i].id);
        response.setAttribute("style", "border:10%; margin-left: 5px; margin-right: 5px;text-align:center; width:25%;height:25%; border:1px;border: groove;border-color: crimson;");

        response.onclick = clickResponse;
        divReponse.appendChild(response);


        /*sauvegardeReponse();
        counter(conteurQuestion);
        conteurQuestion++;
*/
    }
}

function clickResponse() {
    //tabAleat.id
    // console.log(this.innerText);
    clearInterval(myVar);
    if (conteurQuestion < 4) {

        console.log(tabAleat[conteurQuestion - 1].id);
        console.log("question" + conteurQuestion);
        formReponse.append("question" + conteurQuestion, tabAleat[conteurQuestion - 1].id);

        afficheQuestion(conteurQuestion);
    } else {
        console.log(tabAleat[conteurQuestion - 1].id);
        console.log("question" + conteurQuestion);
        formReponse.append("question" + conteurQuestion, tabAleat[conteurQuestion - 1].id);

        //     user = sessionStorage.getItem("token");
        // formReponse.append(user, "user1");

        fetch('http://projetarendre/api/PossibleAnswer/correction/', {
            method: 'POST',
            body: formReponse
        })
            .catch(function (err) {
                console.log("il y a eu un problème avec l'opération fetch : " + err.message);
            });
        document.write("");
        console.log('');
    }

}