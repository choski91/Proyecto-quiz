
/************** Botón jugar otra vez *************/
document.getElementById('playAgain').addEventListener('click', function() {
    window.location.href='./question.html';
});

//Ufuncionalidad-botones/home
//Evento botón start
document.getElementById("start-button").addEventListener("click", (event) => {
    window.location.href = "../pages/question.html";
})

//boton de siguiente en html/question

const buttonNext = document.getElementById("next");
buttonNext.addEventListener("click", (event) => {
window.location.href = "../pages/results.html"
});



