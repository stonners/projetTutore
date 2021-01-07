let MainDiv = document.getElementById("MainDiv");
let text = document.getElementById("text");
let count =0;
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
        // buttonQuizz.setAttribute("onclick","QuizzStart("+this.text+")");


        document.getElementById("selectTheme").onchange = QuizzStart;
    }


}

let idUser=sessionStorage.getItem("id");
let socket = null;
let msgWebSocket =[];
let counter=0
try {
    socket = new WebSocket('ws://127.0.0.1:8889');
    socket.onopen = function () {
        socket.send(JSON.stringify({
            type:'connect',
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
        msgWebSocket[counter]=JSON.parse(msg.data);
        counter++;

        return;
    };
    socket.onclose = function () {
        console.log('connection is closed!');

        return;
    };
} catch (e) {
    console.log(e);
}

function QuizzStart() {

    var chemin = window.location.pathname;
    idTheme = document.getElementById("selectTheme").value;
    if (chemin === "/html/quizzSolo.html") {
        document.location.href = "quizzSoloStart.html?data=" + idTheme;
console.log(idTheme);
    }else {

        socket.send(JSON.stringify({
            type:'quizz_duel_start',
            user_id:idUser
//continuer ca
        }));
        socket.send(JSON.stringify({
            type:'theme',
            themeId: idTheme

        }));


        let rechercheAdv =document.getElementById("rechercheAdv");
        let text2=document.createElement("p");
            text2.innerText = "En recherche d'adversaire!!!";

        text2.setAttribute("class", "h1");
        text2.setAttribute("id", "question");
        text2.setAttribute("align", "center");
        rechercheAdv.appendChild(text2);
        document.body.appendChild(rechercheAdv);

        document.write();
    }

}