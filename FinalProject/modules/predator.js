let parent = require('./parent');
var random = require("./random");
var Died = require("./diedanimal");
module.exports = class Predator extends parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 4;
        this.directions = [];
        this.gender = Math.floor(random(2));
    }

    newDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y -2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    getDirections(t1, t2) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t1 || matrix[y][x] == t2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0, 1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.r = matrix[y][x];
            matrix[y][x] = 3;
            if (this.r == 1) {
                matrix[this.y][this.x] = 1;
            }
            else if (this.r == 0) {
                matrix[this.y][this.x] = 0;
            }
            this.x = x;
            this.y = y;
        }
    }

    eat() {
        if (this.multiply >= 10) {
            setTimeout(() => {
                this.mul();
            }, 10000);
        }
        var fundCords = this.getDirections(2, 7);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            

            for (var i in grasseaterArr) {
                if (x == grasseaterArr[i].x && y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    this.multiply++;
                    this.energy = 3;
                }
            }
            for (var i in diedArr) {
                if (x == diedArr[i].x && y == diedArr[i].y) {
                    diedArr.splice(i, 1);
                    this.energy = 1;
                    this.multiply--;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            this.multiply--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var foundCords = this.getDirections(3);
        if (foundCords) {
            for (let i in foundCords){
                var x = foundCords[i][0];
                var y = foundCords[i][1];
                if(matrix[y][x] == 3 && matrix[y][x].gender != this.gender){
                    var foundCords1 = this.getDirections(0,1,2);
                    var cord1 = random(foundCords1);

                    if (cord1) {
                        var x1 = cord1[0];
                        var y1 = cord1[1];

                        var newPredator = new Predator(x1, y1);
                        predatorArr.push(newPredator);
                        predatorHashiv++;
                        if (matrix[y1][x1] == 1) {
                            for (var j in grassArr) {
                                if (x1 == grassArr[j].x && y1 == grassArr[j].y) {
                                    grassArr.splice(j, 1);
                                }
                            }
                        }else if (matrix[y1][x1] == 2) {
                            for (var j in grasseaterArr) {
                                if (x1 == grasseaterArr[j].x && y1 == grasseaterArr[j].y) {
                                    grasseaterArr.splice(j, 1);
                                }
                            }
                        }
                        matrix[y1][x1] = 3;
                    
                        this.multiply = 0;
                    }
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 7;

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                var died = new Died(this.x, this.y);
                diedArr.push(died);
                diedHashiv++;
                predatorArr.splice(i, 1);
            }
        }
    }
}