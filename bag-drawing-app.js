var canvas;
var context;
var canvasWidth = 500;
var canvasHeight = 500;
var bagOutlineImage = new Image();
var pattern = new Image();
var totalLoadResources = 2;
var curLoadResNum = 0;
var ptrn;
var outline = "outline";
var patternName;

function resourceLoaded()
{
        if(++curLoadResNum >= totalLoadResources){
                redraw();
        }
}


function prepareCanvas(isOutline)
{
	var canvasDiv = document.getElementById('canvasDiv');
        canvas = document.getElementById('canvas');
        if (canvas == null) {
	canvas = document.createElement('canvas');
   
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
        }
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	
	// Load images
	// -----------
	outline = isOutline;
	bagOutlineImage.onload = function() {
            resourceLoaded();
        }
        bagOutlineImage.src = "images/Handbag_1.png";

	pattern.onload = function() {
            resourceLoaded();
        }
        patternName = getCheckedValue(document.forms['myForm'].elements['textile']);
        if (patternName == "one") {
          pattern.src = "images/swatch1.jpg";}
        else if (patternName == "two") {
          pattern.src = "images/swatch2.jpg";}
        else if (patternName == "three") {
          pattern.src = "images/swatch3.jpg";}
        else if (patternName == "four") {
          pattern.src = "images/swatch4.jpg";}
       
}

function redraw()
{
        // Make sure required resources are loaded before redrawing
        if(curLoadResNum < totalLoadResources){ return; }

        context.fillStyle = '#ffffff'; // Work around for Chrome
        context.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
        canvas.width = canvas.width; // clears the canvas
           
        ptrn = context.createPattern(pattern, 'repeat');
        context.fillStyle = ptrn;
        
        context.beginPath();  
        context.moveTo(100,110);  
        context.quadraticCurveTo(250,135,400,110);
        context.lineTo(450,275);
        context.quadraticCurveTo(460,300,430,300);
        context.moveTo(100, 110);
        context.lineTo(50,275);
        context.quadraticCurveTo(40,300,70,300);
        context.lineTo(430, 300);
        if (outline === "outline") {context.stroke();} else {context.fill();}
        context.beginPath();
        context.moveTo(350,120);
        context.arc(250,120, 100, 0, Math.PI, true);
        context.lineTo(180, 120);
        context.arc(250,120, 70, Math.PI, 0, false);
        if (outline === "outline") {context.stroke();} else {context.fill();}

}

function getCheckedValue(radioButton) {
       if(!radioButton)
		return "";
	var radioLength = radioButton.length;
	if(radioLength == undefined)
		if(radioButton.checked)
			return radioButton.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioButton[i].checked) {
			return radioButton[i].value;
		}
	}
	return "";
}
