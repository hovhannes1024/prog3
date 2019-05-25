//! Setup function fires automatically
function setup() {
    var socket = io();
    var side = 15;
    var matrix = [];
    //! Getting DOM objects (HTML elements)
    var grassCount = document.getElementById('grassCount');
    var grassEaterCount = document.getElementById('grassEaterCount');
    var predatorCount = document.getElementById('predatorCount');
    var waterCount = document.getElementById('waterCount');
    var lightningCount = document.getElementById('lightningCount');
    var fierCount = document.getElementById('lightningCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        grassCount.innerText = data.grassCounter;
        grassEaterCount.innerText = data.grassEaterCounter;
        predatorCount.innerText = data.predatorCounter;
        waterCount.innerText = data.waterCounter;
        lightningCount.innerText = data.lightningCounter;
        fierCount.innerText = data.fierCounter;
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('lightblue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                }
            }
        }
        console.log(matrix);
    }
}