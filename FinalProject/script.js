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
    var fireCount = document.getElementById('fireCount');
    var diedCount = document.getElementById('died');

    var grassCount1 = document.getElementById('grassCount1');
    var grassEaterCount1 = document.getElementById('grassEaterCount1');
    var predatorCount1 = document.getElementById('predatorCount1');
    var waterCount1 = document.getElementById('waterCount1');
    var lightningCount1 = document.getElementById('lightningCount1');
    var fireCount1 = document.getElementById('fireCount1');
    var diedCount1 = document.getElementById('died1');
    
    var season = document.getElementById('season');
    function clickHandler(evt){
        if (evt){
            console.log(evt.toElement.id);
            socket.emit("data1",evt.toElement.id);
        }
    }
    var grassColor = document.getElementById("grassColor");
    grassColor.addEventListener("click", clickHandler);
    var eatgrassColor = document.getElementById("eatgrassColor");
    eatgrassColor.addEventListener("click", clickHandler);
    var predatorColor = document.getElementById("predatorColor");
    predatorColor.addEventListener("click", clickHandler);
    var waterColor = document.getElementById("waterColor");
    waterColor.addEventListener("click", clickHandler);
    var lightningColor = document.getElementById("lightningColor");
    lightningColor.addEventListener("click", clickHandler);
    var fireColor = document.getElementById("fireColor");
    fireColor.addEventListener("click", clickHandler);
    var diedColor = document.getElementById("diedColor");
    diedColor.addEventListener("click", clickHandler);
        
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
        fireCount.innerText = data.fireCounter;
        diedCount.innerText = data.diedCounter;
        season.innerText = data.seasontext;

        var prcGrass = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcGrass = Math.floor(100 * data.grassArrLength / prcGrass);
        var prcGrassEater = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcGrassEater = Math.floor(100 * data.grasseaterArrLength / prcGrassEater);
        var prcPredator = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcPredator = Math.floor(100 * data.predatorArrLength / prcPredator);
        var prcWater = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcWater = Math.floor(100 * data.waterArrLength / prcWater);
        var prcLightning = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcLightning = Math.floor(100 * data.lightningArrLength / prcLightning);
        var prcFire = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcFire = Math.floor(100 * data.fireArrLength / prcFire);
        var prcDied = data.grassArrLength + data.grasseaterArrLength + data.predatorArrLength + data.lightningArrLength + data.fireArrLength + data.waterArrLength + data.diedArrLength;
        prcDied = Math.floor(100 * data.diedArrLength / prcDied);

        grassCount1.innerText = data.grassArrLength + "-(" + prcGrass + "%)";
        grassEaterCount1.innerText = data.grasseaterArrLength + "-(" + prcGrassEater + "%)";
        predatorCount1.innerText = data.predatorArrLength + "-(" + prcPredator + "%)";
        waterCount1.innerText = data.waterArrLength + "-(" + prcWater + "%)";
        lightningCount1.innerText = data.lightningArrLength + "-(" + prcLightning + "%)";
        fireCount1.innerText = data.fireArrLength + "-(" + prcFire + "%)";
        diedCount1.innerText = data.diedArrLength + "-(" + prcDied + "%)";

        var season2 = data.season1;
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (season2 == 3) {
                        grassColor.style.backgroundColor = "white";
                        fill("white");
                    } else if (season2 == 1) {
                        grassColor.style.backgroundColor = "green";
                        fill("green");
                    } else {
                        grassColor.style.backgroundColor = "33ff33";
                        fill("#33ff33");
                    }
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
                    if (season2 == 3) {
                        waterColor.style.backgroundColor = "lightblue";
                        document.getElementById('waterDescription').innerText = "Սառույց";
                        fill("lightblue");
                    } else {
                        waterColor.style.backgroundColor = "blue";
                        document.getElementById('waterDescription').innerText = "Ջուրն է, որի շուրջը խոտ է աճում";
                        fill("blue");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('orange');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 7) {
                    fill('#669900');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}