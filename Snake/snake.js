const myCanvas = document.getElementById("myCanvas");
const size = 20;
const head = {x : 0, y : 0,};
let body = [];
let food = null; 
let dX = 0;
let dY = 0;
let lastAxis;
const timeGame = 100;



//Para dibujar sobre canvas, tenemos que dibujar sobre un contexto asociado al elemento canvas (en este caso contexto de 2 dimensiones o 3 dimensiones)
const context = myCanvas.getContext('2d');

//drawObject(head);//Dibuja el head enviando como parametro el objeto head
setInterval(main,timeGame);//Ejecuta la funcion <draw> cada vez que transcurre 1000ms -> 1s


function main(){
    update(); //Actualiza variable del juego
    draw();//Dibuja los objetos del juego
    console.log(head.x,head.y);
    
}

function update(){
   const collisionDetected = checkSnakeCollision();
    if(collisionDetected){
        gameOver();
        return;
    }

    //Salva la posicion previa del ultimo elemento de la serpiente
    let prevX, prevY;
    if(body.length>=1){
        prevX=body[body.length-1].x;
        prevY=body[body.length-1].y;
    }else{
        prevX=head.x;
        prevY=head.y;
    }

    //Cuerpo de la serpiente -> siga la cabeza de la serpiente
    for(let i=body.length-1;i>=1;--i){
        body[i].x = body[i-1].x;//elem 1 <- elem 0
        body[i].y = body[i-1].y;
    }
    if(body.length>=1){
        body[0].x=head.x;
        body[0].y=head.y;
    }
    
    //Actualiza coordenadas de la cabeza
    head.x += dX; //Establece el valor de head.x en 20
    head.y += dY; //Establece el valor de head.y en 20
    if (dX!=0){
        lastAxis='X';
    }else if(dY!=0){
        lastAxis='Y';
    }
    
    //Detectar si la serpiente consume el alimento
    if(food && head.x===food.x && head.y===food.y){
        food = null;
        //aumentar tamaño de la serpiente
        increaseSnakeSize(prevX, prevY);
    }

    //Genera comida si esta no existe
    if(!food){
        food = randomFoodPosition();
    }

}

function checkSnakeCollision(){
    //coordenadas de la cabeza sea igual a las coordenadas de un elemento del cuerpo
    for(let i=0;i<body.length;++i){
        if(head.x==body[i].x && head.y==body[i].y){
            return true;
        }
    }

    //Verificar que la serpiente no salga de los limites permitidos
    const topCollision =(head.y<0); //x: ? , y: 0
    const botCollision = (head.y>(myCanvas.height-20));//x:? , y:440
    const rightCollision = (head.x>(myCanvas.width-20)); //x: 0 , y: ?
    const leftCollision = (head.x<0);//x:380 , y: ?
    if(topCollision || botCollision || rightCollision || leftCollision){
        return true;       
    }
    return false;
}

function gameOver(){
    head.x=0;
    head.y=0;
    dY=0;
    dX=0;
    body=[];
}

function increaseSnakeSize(prevX,prevY){
    body.push({
        x:prevX , y:prevY
    });
}

function randomFoodPosition(){
    let position;
    do{
        position={ x:getRandomX() , y:getRandomY()};   
    }while(checkFoodCollision(position));
    return position;
}

function getRandomX(){
    //0,20,40,...,380
    return 20*(parseInt(Math.random()*20)); //Retorna estos posibles valores (0,1,2,...,19) *20
}

function getRandomY(){
    //0,20,40,...,440
     return 20*(parseInt(Math.random()*23)); //Retorna estos posibles valores (0,1,2,...,22) *20
}

function checkFoodCollision(position){
    //Comparar la posicion de la comida con el cuerpo de la serpiente
    for(let i=0;i<body.length;++i){
        if(position.x==body[i].x && position.y==body[i].y){
            return true;
        }
            
    } 
    //comparar las coordenadas del alimento generado con la cabeza de la serpiente
        if(position.x==head.x && position.y==head.y){
            return true;
        }
    return false;
}

function draw(){
    //context.clearRect(0,0,myCanvas.width,myCanvas.height);//Limpia lo que se muestra en el contexto, esto hace que unicamente se vea un cuadrado
    context.fillStyle="black"; //Establece el fondo de contexto de negro
    context.fillRect(0,0,myCanvas.width,myCanvas.height);

    //cabeza
    drawObject(head,"lime");
    //cuerpo
    body.forEach(element=>drawObject(element,"lime"));
    //alimento
    drawObject(food,"white");
}

function drawObject(obj, color){
    context.fillStyle=color;//Pinta el objeto que se envio con el valor del parametro color
    context.fillRect(obj.x,obj.y,size,size);//Metodo que genera un rectangulo rellene en la posicion (obj.x , obj.y) y su tamaño esta dado: (20,20) -> 20x20
}

document.addEventListener("keydown",movement);

function movement(event){
    console.log(event.key);
    //Los condicionales registringen el movimiento sobre el mismo eje
    switch(event.key){
        case 'ArrowUp': 
            //console.log('Arriba');
            if(lastAxis!='Y'){
                dX = 0;
                dY = -size;//Establece dY -20
            }
        break;
        case 'ArrowRight': 
            //console.log('Derecha');
            if(lastAxis!='X'){
                dX = size;//Establece dX en 20
                dY = 0;
            }
        break;
        case 'ArrowDown': 
            //console.log('Abajo');
            if(lastAxis!='Y'){ 
                dX = 0;
                dY = size;//Establece dY en 20
            }
        break;
        case 'ArrowLeft': 
            //console.log('Izquierda');
            if(lastAxis!='X'){
                dX = -size;//Establece dX en -20
                dY = 0; 
            }
    }
}

