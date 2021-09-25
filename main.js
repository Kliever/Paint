let bgCanvas = document.getElementById('canvas');
let ctxBg = bgCanvas.getContext('2d');
let penCanvas = document.getElementById('pen');
let ctxPen = penCanvas.getContext('2d');
let openBtn = document.querySelector('.settings-btn');
let settings = document.querySelector('.settings');
let bg = document.querySelector('.settings__bgcolor-input');
let colorPen = document.querySelector('.settings__colorpen-input');
let penSize = document.querySelector('.settings__sizepen-input');
let penSizeCounter = document.querySelector('.settings__sizepen-counter');
let clearBtn = document.querySelector('.clear-btn');

let mouseUp = false;
let bgColor = bg.value;
let fillStrokeColor = colorPen.value;
let strokeSize = penSize.value;

//size canvas
penCanvas.width = bgCanvas.width = document.querySelector('body').offsetWidth - 13;
penCanvas.height = bgCanvas.height = window.innerHeight - 13;


//start canvas
// penSizeCounter.value = penSize.value;

ctxBg.beginPath();
ctxBg.rect(0, 0, bgCanvas.width, bgCanvas.height);
ctxBg.fillStyle = bgColor;
ctxBg.fill();



openBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  settings.classList.toggle('active');
});




//create bg color
bg.addEventListener('input', function () {
  bgColor = this.value;

  ctxBg.beginPath();
  ctxBg.rect(0, 0, canvas.width, canvas.height);
  ctxBg.fillStyle = bgColor;
  ctxBg.fill();
});

//create pen color
colorPen.addEventListener('input', function () {
  fillStrokeColor = this.value;
});

//create pen size
penSize.addEventListener('input', function () {
  strokeSize = this.value;
  penSizeCounter.value = penSize.value;
});

penSizeCounter.addEventListener('input', function () {
  penSize.value = penSizeCounter.value;
  strokeSize = penSize.value;

  if (+penSizeCounter.value > +penSize.getAttribute('max')) {
    penSizeCounter.value = penSize.getAttribute('max');
  } else if (+penSizeCounter.value < +penSize.getAttribute('min')) {
    penSizeCounter.value = penSize.getAttribute('min');
  }
});

//clear canvas
clearBtn.addEventListener('click', function () {
  ctxPen.clearRect(0, 0, penCanvas.width, penCanvas.height);
});

//on mouse down
penCanvas.addEventListener('mousedown', function (e) {
  openBtn.classList.remove('active');
  settings.classList.remove('active');

  posX = e.offsetX;
  posY = e.offsetY;
  mouseUp = true;
  ctxPen.beginPath();
  paint(posX, posY);
});
penCanvas.addEventListener('mouseup', function () {
  mouseUp = false;
});


penCanvas.addEventListener('mousemove', function (e) {
  posX = e.offsetX;
  posY = e.offsetY;
  if (mouseUp) {
    paint(posX, posY);
  }
});


function paint(posX, posY) {
  ctxPen.lineTo(posX, posY);
  ctxPen.lineWidth = strokeSize * 2;
  ctxPen.fill();
  ctxPen.stroke();
 
  ctxPen.beginPath();
  ctxPen.arc(posX, posY, strokeSize, 0, 2 * Math.PI);
  ctxPen.fillStyle = fillStrokeColor;
  ctxPen.strokeStyle = fillStrokeColor;
  ctxPen.fill();

  ctxPen.beginPath();
  ctxPen.fillStyle = fillStrokeColor;
  ctxPen.moveTo(posX, posY);
  
}

