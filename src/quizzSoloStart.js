url = window.location.href;
idTheme = url.split("data=");
formReponse = new FormData();

fetch('http://projetarendre/api/questions/' + idTheme[1], {
    method: 'GET'

}).then(response => response.json())
    .then(json => sauvegardeQuestion(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });
conteurQuestion = 0;


function sauvegardeQuestion(arg) {

    tab = new Array();
    tab2 = new Array();

    maxQuestions = arg.length - 1;
    for (i = 0; i < arg.length; i++) {
        tab[i] = arg[i];
    }

    var1 = entierAleatoire(0, maxQuestions);
    var2 = entierAleatoire(0, maxQuestions);

    while (var2 === var1) {
        var2 = entierAleatoire(0, maxQuestions);
    }
    var3 = entierAleatoire(0, maxQuestions);

    while (var3 === var1 || var3 === var2) {
        var3 = entierAleatoire(0, maxQuestions);
    }
    var4 = entierAleatoire(0, maxQuestions);


    while (var4 === var1 || var4 === var2 || var4 === var3) {
        var4 = entierAleatoire(0, maxQuestions);
    }
    tab2[0] = tab[var1];

    tab2[1] = tab[var2];
    tab2[2] = tab[var3];
    tab2[3] = tab[var4];

    afficheQuestion(conteurQuestion);
}

function afficheQuestion(numberQuestion) {

    body = document.getElementsByTagName("body");
    MainDiv = document.getElementById("MainDiv");
    question = document.getElementById("question");

    question.innerText = tab2[numberQuestion].label;

    question.setAttribute("class", "h1");
    question.setAttribute("id", "question");
    MainDiv.appendChild(question);

    sauvegardeReponse();
    counter(conteurQuestion);
    conteurQuestion++;
}


function counter(conteur) {
    let cpt = 10;
    if (conteur < 4) {
        divCounter = document.getElementById("counter");
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

    fetch('http://projetarendre/api/possibleanswer/' + tab2[conteurQuestion].id, {
        method: 'GET'

    }).then(response => response.json())
        .then(json => afficheReponse(json))
        .catch(function (err) {
            console.log("il y a eu un problème avec l'opération fetch : " + err.message);
        });
}

function afficheReponse(arg) {


    divReponse = document.getElementById("divBlock");
    divReponse.textContent = ' ';
    for (i = 0; i < arg.length; i++) {
        response = document.createElement("div");

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
    tab2.id
    // console.log(this.innerText);
    clearInterval(myVar);
    if (conteurQuestion < 4) {

        console.log(tab2[conteurQuestion-1].id);
        console.log("question" + conteurQuestion);
        formReponse.append( "question" + conteurQuestion, tab2[conteurQuestion-1].id);

        afficheQuestion(conteurQuestion);
    } else {
        console.log(tab2[conteurQuestion-1].id);
        console.log("question" + conteurQuestion);
        formReponse.append( "question" + conteurQuestion, tab2[conteurQuestion-1].id);

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