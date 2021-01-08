let MainDiv = document.getElementById("MainDiv");
let text = document.getElementById("text");
let block = document.getElementById("block");
let count = 0;
text.innerText = "Veuiller choisir un thème";

text.setAttribute("class", "h1");
text.setAttribute("id", "question");
MainDiv.appendChild(text);


fetch('http://projetarendre/api/themes', {
    method: 'GET'

}).then(response => response.json())
    .then(json => afficheTheme(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });

function afficheTheme(arg) {
    let option = document.createElement("option")
    let select = document.getElementById("selectTheme");
    option.innerText = "--Sélectionner un theme--";
    select.appendChild(option);


    for (let i = 0; i < arg.length; i++) {
        let option = document.createElement("option")
        option.setAttribute("align", "center");
        option.setAttribute("id", arg[i].id);

        option.setAttribute("value", arg[i].id);
        option.innerText = arg[i].name;
        select.appendChild(option);
        // buttonQuizz.setAttribute("onclick","socket("+this.text+")");


        document.getElementById("selectTheme").onchange = QuizzStart;
    }


}

let idUser = sessionStorage.getItem("id");
let socket = null;
let msgWebSocket = [];
let counter = 0
try {
    socket = new WebSocket('ws://127.0.0.1:8889');
    socket.onopen = function () {
        socket.send(JSON.stringify({
            type: 'connect',
            user_id: idUser
        }));
        /*      socket.send(JSON.stringify({
                  type:'forward',
                  user_id: idUser,
                  message:'test1'
              }));*/

    };
    socket.onmessage = function (msg) {
        console.log('Message received: ', msg.data);
        msgWebSocket[counter] = JSON.parse(msg.data);

        counter++;

    };
    socket.onclose = function () {
        console.log('connection is closed!');


    };
} catch (e) {
    console.log(e);
}

function QuizzStart() {

    var chemin = window.location.pathname;
    idTheme = document.getElementById("selectTheme").value;


    socket.send(JSON.stringify({
        type: 'quizz_duel_start',
        user_id: idUser
//continuer ca
    }));
    socket.send(JSON.stringify({
        type: 'theme',
        themeId: idTheme

    }));
    let rechercheAdv = document.getElementById("rechercheAdv");


    let text2 = document.createElement("p");
    text2.innerText = "En recherche d'adversaire!!!";

    text2.setAttribute("class", "h1");
    text2.setAttribute("id", "question");
    text2.setAttribute("align", "center");
    rechercheAdv.appendChild(text2);
    document.body.appendChild(rechercheAdv);


    countdown();
//

}


function countdown() {
    myVar2 = window.setTimeout("countdown()", 1000);
    console.log(msgWebSocket);
//    console.log(msgWebSocket.length);
    if (msgWebSocket[msgWebSocket.length - 1].type === "no_player") {
        window.clearTimeout(myVar2);
        window.setTimeout("countdown()", 1000);
    }
    if (msgWebSocket[msgWebSocket.length - 1].type === "need_to wait") {
        window.clearTimeout(myVar2);
        console.log('cc');
        let rechercheAdv = document.getElementById("rechercheAdv");

        let text2 = document.createElement("p");
        text2.setAttribute("class", "h1");
        text2.setAttribute("id", "question");
        text2.setAttribute("align", "center");
        rechercheAdv.innerHTML = ' ';
        document.getElementById('question').style = "visibility: hidden";
        document.getElementById('selectTheme').style = "visibility: hidden";
        text2.innerText = "c'est le tour de votre adversaire";
        rechercheAdv.appendChild(text2);
        document.body.appendChild(rechercheAdv);
        window.setTimeout("countdown()", 1000);

    }
    if (msgWebSocket[msgWebSocket.length - 1].type === "need_to_respond") {
        document.getElementById('question').innerText = msgWebSocket[msgWebSocket.length - 1].questions.label;
        document.getElementById('selectTheme').style = "visibility: hidden";
        document.getElementById('rechercheAdv').style = "visibility: hidden";
        console.log(msgWebSocket[msgWebSocket.length - 1]);

        //pour recup les questions/reponses
        // console.log(msgWebSocket[msgWebSocket.length - 1].questions);             <-------
        console.log(msgWebSocket[msgWebSocket.length - 1].possibleanswer)         //<-------

        window.clearTimeout(myVar2);
        afficheReponse()
        compteur();
    }


}

let tabReponseAleat = [];

function afficheReponse() {
    let tabNorm = [];

    for (let i = 0; i < 4; i++) {
        tabNorm[i] = msgWebSocket[msgWebSocket.length - 1].possibleanswer[i];
    }
    //  console.log(tabNorm)

    let var1 = entierAleatoire(0, 3);
    let var2 = entierAleatoire(0, 3);

    while (var2 === var1) {
        var2 = entierAleatoire(0, 3);
    }
    let var3 = entierAleatoire(0, 3);

    while (var3 === var1 || var3 === var2) {
        var3 = entierAleatoire(0, 3);
    }
    let var4 = entierAleatoire(0, 3);


    while (var4 === var1 || var4 === var2 || var4 === var3) {
        var4 = entierAleatoire(0, 3);
    }
    tabReponseAleat[0] = tabNorm[var1];

    tabReponseAleat[1] = tabNorm[var2];
    tabReponseAleat[2] = tabNorm[var3];
    tabReponseAleat[3] = tabNorm[var4];
    console.log(tabReponseAleat)

    block.setAttribute("style", "display: flex;flex-direction: row;justify-content: space-between;align-items: flex-end;align-content: center;width: 100%;height: 70%")
    <button class="btn btn-primary" id="start">Demarrer la visioConf</button>
    button=
    for (let i = 0; i < 4; i++) {
        let res = document.createElement("div");
        res.innerText = tabReponseAleat[i].label;
        res.setAttribute("class", "h1");
        res.setAttribute("id", tabReponseAleat[i].id);
        res.setAttribute("style", "border:10%; margin-left: 5px; margin-right: 5px;text-align:center; width:25%;height:25%; border:1px;border: groove;border-color: crimson;");

        res.onclick = clickResponse;
        block.append(res);


    }

    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

let cpt = 10;
let myVar;

function compteur() {
    let conteur = 1;
    if (conteur < 4) {
        let divCounter = document.createElement("counter");
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
                clearInterval(myVar);
                /* reponseDiv = document.getElementById("reponse");
                 reponseDiv.innerText = "Temps expiré";
                 reponseDiv.style.display = "block";
                 MainDiv.appendChild(reponseDiv);

                */

            }
        }, 1000);
    } else {
        cpt = 0;
        clearInterval(myVar);
    }
}

function clickResponse() {
    clearInterval(myVar);


    socket.send(JSON.stringify({
        type: 'quizz_duel_respond',
        questionResponse: this.id
    }));


    console.log(document.getElementsByTagName("counter"));

    console.log(document.getElementsByTagName("counter"));


    let divCounter = document.getElementsByTagName("counter")
    MainDiv.remove();
    block.remove();
    document.getElementById('rechercheAdv').style = "visibility: visible";
    window.setTimeout("countdown()", 1000);


}