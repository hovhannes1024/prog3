class Parent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [];
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
}
class Grass extends Parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        if (this.multiply == 2) {

            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
class Eatgrass extends Parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 3;
        this.directions = [];
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
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
            this.energy++;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            if (this.multiply == 4) {
                this.mul();
                this.multiply = 0;
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
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newGrasseater = new Eatgrass(x, y);
            grasseaterArr.push(newGrasseater);
            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
            }
        }
    }
}
class Lightning extends Parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.directions = [];
    }
    getDirections() {
        this.newDirections();
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
            let y = floor(random(matrix.length));
            let x = floor(random(matrix[y].length));
            matrix[y][x] = 5;
            this.x = x;
            this.y = y;
            this.multiply = 0;
        }
    }
}
class Predator extends Parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.energy = 10;
    }
    getDirections(t1, t2, t3) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t1 || matrix[y][x] == t2 || matrix[y][x] == t3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var fundCords = this.getDirections(0, 1, 2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            let r = matrix[y][x];
            matrix[y][x] = 3;
            if (r == 1) {
                matrix[this.y][this.x] = 1;
            }
            else if (r == 0) {
                matrix[this.y][this.x] = 0;
            }
            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.getDirections(2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply += 2;
            this.energy += 2;
            for (var i in grasseaterArr) {
                if (x == grasseaterArr[i].x && y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                }
            }
            if (this.multiply == 4) {
                this.mul()
                this.multiply = 0;
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
        var fundCords = this.getDirections(1, 2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newPredator = new Predator(x, y);
            predatorArr.push(newPredator);
            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}
class Water extends Parent {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}