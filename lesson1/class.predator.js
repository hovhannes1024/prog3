class Predator{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 10;
        this.directions =[];
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

    getDirections(t1,t2,t3) {
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
        var fundCords = this.getDirections(0,1,2);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            
            let r = matrix[y][x];
            matrix[y][x] = 3;
            if(r == 1){
                matrix[this.y][this.x] = 1;
            }
            else if(r == 0){
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

            this.multiply+=2;

            this.energy+=2;

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
            if (this.energy <= 0){
                this.die();
            }
        }
    }

    mul() {
        var fundCords = this.getDirections(1,2);
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