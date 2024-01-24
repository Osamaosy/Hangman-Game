// letters
const letters = "abcdefghijklmnopqrstuwxyz";
// get Array from letters
let lettersArray = Array.from(letters);
// select letters container
let lettersCntaner = document.querySelector(".letters");

// generat letters
lettersArray.forEach(letters => {
    // create span
    let span = document.createElement("span");
    // creat text node 
    let theLetter = document.createTextNode(letters);
    // append the letter to span 
    span.appendChild(theLetter);
    // add class on span
    span.className = "letter-box";
    // append span to the letter container
    lettersCntaner.appendChild(span);
});

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
  }

// get random property
let allKeys = Object.keys(words);

// random Namber Depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category
let randomPropName = allKeys[randomPropNumber];
// category words

let randomPropValue = words[randomPropName];

// random Namber Depend on words
let randomValueNamber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNamber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName + " : ";

// select letters guess element
let lettersGussContainer = document.querySelector(".letters-guess");

// convert chosen word to Array
let lettersAndSpace = Array.from(randomValueValue);
let success = 0;

function lengthWithoutDuplicates(array) {
  // إنشاء مجموعة جديدة لحفظ العناصر الفريدة
  const uniqueArray = new Set(array);

  // عد عدد العناصر في المجموعة
  return uniqueArray.size;
}

let lenWithoutDup = lengthWithoutDuplicates(lettersAndSpace);
//create spans depened on word
lettersAndSpace.forEach(letter => {

  let emptySpan = document.createElement("span");

  if (letter === " "){
    emptySpan.className = 'with-space';
    success++;
    lenWithoutDup--;
    console.log(`_______sucsess_${success}__________`)
  }

  lettersGussContainer.appendChild(emptySpan)
});

// select guess span
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong Attempts
let wrongAllempts = 0;

// select the deaw element
let theDraw = document.querySelector('.hangman-draw');



console.log(`^^^^^^^^^${lenWithoutDup}`)
// Handle clicking on letters
document.addEventListener("click", (e) => {

  // set the chose status
  let theStatus = false;

  if (e.target.className === 'letter-box')
  {
    e.target.classList.add('clicked');
    // get click letter 
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());



    theChosenWord.forEach((wordLetter, WordIndex) => 
    {

      if(theClickedLetter == wordLetter)
      {
        // status to correct
        theStatus = true;
        // loop on All Guess spans
        guessSpans.forEach((span, spanIndex) => 
        {
          if (WordIndex === spanIndex)
          {
            span.innerHTML = theClickedLetter;
          }
        })
      }
      
    })
  // outside loop
  if (theStatus !== true)
  {
    wrongAllempts++;

    theDraw.classList.add(`wrong-${wrongAllempts}`);

    // play fail sound
    document.getElementById("fail").play();

    if(wrongAllempts === 8)
    {
      endGame();

      lettersCntaner.classList.add('finished');
    }
  }
  else{
    // play success sound
    document.getElementById("success").play();
    success++
    console.log(`*********sucsess_${success}******`)
    console.log(`*********lenWithoutDup_${lenWithoutDup}******`)
    if(lenWithoutDup === success){
      congratulations();
    }
    
  }

  }

});

function endGame(){
  // create popap div 
  let div = document.createElement("div");
  // cearat text node
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  // Append Text to div
  div.appendChild(divText);
  div.className = 'popup';

  document.body.appendChild(div)
}

function congratulations(){
  // create popap div 
  let div = document.createElement("div");
  // cearat text node
  let divText = document.createTextNode(`congratulations`);
  // Append Text to div
  div.appendChild(divText);
  div.className = 'popup';

  document.body.appendChild(div)
}

console.log(lettersAndSpace);

