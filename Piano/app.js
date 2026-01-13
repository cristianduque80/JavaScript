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
/*
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
*/

//-----------------------REFACTORIZACION-----------------------
const btns = document.querySelectorAll('button');
document.addEventListener('keydown',event=>{
    const keyPressed = event.key;
    const button = document.querySelector(`button[data-key=${keyPressed}]`)
    //El condicional previene el error al presionar una tecla que no tiene boton asociado
    if(button!=null){
        button.click();//Trigger: En vez de actuar ante un click, produce un click en el boton
    }   
});


btns.forEach((buttons)=>{buttons.addEventListener('click', playSound)});//Se cambio function (buttons) por una funcion flecha (buttons) =>{}

function playSound(btn_selected){
    const btn = btn_selected.target;
    const note= btn.dataset.sound;
    const sound=document.getElementById(`audio_${note}`);//Se uso template string en lugar de concatenacion
    sound.pause();
    sound.currentTime=0;
    sound.play();
};
