//! Setting global arrays  --  START
lightningArr = [];
grassArr = [];
grasseaterArr = [];
predatorArr = [];
waterArr = [];
fireArr = [];
diedArr = [];

matrix = [];
matrixSize = 50;

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
waterHashiv = 0;
lightningHashiv = 0;
fireHashiv = 0;
diedHashiv = 0;

//!for weather calculator
var day = 1;
season = 0;
weather = ['Spring', 'Summer', 'Autumn', 'Winter'];

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
        if (matrix[customX][customY] == 0) {
            matrix[customY][customX] = 1;
        } else {
            i--;
        }
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if (matrix[customX][customY] == 0) {
            matrix[customY][customX] = 2;
        } else {
            i--;
        }
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if (matrix[customX][customY] == 0) {
            matrix[customY][customX] = 3;
        } else {
            i--;
        }
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if (matrix[customX][customY] == 0) {
            matrix[customY][customX] = 4;
        } else {
            i--;
        }
    }
    for (let i = 0; i < lightning; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        if (matrix[customX][customY] == 0) {
            matrix[customY][customX] = 5;
        } else {
            i--;
        }
    }
}
matrixGenerator(matrixSize, 1500, 150, 80, 10, 1);
//! Creating MATRIX -- END
//! Requiring modules  --  START
var Grass = require("./modules/grass");
var GrassEater = require("./modules/eatgrass");
var Predator = require("./modules/predator");
var Water = require("./modules/water");
var Lightning = require("./modules/lightning");
var Fire = require("./modules/fire");
var Died = require("./modules/diedanimal");
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
                predatorHashiv++;
            } else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++;
            } else if (matrix[y][x] == 5) {
                var lightning = new Lightning(x, y);
                lightningArr.push(lightning);
                lightningHashiv++;
            }
        }
    }
}
creatingObjects();
function game() {
    //!click events
    io.on('connection', function (socket) {
        socket.on("data1", click);
        function click(data1){
            data2 = data1;
            console.log(data2);
            if (data2 == "grassColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 1;
                    var grass = new Grass(x, y);
                    grassArr.push(grass);
                    grassHashiv++;
                }
            }else if (data2 == "eatgrassColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 2;
                    var grassEater = new GrassEater(x, y);
                    grasseaterArr.push(grassEater);
                    grassEaterHashiv++;
                }
            }else if (data2 == "predatorColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 3;
                    var predator = new Predator(x, y);
                    predatorArr.push(predator);
                    predatorHashiv++;
                }
            }else if (data2 == "waterColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 4;
                    var water = new Water(x, y);
                    waterArr.push(water);
                    waterHashiv++;
                }
            }else if (data2 == "lightningColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 5;
                    var lightning = new Lightning(x, y);
                    lightningArr.push(lightning);
                    lightningHashiv++;
                }
            }else if (data2 == "fireColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 6;
                    var fire = new Fire(x, y);
                    fireArr.push(fire);
                    fireHashiv++;
                }
            }else if (data2 == "diedColor"){
                let x = Math.floor(random(matrixSize));
                let y = Math.floor(random(matrixSize));
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 7;
                    var died = new Died(x, y);
                    diedArr.push(died);
                    diedHashiv++;
                }
            }
            data2 = NaN;
        }
    });
    //!weather calculator
    if (day > 30) {
        day = 1;
        season++;
    } else {
        day++;
    }
    if (season > 3) {
        season = 0;
    }

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
    if (fireArr[0] !== undefined) {
        for (var i in fireArr) {
            fireArr[i].eat();
        }
    }
    if (diedArr[0] !== undefined) {
        for (var i in diedArr) {
            diedArr[i].tdie();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        waterCounter: waterHashiv,
        lightningCounter: lightningHashiv,
        fireCounter: fireHashiv,
        diedCounter: diedHashiv,
        season1: season,
        lightningArrLength: lightningArr.length,
        grassArrLength: grassArr.length,
        grasseaterArrLength: grasseaterArr.length,
        predatorArrLength: predatorArr.length,
        waterArrLength: waterArr.length,
        fireArrLength: fireArr.length,
        diedArrLength: diedArr.length,
        seasontext: weather[season]
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData), 3000;
}
setInterval(game, 500);