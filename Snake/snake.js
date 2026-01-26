const myCanvas = document.getElementById("myCanvas");
const size = 20;
const head = {x : 0, y : 0,};
let food = null; //
let dX = 0;
let dY = 0;

document.addEventListener("keydown",movement);

//Para dibujar sobre canvas, tenemos que dibujar sobre un contexto asociado al elemento canvas (en este caso contexto de 2 dimensiones o 3 dimensiones)
const context = myCanvas.getContext('2d');

drawObject(head);//Dibuja el head enviando como parametro el objeto head
let timer = setInterval(main,450);//Ejecuta la funcion <draw> cada vez que transcurre 1000ms -> 1s


function main(){
    update(); //Actualiza variable del juego
    draw();//Dibuja los objetos del juego
    console.log(head.x,head.y);
    
}

function update(){
    //Actualiza coordenadas de la cabeza
    head.x += dX; //Establece el valor de head.x en 20
    head.y += dY; //Establece el valor de head.y en 20
            
    //Detectar si la serpiente consume el alimento
    if(food && head.x===food.x && head.y===food.y){
        food = null;
        //aumentar tamaño de la serpiente
    }

    //Genera comida si esta no existe
    if(!food){
        food = {x:getRandomX() , y:getRandomY()}
    }

}

function getRandomX(){
    //0,20,40,...,380
    return 20*(parseInt(Math.random()*20)); //Retorna estos posibles valores (0,1,2,...,19) *20
}

function getRandomY(){
    //0,20,40,...,440
     return 20*(parseInt(Math.random()*23)); //Retorna estos posibles valores (0,1,2,...,22) *20
}

function draw(){
    //context.clearRect(0,0,myCanvas.width,myCanvas.height);//Limpia lo que se muestra en el contexto, esto hace que unicamente se vea un cuadrado
    context.fillStyle="black"; //Establece el fondo de contexto de negro
    context.fillRect(0,0,myCanvas.width,myCanvas.height);
    drawObject(head,"lime");
    drawObject(food,"white");
}

function drawObject(obj, color){
    context.fillStyle=color;//Pinta el objeto que se envio con el valor del parametro color
    context.fillRect(obj.x,obj.y,size,size);//Metodo que genera un rectangulo rellene en la posicion (obj.x , obj.y) y su tamaño esta dado: (20,20) -> 20x20
}

function movement(event){
    console.log(event.key);
    switch(event.key){
        case 'ArrowUp': 
            //console.log('Arriba');
            dX = 0;
            dY = -size;//Establece dY -20
        break;
        case 'ArrowRight': 
            //console.log('Derecha');
            dX = size;//Establece dX en 20
            dY = 0;
        break;
        case 'ArrowDown': 
            //console.log('Abajo'); 
            dX = 0;
            dY = size;//Establece dY en 20
        break;
        case 'ArrowLeft': 
            //console.log('Izquierda');
            dX = -size;//Establece dX en -20
            dY = 0; 
    }
}

