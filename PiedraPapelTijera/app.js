const figurePlayer = document.getElementById("figurePlayer");
const figureComputer = document.getElementById("figureComputer");

const resultWinner = document.getElementById("resultWinner");
const resultLoser = document.getElementById("resultLoser");

const scorePlayer = document.getElementById("scorePlayer");
const scoreComputer = document.getElementById("scoreComputer");

const btns = document.querySelectorAll("button");
const choices = ["rock","paper","scissors"];
pWin=0;
cWin=0; 

btns.forEach(buttons => buttons.addEventListener("click",startGame));

function startGame(event){
    //PlayerChoise
    let playerChoise=event.currentTarget.dataset.choise; //Con currentTarget asegura el elemento original a la cual se asocio la imagen, en este caso el boton
    

    //ComputerChoise
    let computerChoise = getComputerChoise();

    //Winner
    let Winner = choiseWinner(playerChoise,computerChoise);
    result.innerHTML = `${Winner==1 ? "Gana" : "Pierde"} <b>Jugador</b> con ${playerChoise} en contra de Computadora con ${computerChoise}.`
    choiseImg (playerChoise,computerChoise);
    console.log(Winner);
    if (Winner==0){//Empate
        tie();
    }else if (Winner==1){//Player Win
        playerWin(playerChoise,computerChoise);
    }else{//Computer Win
        computerWin(playerChoise,computerChoise);
    }
}




 function getComputerChoise(){
    //Obtener un valor aleatorio i -> 0,1,2
    const i = parseInt(Math.random()*3); //parseInt selecciona unicamente la parte entera
    //Eleccion de una computadora
    return choices[i]; 
 }

 function choiseWinner(player,computer){
    //Estado de la partida
    if(player==computer){
        return 0; //Empate
    }else if((player=="rock" && computer=="scissors") || (player=="paper" && computer=="rock") || (player=="scissors" && computer=="paper")){
        return 1; //Player Win
    }else{
        return 2; //Computer Win
    }
 }

function choiseImg(player,computer){
    figurePlayer.setAttribute("src",`images/${player}.png`); //Se modifica el valor del atributo "src" para seleccionar la imagen correspondiente
    figureComputer.setAttribute("src",`images/${computer}.png`);
}

function tie(){
    result.textContent="Empate"
}

function playerWin(player,computer){
    pWin++;
    scorePlayer.textContent=pWin; //textContent cambia el contenido correspondiente al ID scorePlayer

}

function computerWin(player,computer){
    cWin++;
    scoreComputer.textContent=cWin; //textContent cambia el contenido correspondiente al ID scorePlayer
}