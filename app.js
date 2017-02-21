'use strict';

var totalClicks = 0; //keeps track of # times user has clicked on images



function ProductImage(name, filePath, numShown, numClicks) {
  this.name = name;
  this.filePath = filePath;
  this.numShown = numShown;
  this.numClicks = numClicks;
}

var product1 = new ProductImage('bag', 'images/bag.jpg', 0, 0);
var product2 = new ProductImage('banana', 'images/banana.jpg', 0, 0);
var product3 = new ProductImage('bathroom', 'images/bathroom.jpg', 0, 0);
var product4 = new ProductImage('boots', 'images/boots.jpg', 0, 0);
var product5 = new ProductImage('breakfast', 'images/breakfast.jpg', 0, 0);
var product6 = new ProductImage('bubblegum', 'images/bubblegum.jpg', 0, 0);

var imgTag1 = document.getElementById('one');
var imgTag2 = document.getElementById('two');
var imgTag3 = document.getElementById('three');

var productArray = [product1, product2, product3, product4, product5, product6];

var array = [];
var rand;
for (var y = 0; y < productArray.length; y++) {
  array[y] = y;
}
rand =  Math.floor(Math.random() * array.length);
var j = array[rand];
array.splice(rand,1);
rand =  Math.floor(Math.random() * array.length);
var k = array[rand];
array.splice(rand,1);
rand =  Math.floor(Math.random() * array.length);
var m = array[rand];
// checkNumbers();
imgTag1.setAttribute ('src', productArray[j].filePath);
imgTag2.setAttribute ('src', productArray[k].filePath);
imgTag3.setAttribute ('src', productArray[m].filePath);
console.log(j);
console.log(k);
console.log(m);
var previousArray = [j, k, m];
console.log(previousArray, 'here');

// function checkNumbers() {
//   if (j === k || j === m || k === m) {
//     getThreeImages();
//   };
// }

function getThreeImages() {
  // j = Math.floor(Math.random() * productArray.length);
  // k = Math.floor(Math.random() * productArray.length);
  // m = Math.floor(Math.random() * productArray.length);
var array = [];
var rand;
for (var y = 0; y < productArray.length; y++) {
  array[y] = y;
}
rand =  Math.floor(Math.random() * array.length);
var j = array[rand];
array.splice(rand,1);
rand =  Math.floor(Math.random() * array.length);
var k = array[rand];
array.splice(rand,1);
rand =  Math.floor(Math.random() * array.length);
var m = array[rand];
  console.log(j);
console.log(k);
console.log(m);
setAttributes(j, k, m);
// previousArray = [j, k, m];
console.log(previousArray);
}
function setAttributes(j, k, m) {
  imgTag1.setAttribute ('src', productArray[j].filePath);
  imgTag2.setAttribute ('src', productArray[k].filePath);
  imgTag3.setAttribute ('src', productArray[m].filePath);
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

