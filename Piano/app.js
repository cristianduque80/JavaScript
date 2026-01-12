//Asignar un evento a un elemento
//event listener
var btns = document.querySelectorAll('button');

btns.forEach(function (button){
    button.addEventListener('click', playSound);
})

//document.getElementById('btn_do').addEventListener('click',playSound);

function playSound(event){
    console.log(event);
    //Tener un elemento audio en la pagina
    //Obtener una referencia del elemento
    //Reproducir el sonido
    //var audio = document.getElementById('audio_do');
    //audio.pause();          /*Estas dos lineas equivale a realizar un stop */
    //audio.currentTime = 0;  /*ya que dicha funcion no existe               */
    //audio.play();
}