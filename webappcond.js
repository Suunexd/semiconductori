<script>
 
var canvas = document.getElementById("patrat");
var randamm=0;
var circuit = new Image;
circuit.src='circuit.png';
var switcho = new Image;
switcho.src='switch_on.png';
var switchf = new Image;
switchf.src='switch_off.png';
var becs = new Image;
becs.src='bec_off.png';
var beca = new Image;
beca.src='bec_on.png';

var ctx = canvas.getContext("2d");

var x = 50;
var y = 50;

var imagini = [];
var width = 100;
var height = 125; 
var surse = ['aluminiu.png' , 'lemn.png' , 'cupru.png','plastic.png','inox.png','sticla.png','aur.png','hartie.png'];
var paritate;
var on = 0;
var working = 0;

if(surse.length%2 == 0) paritate = 1;
else paritate = 0.52;
var incarcate = 0;
for (var index = 0; index < surse.length; index++) {
   
      var sursa = surse[index];
      var imag = new Image();
      imag.onload = function() {
          incarcate++;
          if (incarcate === surse.length) {
              desen();
          }
      };
      imag.src = sursa ;
      if(index <= surse.length/2)
      imagini.push({
          img: imag,
          x: 50,
          y: 50 + index * (height + 10 ),
          width: width,
          height: height  ,
          offsetX: 0,
          offsetY: 0,
          isDragging: false
      });
      else {
          imagini.push({
          img: imag,
          x: 60 + height,
          y: 50 + (index - surse.length/2 - paritate) * (height + 10 ),
          width: width,
          height: height  ,
          offsetX: 0,
          offsetY: 0,
          isDragging: false
      });

      }
  }
  
  
var draggedImageIndex = -1; 
var isDragging = false;

var offsetX, offsetY;

var canvasOffsetX, canvasOffsetY;



const resultbox = document.getElementById('resultbox');
function desen() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(circuit, 450, 100, circuit.width * 1.5, circuit.height * 1.5);
ctx.drawImage(switchf, 835, 175, switchf.width * 0.2, switchf.height * 0.2);

if (working == 1)
  ctx.drawImage(switcho, 838, 170, switcho.width * 0.2, switcho.height * 0.2);
ctx.drawImage(becs, 900, 555, becs.width * 1.5, becs.height * 1.5);
if (on == 1)
  ctx.drawImage(beca, 900, 555, beca.width * 1.5, beca.height * 1.5);

imagini.forEach(function(imagine, index) {
  if (index !== draggedImageIndex) {
      ctx.drawImage(imagine.img, imagine.x, imagine.y, imagine.width, imagine.height);
  }
});

if (draggedImageIndex !== -1) {
  var draggedImage = imagini[draggedImageIndex];
  ctx.drawImage(draggedImage.img, draggedImage.x, draggedImage.y, draggedImage.width, draggedImage.height);
}
ctx.font = 'bold 24px Arial';
ctx.fillText(`Raport: ${randamm}%`, 880,700);
}

      canvas.addEventListener("click",function(event){
          var clickX = event.clientX - canvas.getBoundingClientRect().left;
          var clickY = event.clientY - canvas.getBoundingClientRect().top;
          if( 
              clickX >= 830 &&
              clickX <= 1000 &&
              clickY >=150 &&
              clickY <= 270
          )
          {
              if(working == 0)
              {working = 1 ;
                  desen();
                  
              }
              else resetCanvas();
          }
          
      });
 


      canvas.addEventListener("mousedown", function(event) {
canvasOffsetX = canvas.getBoundingClientRect().left;
canvasOffsetY = canvas.getBoundingClientRect().top;

imagini.forEach(function(imagine, index) {
  var offsetX = event.clientX - canvasOffsetX - imagine.x;
  var offsetY = event.clientY - canvasOffsetY - imagine.y;

  if (
      offsetX >= 0 &&
      offsetX <= imagine.width &&
      offsetY >= 0 &&
      offsetY <= imagine.height
  ) {
      imagine.offsetX = offsetX;
      imagine.offsetY = offsetY;
      imagine.isDragging = true;
      isDragging = true;
      draggedImageIndex = index; 
  }
});
});

canvas.addEventListener("mousemove", function(event) {
if (isDragging) {
  var draggedImage = imagini[draggedImageIndex];
  draggedImage.x = event.clientX - canvasOffsetX - draggedImage.offsetX;
  draggedImage.y = event.clientY - canvasOffsetY - draggedImage.offsetY;
  desen();
}
});

function randament(Rezistivitate,putere)
{   var I=250/1000;
  var cuprurez=1.68/100000000;
  var S=1;
  var l=2;
  var rezistentacomparativa=cuprurez*l/S;
  var UCu=I*rezistentacomparativa;
  var zecear=Math.pow(10,putere);
  var rezistenta=(Rezistivitate*zecear*l)/S;
  var U=I*rezistenta;
  var rand=U/UCu;
  rand=rand*100;
  rand = rand.toFixed(2);
  return rand;
}

canvas.addEventListener("mouseup", function(event) {
var clickX = event.clientX - canvas.getBoundingClientRect().left;
          var clickY = event.clientY - canvas.getBoundingClientRect().top;
if (isDragging) {
  if (
          clickX >= 1200 &&
          clickX <= 1300 && 
          clickY >= 500 &&
          clickY <= 800 
          
      ) {
          if(draggedImageIndex == 0)
          {   console.log("aaaa");
              randamm=randament(2.82,-8);
              on = 1;
              
              console.log(randamm);
              
              
          }
          if(draggedImageIndex == 2)
          {   randamm=randament(1.68,-8);
              on = 1;
              console.log(randamm);
          }
          if( draggedImageIndex == 4)
          {  randamm=randament(6.90,-7);
              on = 1;
              console.log(randamm);
          }
          if(draggedImageIndex == 6)
          {   randamm=randament(2.44,-8);
              on = 1;
              console.log(randamm);
          }
          
         if(draggedImageIndex !=0 &&
         draggedImageIndex !=2    &&
         draggedImageIndex !=4    &&
         draggedImageIndex !=6 
         )    
          on = 0;
          
          
      }
      else randamm=0;
  isDragging = false;
  draggedImageIndex = -1; 
}

     
  

});
function resetCanvas() {
on = 0; 
working = 0;
draggedImageIndex = -1; 
isDragging = false;

desen(); 
}



</script>