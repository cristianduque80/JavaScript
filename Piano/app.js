//-----------------------PRIMERA FORMA----------------------- 
/*
    //Seleccionar el elemento mendiante su id con getElementById
    var btn_do = document.getElementById('btn_do');

    //Se implementa un evento click usando addEventListener
    btn_do.addEventListener('click',playSound);

    //Funcion que se ejecuta cuando se da click en el boton
    function playSound() {
        //tener elemento audio
        //obtener referencia del elemento
        //dar la orden de reproducir
        var audio_do = document.getElementById('audio_do');
        audio_do.pause();//Pausa el audio  
        audio_do.currentTime = 0;//Reinica el audio
        audio_do.play();//Reproduce el audio
    }
*/

//-----------------------FORMA GENERALIZADA-----------------------
var btns = document.querySelectorAll('button');//Selecciona todo los botones

//Recorre todos los botones
btns.forEach(function (buttons){
    buttons.addEventListener('click', playSound);
});

function playSound(event){
    var sound = event.target.dataset.sound;
    //console.log(button);
    var audio=document.getElementById('audio_'+sound);
    audio.pause();
    audio.currentTime=0;
    audio.play();
};
