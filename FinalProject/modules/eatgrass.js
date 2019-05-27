let parent = require('./parent');
var random = require("./random");
var Died = require("./diedanimal");
module.exports = class Eatgrass extends parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 2;
        this.directions = [];
        this.gender = Math.floor(random(2));
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getDirections(t, t1) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t || matrix[y][x] == t1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }

    eat() {
        if (this.multiply >= 2) {
            setTimeout(() => {
                this.mul();
            }, 1000); 
        }
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy = 3;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }




        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var foundCords = this.getDirections(2);
        if (foundCords) {
            for (let i in foundCords) {
                var x = foundCords[i][0];
                var y = foundCords[i][1];
                if (matrix[y][x] == 2 && matrix[y][x].gender != this.gender) {
                    var foundCords1 = this.getDirections(0, 1);
                    var cord1 = random(foundCords1);

                    if (cord1) {
                        var x1 = cord1[0];
                        var y1 = cord1[1];

                        var newGrasseater = new Eatgrass(x1, y1);
                        grasseaterArr.push(newGrasseater);
                        grassEaterHashiv++;
                        if (matrix[y1][x1] == 1) {
                            for (var j in grassArr) {
                                if (x1 == grassArr[j].x && y1 == grassArr[j].y) {
                                    grassArr.splice(j, 1);
                                }
                            }
                        }
                        matrix[y1][x1] = 2;

                        this.multiply = 0;
                    }
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 7;

        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                var died = new Died(this.x, this.y);
                diedArr.push(died);
                diedHashiv++;
                grasseaterArr.splice(i, 1);
            }
        }
    }
}