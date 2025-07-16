/************** Variables globales **************/
let pos_pregunta = 0;
let preguntas = [];
let resultadosGuardados = JSON.parse(localStorage.getItem('resultadosQuiz')) || [];
let resultado = {};

//funcionalidad-botones/home
//Evento botón start
const startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", (event) => {

    window.location.href = "./pages/question.html" || '/Proyecto-quiz/pages/question.html';

  })
}

//boton de siguiente en html/question
const buttonNext = document.getElementById("next");
// if (buttonNext) {
//     buttonNext.addEventListener("click", (event) => {
//         window.location.href = "../pages/results.html";
//     })
// }

/************** Botón jugar otra vez *************/
const playAgain = document.getElementById('playAgain');
if (playAgain) {
  playAgain.addEventListener('click', function () {
    window.location.href = './question.html' || '/Proyecto-quiz/pages/question.html';
  })
}

 /************** Botón home *************/
const home = document.getElementById('home');
if (home) {
    home.addEventListener('click', function () {
        window.location.href = '../index.html' || '/Proyecto-quiz/index.html';
    })
}

/***************** Render primera pregunta ***************/
const firstquest = document.getElementById('opciones-rta');
if (firstquest) {
  getData().then(datos => {
    preguntas = datos;
    pos_pregunta = 0;
    resultado = {
      date: new Date(),
      score: 0
    };
    renderPregunta(pos_pregunta, firstquest); // pos 0
  })
}

/***************** obtencion de datos ***************/
async function getData() {

    try{
        const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        //const res = await fetch('../datos.json');

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
      let datosFinal = manipuDatos(data.results);
      return datosFinal;
      
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

/******************* Manipulacion de datos  ****************/
function manipuDatos(dataset) {

  let mappedData = dataset.map(preguntas => {
    const pregunta = preguntas.question;
    const respuesta = [preguntas.incorrect_answers[0], preguntas.incorrect_answers[1], preguntas.incorrect_answers[2]];
    let num = Math.floor(Math.random() * (respuesta.length + 1));
    respuesta.splice(num, 0, preguntas.correct_answer)

    return { pregunta, respuesta, correcta: preguntas.correct_answer };
  })
  return mappedData;
}

/****************** Render Preguntas *******************/
function renderPregunta(i, container) {

  container.innerHTML = `
  <h2>${preguntas[i].pregunta}</h2>
  <button class='option'>${preguntas[i].respuesta[0]}</button>
  <button class='option'>${preguntas[i].respuesta[1]}</button>
  <button class='option'>${preguntas[i].respuesta[2]}</button>
  <button class='option'>${preguntas[i].respuesta[3]}</button>
  `

  /******************** Validacion ******************/
  const options = container.querySelectorAll('.option');

  options.forEach(option => {
    option.addEventListener('click', (event) => {
      validacion(event.target.innerText)
    })
  });
}

function validacion(respuestaSeleccionada) {
  const pregunta = preguntas[pos_pregunta];

  const respuestaNormalizada = respuestaSeleccionada.trim().toLowerCase();
  const correctaNormalizada = pregunta.correcta.trim().toLowerCase();

  if (respuestaNormalizada == correctaNormalizada) {
    resultado.score += 1;
    console.log('¡Correcto!');
    firstquest.innerHTML += `<h2>¡Correcto!</h2>`
  } else {
    console.log(`Incorrecto haber estudíao`);
    firstquest.innerHTML += `<h2>¡Incorrecto haber estudíao! la respuesta correcta es ${correctaNormalizada}</h2>`
  }

    pos_pregunta += 1;
  
}
/***************Funcionalidad boton siguiente ****************/
if (buttonNext)
  buttonNext.addEventListener('click', () => {

      if(pos_pregunta <= preguntas.length -1) {
          
       let counterQuestions = document.getElementById("question-counter");
       counterQuestions.innerHTML= `<h3>Pregunta ${pos_pregunta + 1 } de 10 </h3> `

        renderPregunta(pos_pregunta, firstquest);
      } else {
        buttonNext.innerText = 'Ver resultado';
        console.log('resultado a guardar:', resultado)

/**************** Guardar resultados ********************/           

        resultadosGuardados.push(resultado);
        resultado = {};
        localStorage.setItem('resultadosQuiz', JSON.stringify(resultadosGuardados));


        window.location.href = "./results.html" || '/Proyecto-quiz/pages/results.html';
      })

    }
  })


/****************Mostrar resultados***************/
const contenedorResultado = document.getElementById("result");


function mostrarPuntuacionReciente(elementoDePuntuacion) {

    const historial = JSON.parse(localStorage.getItem('resultadosQuiz')) || [];
    
    if (historial.length > 0) {
        const ultimaPartida = historial[historial.length - 1];
        
  
        const score = ultimaPartida.score || 0;

    elementoDePuntuacion.innerHTML = `
            <h2>¡Tu Último Resultado!</h2>
            <p>Tu puntuación de la última partida es: <b>${score}</b> aciertos de <b>10</b> preguntas.</p>
        `;
  } else {
    elementoDePuntuacion.innerHTML = "<p>¡Juega un quiz para ver tu primera puntuación!</p>";
  }
}
if (contenedorResultado){
  mostrarPuntuacionReciente(contenedorResultado);
} else {
  console.log('Todavia no puedes ver los resultados')
}
  
/****************** Grafica ***********************/
// function grafica
function paintGraph() {
  const graphContainer = document.querySelector('.result');
  const storedResults = JSON.parse(localStorage.getItem('resultadosQuiz'));

  if (!storedResults || storedResults.length === 0) {
    if (graphContainer) {
      graphContainer.innerHTML = "<p>No hay datos disponibles aún.</p>";
    }
    return;
  }

  let date = [];
  let score = [];

  for (let items of storedResults) {
    date.push(new Date(items.date).toLocaleDateString("es-ES") + ' ' + new Date(items.date).toLocaleTimeString('es-Es'));
    score.push(items.score);
  }

  let data2 = {
    labels: date,
    series: [score],
  };

  let asisY = {
    onlyInteger: true

  }

  var options = {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  };

  if (graphContainer) {
    new Chartist.Line(".result", data2, asisY, options);
  } else {
    console.log('No hay contenedor para la grafica')
  }

}

paintGraph();

