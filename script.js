/************** Botón jugar otra vez *************/
document.getElementById('playAgain').addEventListener('click', function () {
    window.location.href = './question.html';
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

/***************** obtencion de datos ***************/
async function getData() {
    try {
        const res = await fetch('https://opentdb.com/api.php?amount=10');

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Recurso no encontrado (404)");
            } else if (res.status === 500) {
                throw new Error("Error en el servidor (500)");
            } else {
                throw new Error(`Error HTTP: ${res.status}`);
            }
        }
        const data = await data.json();
        console.log(data);
    } catch (error) {
        if (error.message.includes("404")) {
            console.error("Error: No se encontró el recurso solicitado.");
        } else if (error.message.includes("500")) {
            console.error("Error: Problemas con el servidor.");
        } else {
            console.error("Hubo un problema:", error.message);
        }
    }
}
getData()



