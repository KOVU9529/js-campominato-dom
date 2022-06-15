/*Consegna
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste*/

//1-
// TUTTO INIZIA DAL TASTO CLICCANDO SU BOTTONE PLAY

//PRIMO STEP CREO LA VARIABILE DEL BOTTONE
const playBtn=document.querySelector('#play');

//ATTIVO LA FUNZIONE DEL CLICK SUL BOTTONE
playBtn.addEventListener('click',startGame);

  
//CREO LA FUNZIONE 
function startGame(){
   const mainGrid=document.querySelector('#main-grid');

   //SVUOTARE AD OGNI INIZIO
   mainGrid.innerHTML='';
   mainGrid.className='';

   //Numero delle bombe
   const bombNumb=16;

   //Chiedo all'utente la difficiltà (attraverso la scelta di un numero)
   const userLevel=document.querySelector('#user-level').value;

   //Imposto i diversi livelli di difficoltà
   let typeLevel;
   let mainGridClass;

   switch(userLevel){
      case '1':
      typeLevel=100;
      mainGridClass='easy';
      break;
      case '2':
      typeLevel=81;
      mainGridClass='hard';
      break;
      case '3':
      typeLevel=49;
      mainGridClass='crazy';
      break;
  }

   //Testo il funzionamento
   console.log(typeLevel);

 //Valore della funzione esterno alla funzione stessa
 const generateBombArray=generateBomb(bombNumb,1,typeLevel);
 //controllo
 console.log(generateBombArray);

 
 //Calcolo il massimale dei tentativi in funzione della difficoltà
 const attempts = typeLevel-bombNumb;
 console.log(attempts);
  
 //Inserimento dei numeri
  //Creo un array vuoto(che verra popolato con la seconda scelta numerica)
  const arrayEmpt=[];
  console.log(arrayEmpt);

 generateGrid();
 //GENERARE LA GRIGLIA 
 function generateGrid(){

   //GENERO LA GRIGLIA IN FUNZIONE DELLA DIFFICOLTà SCELTA
   //ASSOCIATA A UNA VARIABILE
   mainGrid.classList.add(mainGridClass);

   for(i=1; i <= typeLevel; i++){
      //CREARE LE CELLE
      //div class="square"><span>12</span></div>
      const newCell=document.createElement('div');
      newCell.innerHTML=`<span>${i}</span>`;
      newCell.classList.add('square');
      //quando l'utente clicca sulla cella
      newCell.addEventListener('click',clickCell);
      mainGrid.append(newCell);
   }
  }

 
   function clickCell(){
      const userAttempts=parseInt(this.querySelector('span').innerHTML);
      console.log(userAttempts);
      
         
         if (generateBombArray.includes(userAttempts)){
            
            this.classList.add('square-red');
            alert ('Peccato hai perso!');
            alert ('Tentativi riusciti:'+ arrayEmpt.length);
         }
         else{
            if(!generateBombArray.includes(userAttempts)){
               arrayEmpt.push(userAttempts);
               this.classList.add('square-blue');
            }
            if(arrayEmpt.length === attempts){
       
               alert ('Complimenti hai vinto!');
            }
         }
         this.style.pointerEvents = 'none';
      }
    
      
}






//--------------------------
//Function
//--------------------------



//2-
//Funzione per il popolamento dell'array(contenitore delle bombe)
//bombElement-> popoleranno bombArray
//imposto come due ultimi input il min e max

function generateBomb(bombElement,rangeMin,rangeMax){
    const bombArray=[];
    //Ciclo while per il popolamento dell'array
    while(bombArray.length < bombElement){
        //Aggiorno gli argomenti
        const numbRandom=getRndInteger(rangeMin, rangeMax);
        //imposto le condizioni
        if(!bombArray.includes(numbRandom)){
            bombArray.push(numbRandom);
        }
    }
    return bombArray;
}
//Genero una funzione per i 16 numeri random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}