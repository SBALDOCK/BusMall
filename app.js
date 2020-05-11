'use strict';

var parentElement = document.getElementById('busMallParent');

var allItems = [];

function Catalog(url, alt, title){
  this.filePath = url;
  this.alt = alt;
  this.title = title;
  this.votes = votes;
  this.views = 0;
  this.percentage = percentage;
  allItems.push(this);
}

new Catalog('img/bag.jpg', 'bag', 'bag');
new Catalog('img/banana.jpg', 'banana', 'banana');
new Catalog('img/bathroom.jpg', 'bathroom', 'bathroom');
new Catalog('img/boots.jpg', 'boots', 'boots');
new Catalog('img/breakfast.jpg', 'breakfast', 'breakfast');
new Catalog('img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new Catalog('img/chair.jpg', 'chair', 'chair');
new Catalog('img/cthulhu.jpg', 'cthulhu', 'cthulhu');
new Catalog('img/dog-duck.jpg', 'dog-duck', 'dog-duck');
new Catalog('img/dragon.jpg', 'dragon', 'dragon');
new Catalog('img/pen.jpg', 'pen', 'pen');
new Catalog('img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new Catalog('img/scissors.jpg', 'scissors', 'scissors');
new Catalog('img/shark.jpg', 'shark', 'shark');
new Catalog('img/sweep.png', 'sweep', 'sweep');
new Catalog('img/tauntaun.jpg', 'tauntaun', 'tauntaun');
new Catalog('img/unicorn.jpg', 'unicorn', 'unicorn');
new Catalog('img/usb.gif', 'usb', 'usb');
new Catalog('img/water-can.jpg', 'water-can', 'water-can');
new Catalog('img/wine-glass.jpg', 'wine-glass', 'wine-glass');

Catalog.prototype.addImage = function(){
  //create an element - img
  var imageElement = document.createElement('img');
  // fill the src with the path to the image
  imageElement.setAttribute('src', this.filePath);
  //fill in alt
  imageElement.setAttribute('alt', this.alt);
  // fill in title
  imageElement.setAttribute('title', this.title);
  //append to parent element (parent)
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

//set up an event listener
parent.addEventListener('click', function(){
  var itemThatWasClickedOn = event.target.title;

  for(var i = 0; i<allItems.length; i++){
    if(itemThatWasClickedOn === allItems[i].title){
      allItems[i].votes++;
    }
  }

  getRandomImage();
  //figure out which object instance was clicked on
  //loop through all of the object instance and compare the
  //title (aka - the event.target.title) wih the allItems[i].title and find the match
  //incremement the vote on that cat
  //call the getRandomImage function to generage new items to the page
});
