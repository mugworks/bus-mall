'use strict';

var totalClicks = 0; //keeps track of # times user has clicked on images



function ProductImage(fileName) {
  this.name = fileName.split('.')[0];
  this.filePath = 'images/' + fileName;
  this.numShown = 0;
  this.numClicks = 0;
}

var fileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg'];
var productArray = [];
for (var i = 0; i < fileNames.length; i++) {
  productArray.push(new ProductImage(fileNames[i]));
}

var imgTag1 = document.getElementById('one');
var imgTag2 = document.getElementById('two');
var imgTag3 = document.getElementById('three');



// var array = [];
// var rand;
// for (var y = 0; y < productArray.length; y++) {
//   array[y] = y;
// }
// rand = Math.floor(Math.random() * array.length);
// var j = array[rand];
// array.splice(rand,1);
// rand = Math.floor(Math.random() * array.length);
// var k = array[rand];
// array.splice(rand,1);
// rand = Math.floor(Math.random() * array.length);
// var m = array[rand];
// imgTag1.setAttribute ('src', productArray[j].filePath);
// imgTag2.setAttribute ('src', productArray[k].filePath);
// imgTag3.setAttribute ('src', productArray[m].filePath);
// console.log(j);
// console.log(k);
// console.log(m);
// var previousArray = [j, k, m];
// console.log(previousArray, 'here');
// var large;
// var medium;
// var small;
// for (y = 0; y < productArray.length; y++) {  //new code for previous array
//   array[y] = y;
// }
// if (j > k) {
//   if (j > m) {
//     large = j;
//     if (k > m) {
//       medium = k;
//       small = m;
//     } else {
//       medium = m;
//       small = k;
//     }
//   } else if (k > m){
//     large = k;
//     if (m > j) {
//       medium = m;
//       small = j;
//     } else {
//       medium = j;
//       small = m;
//     }
//   }
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
  console.log(j);
  console.log(k);
  console.log(m);
  setAttributes(j, k, m);
  incrementNumShown(j, k, m);
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


function finished() {
  console.log('done');
}

function clickHandler(event) {
  var clickedImage = event.target.getAttribute('src');
  for (var i = 0; i < productArray.length; i++) {
    if (clickedImage == productArray[i].filePath) {
      // console.log(productArray[i].numShown);
      productArray[i].numClicks += 1;
      totalClicks += 1;
      if (totalClicks === 25) {
        finished();
        return;
      }
      getThreeImages();
    }
  };
  console.log(totalClicks);
}

imgTag1.addEventListener('click', clickHandler);
imgTag2.addEventListener('click', clickHandler);
imgTag3.addEventListener('click', clickHandler);

var ctx = document.getElementById('selectionChart');

var chartConfig = {
  type: 'bar',
  data: {
    labels: ['bag', 'banana', 'bathroom'],  //put the image names here
    datasets: [{
      label: 'times clicked',
      data: [3, 7, 4],        //put the number of times clicked here
      backgroundColor: [
        'rgba(255, 0, 0, .5)', //figure out how to alternate colors
        'rgba(0, 255, 0, .5)',
        'rgba(0, 0, 255, .5)'
      ],
      borderColor: [
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