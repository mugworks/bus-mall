'use strict';

var totalClicks = 0; //keeps track of # times user has clicked on images



function ProductImage(fileName) {
  this.name = fileName.split('.')[0];
  this.filePath = 'images/' + fileName;
  this.numShown = 0;
  this.numClicks = 0;
}

var fileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var productArray = [];
for (var i = 0; i < fileNames.length; i++) {
  productArray.push(new ProductImage(fileNames[i]));
}

var imgTag1 = document.getElementById('one');
var imgTag2 = document.getElementById('two');
var imgTag3 = document.getElementById('three');

//This is code I am testing to keep the previous 3 images from being the same

// initiateThreeImagesOut();
// function initiateThreeImagesOut() {
//   var array = [];
//   var rand;
//   for (var y = 0; y < productArray.length; y++) {
//     array[y] = y;
//   }
//   rand = Math.floor(Math.random() * array.length);
//   var j = array[rand];
//   array.splice(rand,1);
//   rand = Math.floor(Math.random() * array.length);
//   var k = array[rand];
//   array.splice(rand,1);
//   rand = Math.floor(Math.random() * array.length);
//   var m = array[rand];
//   array.splice(rand, 1);
// }




getThreeImages();
function getThreeImages() {
  var array = [];
  var rand;
  for (var y = 0; y < productArray.length; y++) {
    array[y] = y;
  }
  rand = Math.floor(Math.random() * array.length);
  var j = array[rand];
  array.splice(rand,1);
  rand = Math.floor(Math.random() * array.length);
  var k = array[rand];
  array.splice(rand,1);
  rand = Math.floor(Math.random() * array.length);
  var m = array[rand];
  array.splice(rand, 1);

  setAttributes(j, k, m);
  incrementNumShown(j, k, m);

// This is also code I'm looking at to compare 3 images to the previous 3
  // rand = Math.floor(Math.random() * array.length);
  // var t = array[rand];
  // array.splice(rand, 1);
  // var u = array[rand];
  // array.splice(rand, 1);
  // var v = array[rand];
  // array.splice(rand, 1);
  // array.push(j);
  // array.push(k);
  // array.push(m);

  // j = t;
  // k = u;
  // m = v;
  // previousArray = [j, k, m];
  // console.log(previousArray);
}
function setAttributes(j, k, m) {
  imgTag1.setAttribute ('src', productArray[j].filePath);
  imgTag2.setAttribute ('src', productArray[k].filePath);
  imgTag3.setAttribute ('src', productArray[m].filePath);
}
function incrementNumShown(j, k, m) {
  productArray[j].numShown++;
  productArray[k].numShown++;
  productArray[m].numShown++;
}


function clickHandler(event) {
  var clickedImage = event.target.getAttribute('src');
  for (var i = 0; i < productArray.length; i++) {
    if (clickedImage == productArray[i].filePath) {
      productArray[i].numClicks++;
      totalClicks++;
      if (totalClicks === 25) {
        finished();
        return;
      }
      getThreeImages();
    }
  };
}

imgTag1.addEventListener('click', clickHandler);
imgTag2.addEventListener('click', clickHandler);
imgTag3.addEventListener('click', clickHandler);
function finished() {
  alert ('Thank you for providing input on our products! The results of your selections can be seen below.');
  var ctx = document.getElementById('selectionChart');

  var labelNames = [];
  var dataPoints = [];
  var numVotes = [];
  for (var i = 0; i < productArray.length; i++) {
    labelNames.push(productArray[i].name);
    dataPoints.push(productArray[i].numShown);
    numVotes.push(productArray[i].numClicks);
  }


  var chartConfig = {
    type: 'bar',
    data: {
      labels: labelNames,
      datasets: [{
        label: '# of Votes',
        data: numVotes,        //put the number of times clicked here
        backgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(0, 255, 255, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(255, 100, 0, .75)',
          'rgba(0, 255, 100, .75)',
          'rgba(100, 0, 255, .75)',
          'rgba(255, 0, 100, .75)',
          'rgba(255, 0, 0, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(0, 255, 255, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(255, 100, 0, .75)',
          'rgba(0, 255, 100, .75)',
          'rgba(100, 0, 255, .75)',
          'rgba(255, 0, 100, .75)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  };
  var renderedChart = new Chart(ctx, chartConfig);
}