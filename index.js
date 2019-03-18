// Canvas and Context declaration

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
let context = canvas.getContext("2d");

// Setting variables

let bloc, j;
let blocs = [];
let numbers = 10;
let a = 1;
let b = 1;
let k = 0;

// Get a list of "numbers" blocs x "numbers" blocs

for (let y = 0; y < numbers; y++) {
    j = 0;
    a = 1;
    for (let i = 0; i < numbers; i++) {
        bloc = new Bloc(canvas.width / 2 - numbers / 2 * 30 + i * 30 - y * 30, y * 10 + i * 10, j / 2 + k / 2);
        blocs.push(bloc);
        if (a == 1)
            if (j < numbers / 2 - 1)
                j++;
            else
                a = 0;
        else if (a == 0)
            j--;
    }
    if (b == 1)
        if (k < numbers / 2 - 1)
            k++;
        else
            b = 0;
    else if (b == 0)
        k--;
}

// Set the interval. This interval launch the main loop function -> Update()

let interval = setInterval(Update, 1);

// Create a new class. The class Bloc is an object
// who can stretch himself, following a sinusoidal movement

function Bloc(x, y, angle) {

    // Initialize the class with some variables

    this.inity = y;
    this.x = x;
    this.y = y;
    this.sizey = 50;
    this.sizex = 20;
    this.angle = angle;

    // function to stretch the Bloc
    
    this.move = function() {
        this.y = this.inity + canvas.height / 2 - ((Math.sin(this.angle) + 1) * numbers * 10 / 2 + 50) - 50;
        this.sizey = ((Math.sin(this.angle) + 1) * numbers * 10 / 2 + 50) * 2;
        this.angle += 0.02;
    }

    // function to draw the Bloc
    // We can replace it with a picture (but take care of the x and y placements)

    this.draw = function() {
        context.strokeStyle = "black";
        context.fillStyle = "lightgreen";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.sizex, this.y - this.sizex / 2);
        context.lineTo(this.x + this.sizex * 2, this.y);
        context.lineTo(this.x + this.sizex, this.y + this.sizex / 2);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.fill();
        context.closePath();
        context.fillStyle = "green";
        context.beginPath();
        context.moveTo(this.x + this.sizex * 2, this.y);
        context.lineTo(this.x + this.sizex * 2, this.y + this.sizey);
        context.lineTo(this.x + this.sizex, this.y + this.sizey + this.sizex / 2);
        context.lineTo(this.x, this.y + this.sizey);
        context.lineTo(this.x, this.y);
        context.lineTo(this.x + this.sizex, this.y + this.sizex / 2);
        context.lineTo(this.x + this.sizex * 2, this.y);
        context.stroke();
        context.fill();
        context.closePath();
        context.beginPath();
        context.moveTo(this.x + this.sizex, this.y + this.sizex / 2);
        context.lineTo(this.x + this.sizex, this.y + this.sizey + this.sizex / 2);
        context.stroke();
        context.closePath();
    }
}

// draw the background to clear the screen

function drawBackground() {
    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// main loop function
// the function who draw and move all objects

function Update() {
    drawBackground();
    blocs.forEach(bloc => {
        bloc.draw();
        bloc.move();
    });
}