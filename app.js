const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");

const save = document.getElementById('jsSave');
const fill = document.getElementById('jsFill');
const paint = document.getElementById('jsPaint');
const clear = document.getElementById('jsClear');
const brush = document.getElementById('jsBrush');

const INIT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const status = {
    painting: false,
    brushing: false,
    filling: false,
    drawing: false
};

function initCanvas(){
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = INIT_COLOR;
    ctx.fillStyle = INIT_COLOR;
    ctx.lineWidth = 2.5;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

function startBrushing(){
    status.brushing = true;
    ctx.filter = 'blur(3px)';  
}
function stopBrushing(){
    status.brushing = false;
    ctx.filter = 'blur(0px)';  
}
function stopPainting(){
    status.painting = false;
}
function startPainting(){
    status.painting = true;
}
function startFilling(){
    status.filling = true;
}
function stopFilling(){
    status.filling = false;
}

function stopDrawing(){
    status.drawing = false;
}
function startDrawing(e){
    status.drawing = true;
    onMouseMove(e);
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(status.drawing){
        if(status.brushing){

        }
        else if(status.filling){

        }
        
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
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

function handleCanvasClick(e){
    if(status.painting == true)
    {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleMenu(e){
    e.preventDefault();
}

function handleSave(e){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Paintjs1234';
    link.click();
}

function handleClear(e){
    const preFillStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = preFillStyle;
}

function handleMode(event){
    
    switch(event.target.innerText){
        case "FILL":
            startFilling();
            stopBrushing();
            stopPainting();
            break;
        case "PAINT":
            stopFilling();
            stopBrushing();
            startPainting();
            break;
        case "BRUSH":
            stopFilling();
            startBrushing();
            stopPainting();
            break;
        default:
            stopFilling();
            stopBrushing();
            stopPainting();
            break;
    }
}
/**************** Start *****************/
initCanvas();

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleMenu);
}   

if(colors)
{
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range)
{
    range.addEventListener('input', handleRandeChnage)
}

if(fill){
    fill.addEventListener('click', handleMode)
}
if(paint){
    paint.addEventListener('click', handleMode)
}
if(brush)
{
    brush.addEventListener('click', handleMode);
}

if(save)
{
    save.addEventListener('click', handleSave);
}

if(clear)
{
    clear.addEventListener('click', handleClear);
}
