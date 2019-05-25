//! Setting global arrays  --  START
side = 10;
lightningArr = [];
grassArr = [];
grasseaterArr = [];
predatorArr = [];
waterArr = [];
matrix = [];
grassCount = 1000;
waterCount = 20;
grasseaterCount = 100;
predatorCount = 120;
lightningCount = 1;
var grassHashiv = 0;
var grassEaterHashiv = 0;
//! Setting global arrays  -- END
//! Creating MATRIX -- START
let random = require('./modules/random');
function matrixGenerator(matrixSize, grass, grassEater, predator, water, lightning) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < lightning; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(60, grassCount, grasseaterCount, predatorCount, waterCount, lightningCount);
//! Creating MATRIX -- END
//! Requiring modules  --  START
var Grass = require("./modules/grass");
var GrassEater = require("./modules/eatgrass");
var Predator = require("./modules/predator");
var Water = require("./modules/water");
var Lightning = require("./modules/lightning");
//! Requiring modules  --  END
//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END
function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grasseaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            } else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
            } else if (matrix[y][x] == 5) {
                var lightning = new Lightning(x, y);
                lightningArr.push(lightning);
            }
        }
    }
}
creatingObjects();
function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grasseaterArr[0] !== undefined) {
        for (var i in grasseaterArr) {
            grasseaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        }
    }
    if (lightningArr[0] !== undefined) {
        for (var i in lightningArr) {
            lightningArr[i].move();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
setInterval(game, 1000);