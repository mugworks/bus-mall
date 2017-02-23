'use strict';

var totalClicks = 0; //keeps track of # times user has clicked on images

var previousImages = [0, 1, 2];
var storedItems;
var imgs;

function ProductImage(fileName) {
  this.name = fileName.split('.')[0];
  this.filePath = 'images/' + fileName;
  this.numShown = 0;
  this.numClicks = 0;
}

var fileNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var productArray = [];

var imgTag1 = document.getElementById('one');
var imgTag2 = document.getElementById('two');
var imgTag3 = document.getElementById('three');

// Pulling info from local storage
var imgString = localStorage.getItem('imgs');
if (imgString) {
  productArray = JSON.parse(imgString);
} else {
  for (var i = 0; i < fileNames.length; i++) {
    productArray.push(new ProductImage(fileNames[i]));
  }
}




getThreeImages();
function getThreeImages() {
  var array = [];
  var rand;
  for (var y = 0; y < productArray.length; y++) {
    if (previousImages.indexOf(y) === -1) {
      array.push(y);
    }
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
  previousImages = [j, k, m];

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
  renderTableBody();
  storeDataLocally();
  alert ('Thank you for providing input on our products! The results of your selections can be seen below.');

//Store data
  function storeDataLocally() {
    imgs = productArray;
    storedItems = JSON.stringify(productArray);
    console.log('this is being stored ', storedItems);
    localStorage.setItem('imgs', storedItems);
  }




//Create chart

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

//Create Table
function renderTableBody() {
  var storeTable = document.getElementById('data-table');
  var tableHeader = document.createElement('th');
  tableHeader.textContent = 'Items';
  storeTable.appendChild(tableHeader);
  tableHeader = document.createElement('th');
  tableHeader.textContent = 'Views';
  storeTable.appendChild(tableHeader);
  tableHeader = document.createElement('th');
  tableHeader.textContent = 'Clicks';
  storeTable.appendChild(tableHeader);
  tableHeader = document.createElement('th');
  tableHeader.textContent = '% of clicks when viewed';
  storeTable.appendChild(tableHeader);
  tableHeader = document.createElement('th');
  tableHeader.textContent = 'Recommended?';
  storeTable.appendChild(tableHeader);
  for (i = 0; i < productArray.length; i++) {
    var tableRow = document.createElement('tr');
    var tableRowHeader = document.createElement('th');
    tableRowHeader.textContent = productArray[i].name;
    tableRow.appendChild(tableRowHeader);
    var tableRowCell = document.createElement('td');
    tableRowCell.textContent = productArray[i].numShown;
    tableRow.appendChild(tableRowCell);
    tableRowCell = document.createElement('td');
    tableRowCell.textContent = productArray[i].numClicks;
    tableRow.appendChild(tableRowCell);
    tableRowCell = document.createElement('td');
    var percent = (productArray[i].numClicks / productArray[i].numShown * 100).toFixed(2);
    tableRowCell.textContent = percent + '%';
    tableRow.appendChild(tableRowCell);
    tableRowCell = document.createElement('td');
    if (percent >= 40) {
      tableRowCell.textContent = 'YES';
      tableRowCell.style.backgroundColor = 'red';
    } else {
      tableRowCell.textContent = 'NO';
    }
    tableRow.appendChild(tableRowCell);
    storeTable.appendChild(tableRow);
  }
}