let parent = require('./parent');
var random = require("./random");
module.exports = class Lightning extends parent {
    constructor(x, y) {
        super(x,y);
        this.multiply = 0;
        this.directions = [];
    }
    getDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y]
        ];
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    move() {
        let cord = this.getDirections();
        for (let i in cord) {
            let x1 = cord[i][0];
            let y1 = cord[i][1];
            matrix[y1][x1] = 0;
            for (let j in waterArr) {
                if (x1 == waterArr[j].x && y1 == waterArr[j].y) {
                    waterArr.splice(j, 1);
                }
            }
            for (let j in predatorArr) {
                if (x1 == predatorArr[j].x && y1 == predatorArr[j].y) {
                    predatorArr.splice(j, 1);
                }
            }
            for (let j in grasseaterArr) {
                if (x1 == grasseaterArr[j].x && y1 == grasseaterArr[j].y) {
                    grasseaterArr.splice(j, 1);
                }
            }
            for (let j in grassArr) {
                if (x1 == grassArr[j].x && y1 == grassArr[j].y) {
                    grassArr.splice(j, 1);
                }
            }
        }
        this.multiply++;
        if (this.multiply >= 5) {
            matrix[this.y][this.x] = 0;
            let y = Math.floor(random(matrix.length));
            let x = Math.floor(random(matrix[y].length));
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
            this.multiply = 0;
        }
    }
}