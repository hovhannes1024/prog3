var side = 10;
var lightningArr = [];
var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var waterArr = [];
var matrix = [];
var grassCount = 1000;
var waterCount = 20;
var grasseaterCount = 100;
var predatorCount = 120;
var height_ = 60;
var width_ = 60;

function setup(){
    noStroke();
    frameRate(1000);
    createCanvas(600,600);
    background("#acacac");
    for (var i = 0; i < height_; i++) {
        matrix.push([]);
        for (var j = 0; j < width_; j++) {
            matrix[i].push(0);
        }
    }
    for(let m = 0;m<height_;m++){
        for(let n = 0;n<width_;n++){
            let a = floor(random(0,5));
            if(a == 1){
                if(grassCount > 0 && matrix[m][n] == 0){
                    let m1 = floor(random(matrix.length));
                    let n1 = floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    grassCount--;
                }
            }
            else if(a == 2){
                if(grasseaterCount > 0 && matrix[m][n] == 0){
                    let m1 = floor(random(matrix.length));
                    let n1 = floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    grasseaterCount--;
                }
            }
            else if(a == 3){
                if(predatorCount > 0 && matrix[m][n] == 0){
                    let m1 = floor(random(matrix.length));
                    let n1 = floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    predatorCount--;
                }
            }
            else if(a == 4){
                if(waterCount > 0 && matrix[m][n] == 0){
                    let m1 = floor(random(matrix.length));
                    let n1 = floor(random(matrix[m1].length));
                    matrix[m1][n1] = a;
                    waterCount--;
                }
            }
        }
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                grasseaterArr.push(eatgrass);
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
            }    
        }
    }
    let m1 = floor(random(matrix.length));
    let n1 = floor(random(matrix[m1].length));
    var lightning = new Lightning(n1, m1);
    matrix[m1][n1] = 5;
    lightningArr.push(lightning);
}

function draw() {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill('blue');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill('lightblue');
                rect(j * side, i * side, side, side);
            }
        }
    }

    for(var i in grassArr) {
        grassArr[i].mul();
    }
    for(var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for(var i in predatorArr) {
        predatorArr[i].eat();
    }
    for(var i in waterArr) {
        waterArr[i].mul();
    }
    for(var i in lightningArr) {
        lightningArr[i].move();
    }
}