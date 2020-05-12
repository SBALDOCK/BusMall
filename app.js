'use strict';

var parentElement = document.getElementById('busMallParent');

var allItems = [];

function Catalog(url, alt, name){
  this.filePath = url;
  this.alt = alt;
  this.name = name;
  this.votes = 0;
  this.views = 0;
  // this.percentage = percentage;
  allItems.push(this);
}

new Catalog('pics/bag.jpg', 'bag', 'Bag');
new Catalog('pics/banana.jpg', 'banana', 'Banana');
new Catalog('pics/bathroom.jpg', 'bathroom', 'Bathroom');
new Catalog('pics/boots.jpg', 'boots', 'Boots');
new Catalog('pics/breakfast.jpg', 'breakfast', 'Breakfast');
new Catalog('pics/bubblegum.jpg', 'bubblegum', 'Bubblegum');
new Catalog('pics/chair.jpg', 'chair', 'Chair');
new Catalog('pics/cthulhu.jpg', 'cthulhu', 'Cthulhu');
new Catalog('pics/dog-duck.jpg', 'dog-duck', 'Dog-duck');
new Catalog('pics/dragon.jpg', 'dragon', 'Dragon');
new Catalog('pics/pen.jpg', 'pen', 'Pen');
new Catalog('pics/pet-sweep.jpg', 'pet-sweep', 'Pet-sweep');
new Catalog('pics/scissors.jpg', 'scissors', 'Scissors');
new Catalog('pics/shark.jpg', 'shark', 'Shark');
new Catalog('pics/sweep.png', 'sweep', 'Sweep');
new Catalog('pics/tauntaun.jpg', 'tauntaun', 'Tauntaun');
new Catalog('pics/unicorn.jpg', 'unicorn', 'Unicorn');
new Catalog('pics/usb.gif', 'usb', 'Usb');
new Catalog('pics/water-can.jpg', 'water-can', 'Water-can');
new Catalog('pics/wine-glass.jpg', 'wine-glass', 'Wine-glass');

Catalog.prototype.addImage = function(){
  //create an element - img
  var imageElement = document.createElement('img');
  // fill the src with the path to the image
  imageElement.setAttribute('src', this.filePath);
  //fill in alt
  imageElement.setAttribute('alt', this.alt);
  // fill in name
  imageElement.setAttribute('name', this.name);
  //append to parent element (parentElement)
  parentElement.appendChild(imageElement);
};

//helper function
function randomNumber(min=0, max){
  return Math.floor(Math.random() * (max - min +1)) + min;
}

//render three images to the DOM from the array of images above

function getRandomImage(){
  parentElement.textContent = '';

  //call randomNumber to get a random index position from my allItems array. 
  var randomIndex = randomNumber(0, allItems.length-1);
  var secondRandomIndex = randomNumber(0, allItems.length-1);
  var thirdRandomIndex = randomNumber(0, allItems.length-1);

  while((randomIndex === secondRandomIndex) || (randomIndex === thirdRandomIndex) || (secondRandomIndex === thirdRandomIndex)){
    secondRandomIndex = randomNumber(0, allItems.length-1);
    thirdRandomIndex = randomNumber(0, allItems.length-1);
  }

  allItems[randomIndex].addImage();
  allItems[randomIndex].views++;

  allItems[secondRandomIndex].addImage();
  allItems[secondRandomIndex].views++;

  allItems[thirdRandomIndex].addImage();
  allItems[thirdRandomIndex].views++;
}

getRandomImage();


// function handleClick(){
//figure out which item was clicked on
//increment the vote on the item and add to votes
//call the getRandomImage function to generate new items on the page
//}
var totalRounds = 25;

//set up an event listener
parentElement.addEventListener('click', function(){
  var itemThatWasClickedOn = event.target.name;
  for(var j = 0; j<25; j++){
    for(var i = 0; i<allItems.length; i++){
      if(itemThatWasClickedOn === allItems[i].name){
        allItems[i].votes++;
      }
    }
  }


  getRandomImage();
  //figure out which object instance was clicked on
  //loop through all of the object instance and compare the
  //title (aka - the event.target.title) wih the allItems[i].title and find the match
  //incremement the vote on that cat
  //call the getRandomImage function to generage new items to the page
});


