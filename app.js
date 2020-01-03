const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById('jsMode');


const INIT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;

}
function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(painting){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    else{
        ctx.beginPath();
        ctx.moveTo(x, y); 
    }
}

function onMouseDown(e){
    painting = true;

}

function changeColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle =  ctx.strokeStyle;
}

function handleRandeChnage(e){
    ctx.lineWidth = e.target.value;
    console.log(e.target.value);
}

function changeMode(e){

    if(filling === false)
    {
        filling = true;
        mode.innerText = "Paint";

    }
    else
    {   
        filling = false;
        mode.innerText = "Fill";
    }
}

function handleCanvasClick(e){
    if(filling == true)
    {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick)
}

if(colors)
{
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range)
{
    range.addEventListener('input', handleRandeChnage)
}

if(mode){
    mode.addEventListener('click', changeMode)
}