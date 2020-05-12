'use strict';

var parentElement = document.getElementById('busMallParent');
var uniqueIndexArray = [];
var allItems = [];
var totalVotes = 0;

function Catalog(name, extension){
  this.filePath = `pics${name}${extension}`;
  this.alt = name;
  // this.alt = alt;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  // this.percentage = percentage;
  allItems.push(this);
}

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

Catalog.prototype.addImage = function(){
  // var index = getRandomImage();

  var imageElement = document.createElement('img');
  imageElement.src = this.filepath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentElement.appendChild(imageElement);
};

//helper function
function randomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomImage();
  allItems[index].addImage();
}

//render three images to the DOM from the array of images above

//An easier way to get random images that don't repeat themselves
function getRandomImage(){
  var index = randomNumber(allItems.length);

  //this loop will check to make sure index is unique and will produce a new index if it is in the index array
  while(uniqueIndexArray.includes(index)){
    index = randomNumber(allItems.length);
  }

  uniqueIndexArray.push(index);

  //if array is more than 3 items long, need to shift from the beginning

  if(uniqueIndexArray.length > 3){
    uniqueIndexArray.shift();
  }

  return index;
}

function handleClick(event){
  parentElement.textContent = '';
  var titleThatWasClickedOn = event.target.title;

  for( var i = 0; i<allItems.length; i++){
    if(titleThatWasClickedOn === allItems[i].title){
      allItems[i].votes++;
      totalVotes++;

      if(totalVotes === 25){
        //turn off event listener
        parentElement.removeEventListener('click', handleClick);
      }
    }
  }

  displayImage();
  displayImage();
  displayImage();

}

displayImage();
displayImage();
displayImage();

//add event listener

parentElement.addEventListener('click', handleClick);



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
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



// function handleClick(){
//figure out which item was clicked on
//increment the vote on the item and add to votes
//call the getRandomImage function to generate new items on the page
//}
// var totalRounds = 25;

//set up an event listener
// parentElement.addEventListener('click', function(){
//   var itemThatWasClickedOn = event.target.title;
//   for(var j = 0; j<25; j++){
//     for(var i = 0; i<allItems.length; i++){
//       if(itemThatWasClickedOn === allItems[i].title){
//         allItems[i].votes++;
//       }
//     }
//   }




