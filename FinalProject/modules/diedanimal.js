var Grass = require("./grass");
var random = require("./random");
module.exports = class Died {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.die = Math.floor(random(2));
    }
    tdie() {
        this.die--;
        if (this.die <= 0) {
            for (var i in diedArr) {
                if (this.x == diedArr[i].x && this.y == diedArr[i].y) {
                    matrix[this.y][this.x] = 1;
                    var grass = new Grass(this.x, this.y);
                    grassArr.push(grass);
                    grassHashiv++;
                    diedArr.splice(i, 1);
                }
            }
        }
    }
}