
// creer un timer
//  mettre un innerHTML
//  Inserer les bulles
// forEach  e.remove() pour les supprimer au click



// Variable
const compteur = document.querySelector("#Compteur h1");

let compt = 0;




//// Function


function getRandomColor() {
    // obtenir une couleur au hasard
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = (Math.random() * 0.7 + 0.3).toFixed(2); // Transparence entre 0.3 et 1
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function getRandomNumber(){
    // obtenir un nombre pour le widht et le heigth
    const r = Math.floor(Math.random() * (180 - 50 + 1)) + 50;
    return r;
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const boxWidth = 200; // Largeur de la box
    return Math.random() * (screenWidth - boxWidth); // Position entre 0 et max possible
}

function initBubbles(a){
  const size = getRandomNumber();
  a.style.width = size + "px";
  a.style.height = size + "px";
  a.style.backgroundColor = getRandomColor();
  a.style.left = getRandomPosition() + "px";
  a.style.position = "absolute";
  a.style.borderRadius = "150px";
  a.style.animation = "monter 7s linear forwards";


}

// iterate compteur
function IterateCompteur(){
  compt = compt+1;
}


//Gen by ia to avoid Overlapping 
function isOverlapping(newBubble) {
  const bubbles = document.querySelectorAll(".bulle");

  for (let existing of bubbles) {
    const rect1 = newBubble.getBoundingClientRect();
    const rect2 = existing.getBoundingClientRect();

    const overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );

    if (overlap) return true;
  }

  return false;
}


// Bulle creation

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bulle");

  let attempts = 0;
  do {
    initBubbles(bubble);
    attempts++;
  } while (isOverlapping(bubble) && attempts < 10); // max 10 essais

  bubble.addEventListener("click", () => {
    IterateCompteur();
    compteur.innerHTML = compt;
    bubble.remove();
  });

  document.querySelector(".bubblesbox").appendChild(bubble);

  setTimeout(() => {
    if (bubble && bubble.parentNode) {
      bubble.remove();
    }
  }, 6000);
}




// Games

window.onload = ()=>{
  compteur.innerText = compt;
    
  setInterval(createBubble, 1150);

}
