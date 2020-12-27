fetch('http://projectarendre/api/themes', {
    method: 'GET'

}).then(response => response.json())
    .then(json => afficheTheme(json))
    .catch(function (err) {
        console.log("il y a eu un problème avec l'opération fetch : " + err.message);
    });


function afficheTheme(arg) {

    let body = document.getElementsByTagName("body");

    for (i = 0; i < arg.length; i++) {

        div = document.createElement("div");
        div.setAttribute("align", "center");

        buttonQuizz = document.createElement("button");


        buttonQuizz.innerText = arg[i].name;

        buttonQuizz.setAttribute("id", arg[i].id);
        buttonQuizz.setAttribute("name", "a");
        buttonQuizz.setAttribute("class", "btn btn-dark");
        // buttonQuizz.setAttribute("onclick","QuizzStart("+this.text+")");

        div.appendChild(buttonQuizz);
        document.body.appendChild(div);


        document.getElementById(arg[i].id).onclick = QuizzStart;

    }


}


function QuizzStart() {
    console.log(this.id);
    maVar = this.id;
    document.location.href = "quizzSoloStart.html?data=" + maVar;
}