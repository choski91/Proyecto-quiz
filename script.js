
//Ufuncionalidad-botones/home
//Evento botón start
const startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", (event) => {
    window.location.href = "../pages/question.html";
  })
}

//boton de siguiente en html/question

const buttonNext = document.getElementById("next");
if (buttonNext) {
  buttonNext.addEventListener("click", (event) => {
  window.location.href = "../pages/results.html";
  })
}
// /************** Botón jugar otra vez *************/
const playAgain = document.getElementById('playAgain');
if (playAgain){
  playAgain.addEventListener('click', function() {
    window.location.href='./question.html';
  })
}
/***************** obtencion de datos ***************/
async function getData() {
    try{
        const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');

        if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Recurso no encontrado (404)");
        } else if (res.status === 500) {
            throw new Error("Error en el servidor (500)");
        } else {
            throw new Error(`Error HTTP: ${res.status}`);
        }
      }
      const data = await res.json();
      return data.results;
      
    }catch (error) {
    if (error.message.includes("404")) {
      console.error("Error: No se encontró el recurso solicitado.");
    } else if (error.message.includes("500")) {
      console.error("Error: Problemas con el servidor.");
    } else {
      console.error("Hubo un problema:", error.message);
    }
  }
}
getData().then(data => {
/******************* Manipulacion de datos  ****************/
  
  console.log(data);
  
  data.map(preguntas => {
    const pregunta = [preguntas.correct_answer, preguntas.incorrect_answers[0], preguntas.incorrect_answers[1], preguntas.incorrect_answers[2]];
    console.log(pregunta)
  })
})





