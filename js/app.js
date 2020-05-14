'use strict';

//global variables
var parentElement = document.getElementById('busMallParent');
var uniqueIndexArray = [];
var allItems = [];
var totalVotes = 0;

//check local storage to see if there is an array of products
if(localStorage.getItem('items') === null){

  //Object instances
  new Catalog('bag', '.jpg');
  new Catalog('banana', '.jpg');
  new Catalog('bathroom', '.jpg');
  new Catalog('boots', '.jpg');
  new Catalog('breakfast', '.jpg');
  new Catalog('bubblegum', '.jpg');
  new Catalog( 'chair', '.jpg');
  new Catalog('cthulhu', '.jpg');
  new Catalog('dog-duck', '.jpg');
  new Catalog('dragon', '.jpg');
  new Catalog( 'pen', '.jpg');
  new Catalog('pet-sweep', '.jpg');
  new Catalog('scissors', '.jpg');
  new Catalog('shark', '.jpg');
  new Catalog('sweep', '.png');
  new Catalog('tauntaun', '.jpg');
  new Catalog('unicorn', '.jpg');
  new Catalog( 'usb', '.gif');
  new Catalog('water-can', '.jpg');
  new Catalog('wine-glass', '.jpg');

} else {
  // Get items from local storage
  var itemsFromLocalStorage = localStorage.getItem('items');
  // Convert back to JavaScript
  var itemsBackIntoJavaScript = JSON.parse(itemsFromLocalStorage);
  console.log('this is my parsed array', itemsBackIntoJavaScript);

  // Send parsed data back to allItems array
  for(var i = 0; i<itemsBackIntoJavaScript.length; i++){
    new Catalog(
      itemsBackIntoJavaScript[i].title,
      itemsBackIntoJavaScript[i].filePath.slice(itemsBackIntoJavaScript[i].filePath.length-4),
      itemsBackIntoJavaScript[i].views,
      itemsBackIntoJavaScript[i].votes);
  }
}

//constructor function
function Catalog(name, extension, views=0, votes=0){
  this.filePath = `pics/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = votes;
  this.views = views;
  allItems.push(this);
}

//create image element and retrieve images
Catalog.prototype.addImage = function(){
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentElement.appendChild(imageElement);
};

//helper function
function randomNumber(max){
  return Math.floor(Math.random() * max);
}

//Use helper function to get random images and tally views per image
function displayImage(){
  var index = getRandomImage();
  allItems[index].addImage();
  allItems[index].views++;
}

//get random images that don't repeat themselves
function getRandomImage(){
  var index = randomNumber(allItems.length);
  while(uniqueIndexArray.includes(index)){
    index = randomNumber(allItems.length);
  }

  uniqueIndexArray.push(index);

  //Preventing the current 3 images to match any of the previous 9 shown
  if(uniqueIndexArray.length > 9){
    uniqueIndexArray.shift();
  }

  return index;
}

//event handler
function handleClick(event){
  // parentElement.textContent = '';
  var titleThatWasClickedOn = event.target.title;
  for( var i = 0; i<allItems.length; i++){
    if(titleThatWasClickedOn === allItems[i].title){
      allItems[i].votes++;
      totalVotes++;

      //save allItems array into local storage - this captures all votes even if they don't finish voting
      var stringifiedItems = JSON.stringify(allItems);
      localStorage.setItem('items', stringifiedItems);

      if(totalVotes === 25){
        //turn off event listener
        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }

  parentElement.textContent= '';
  displayImage();
  displayImage();
  displayImage();
}

displayImage();
displayImage();
displayImage();

//event listener
parentElement.addEventListener('click', handleClick);
// event.preventDefault();

var names = [];
var votes = [];
var views = [];
function makeNamesArray(){
  for(var i = 0; i<allItems.length; i++){
    names.push(allItems[i].title);
    votes.push(allItems[i].votes);
    views.push(allItems[i].views);
  }

  generateChart();
  parentElement.textContent = '';
  youVoted();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)',
          'rgba(128, 0, 0, 0.5)'
        ],
        borderColor: [
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31,  1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)',
          'rgba(71, 31, 31, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)',
          'rgba(117, 113, 113, 0.5)'
        ],
        borderColor: [
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)',
          'rgba(47, 44, 44, 1)'
        ],
        borderWidth: 1
      },]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//post-survey thank you message
function youVoted(){
  var feedback = document.createElement('h1');
  feedback.textContent = 'Thank you for your feedback!';
  parentElement.appendChild(feedback);
}











