class Obj {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
    }
    //Reduce frame lag by only drawing objects which are visible +/- 1.3 screen widths
    visible(_xVal) {
        let px = player.x;
        let x = _xVal;
        let dw = width * 1.3; //draw width window

        if(px + dw > x && px - dw < x){
            return true;
        }
    }
    //Create complex shapes from coordinate points (from data.js)
    complexVertShape(_shp,_scale = 1,_x = 0,_y = 0){
        let vx = 0; //vertex x
        let vy = 0; //vertex y
        beginShape();
        for (let i = 0; i < _shp.length; i++){
            if (i === 0 || i % 2 === 0){
                vx = _shp[i] * _scale + _x;
            } else {
                vy = _shp[i] * _scale + _y;
                vertex(vx,vy);
            }
        }
        endShape();
    }
}

class Canyon extends Obj {

    constructor(_x, _y, _w, _h) {
        super(_x, _y, _w, _h);
    }

    show(_playerWidth, _worldHeight) {
        this.cheight = _worldHeight;
        this.pwidth = _playerWidth;
        if(super.visible(this.x)) {
            noStroke();
            fill(0, 0, 0, 200);
            beginShape();
            vertex(this.x - this.pwidth / 2, 432);
            vertex(this.x - this.pwidth / 2, 432);
            curveVertex(this.x - this.pwidth / 2 - 5, 472);
            curveVertex(this.x - this.pwidth / 2 - 50, 496);
            curveVertex(this.x - this.pwidth / 2 - 60, 508);
            curveVertex(this.x - this.pwidth / 2 - 60, 525);
            curveVertex(this.x - this.pwidth / 2 - 50, 536);
            curveVertex(this.x - this.pwidth / 2 - 40, 564);
            curveVertex(this.x - this.pwidth / 2 - 35, this.cheight);
            curveVertex(this.x + this.w + this.pwidth, this.cheight);
            curveVertex(this.x + this.w + this.pwidth + 15, 564);
            curveVertex(this.x + this.w + this.pwidth + 30, 536);
            curveVertex(this.x + this.w + this.pwidth + 45, 525);
            curveVertex(this.x + this.w + this.pwidth + 45, 508);
            curveVertex(this.x + this.w + this.pwidth + 20, 496);
            curveVertex(this.x + this.w + this.pwidth / 2, 472);
            vertex(this.x + this.w + this.pwidth / 2, 432);
            vertex(this.x + this.w + this.pwidth / 2, 432);
            endShape();
            fill(0, 100, 0);
            beginShape();
            vertex(this.x - this.pwidth / 2 + 2, 432);
            vertex(this.x - this.pwidth / 2 + 2, 432);
            curveVertex(this.x - this.pwidth / 2 + 2, 472);
            curveVertex(this.x - this.pwidth / 2 - 10, 452);
            vertex(this.x - this.pwidth / 2 - 42, 432);
            vertex(this.x - this.pwidth / 2 - 42, 432);
            endShape();
            beginShape();
            vertex(this.x + this.w + this.pwidth / 2 - 2, 432);
            vertex(this.x + this.w + this.pwidth / 2 - 2, 432);
            curveVertex(this.x + this.w + this.pwidth / 2 - 8, 452);
            curveVertex(this.x + this.w + this.pwidth / 2 - 10, 482);
            curveVertex(this.x + this.w + this.pwidth / 2 + 20, 442);
            vertex(this.x + this.w + this.pwidth / 2 + 42, 432);
            vertex(this.x + this.w + this.pwidth / 2 + 42, 432);
            endShape();
            beginShape();
            curveVertex(this.x + this.w + this.pwidth + 37, 546);
            curveVertex(this.x + this.w + this.pwidth + 27, 546);
            curveVertex(this.x + this.w + this.pwidth + 25, 542);
            curveVertex(this.x + this.w + this.pwidth + 30, 534);
            curveVertex(this.x + this.w + this.pwidth + 45, 522);
            curveVertex(this.x + this.w + this.pwidth + 45, 528);
            endShape(CLOSE);
            fill(150);
            textSize(20);
            rect(this.w / 2 + this.x - 15, 542, 30, 40); // did not scale the tombstone,but made it so always center
            ellipse(this.w / 2 + this.x, 542, 30, 30);
            fill(100);
            text("RIP", this.w / 2 + this.x - 10, 560);
        }
    }
}

class Platform extends Obj {

    constructor(_x, _y, _w, _h, _type) {
        super(_x, _y, _w, _h);
        this.type = _type;
    }

    show(_ground, _screenHeight) {
        this.ground = _ground;
        this.sh = _screenHeight;
        if((this.type === "invis") || (super.visible(this.x))) {
            if (this.type === "log") {
                fill(80, 50, 0);
                rect(
                    this.x,
                    this.y,
                    this.w,
                    this.h
                );
                rect(
                    this.x + 5,
                    this.y + this.h,
                    this.h,
                    this.sh * 0.75 - this.y - this.h
                );
                rect(
                    this.x + this.w - this.h - 5,
                    this.y + this.h,
                    this.h,
                    this.sh * 0.75 - this.y - this.h
                );
                fill(0, 0, 0, 100);
                rect(
                    this.x,
                    this.y + this.h / 2,
                    this.w,
                    this.h / 2
                );
                triangle(
                    this.x + 5,
                    this.y + this.h,
                    this.x + 5 + this.h,
                    this.y + this.h,
                    this.x + 5 + this.h,
                    this.ground
                );
                triangle(
                    this.x + this.w - this.h - 5,
                    this.y + this.h,
                    this.x + this.w - 5,
                    this.y + this.h,
                    this.x + this.w - 5,
                    this.ground
                );
            } else if (this.type === "dirt") {
                fill(73, 55, 41);
                rect(this.x, this.y, this.w, this.ground - this.y);
                fill(0, 0, 0, 100);
                beginShape();
                curveVertex(this.x, this.y);
                curveVertex(this.x, this.y);
                for (let j = 0; j < this.w; j += 10) {
                    if (j % 40 === 0) {
                        curveVertex(this.x + j + 3, this.y + 5 + 3);
                    } else if (j % 30 === 0) {
                        curveVertex(this.x + j + 3, this.y + 7 + 3);
                    } else if (j % 50 === 0) {
                        curveVertex(this.x + j + 3, this.y + 14 + 3);
                    } else {
                        curveVertex(this.x + j + 3, this.y + 12 + 3);
                    }
                }
                curveVertex(this.x + this.w, this.y);
                curveVertex(this.x + this.w, this.y);
                endShape();
                fill(0, 100, 0);
                beginShape();
                curveVertex(this.x, this.y);
                curveVertex(this.x, this.y);
                for (let j = 0; j < this.w; j += 10) {
                    if (j % 40 === 0) {
                        curveVertex(this.x + j, this.y + 5);
                    } else if (j % 30 === 0) {
                        curveVertex(this.x + j, this.y + 7);
                    } else if (j % 50 === 0) {
                        curveVertex(this.x + j, this.y + 14);
                    } else {
                        curveVertex(this.x + j, this.y + 12);
                    }
                }
                curveVertex(this.x + this.w, this.y);
                curveVertex(this.x + this.w, this.y);
                endShape();
            }
        }
    }
}

class Flagpole extends Obj {

    constructor(_x, _y, _w, _h, _isReached) {
        super(_x, _y, _w, _h);
        this.isReached = _isReached;
    }

    show(_ground) {
        this.ground = _ground;
        if(super.visible(this.x)) {
            noStroke();
            fill(80, 80, 200);
            rect(this.x, this.ground, 6, -250);
            ellipse(this.x + 3, this.ground - 250, 15, 15);
            fill(0,0,0,64);
            rect(this.x + 4, this.ground, 2, -243);
            ellipse(this.x + 3, this.ground - 250, 15, 15);
            quad(
                this.x, this.ground + 1,
                this.x + 6, this.ground + 1,
                this.x + 106, this.ground + 39,
                this.x + 100, this.ground + 39
            );
            ellipse(this.x + 105, this.ground + 40, 12, 3);
            fill(80,80,200);
            ellipse(this.x + 3, this.ground - 250, 8, 15);
            arc(this.x + 3, this.ground - 250, 15, 15, radians(90), radians(270));
            if(this.isReached){
                fill(200,80,80);
                beginShape();
                vertex(this.x + 6, this.ground - 242);
                curveVertex(this.x + 20, this.ground - 250);
                curveVertex(this.x + 40, this.ground - 240);
                vertex(this.x + 60, this.ground - 240);
                curveVertex(this.x + 50, this.ground - 220);
                curveVertex(this.x + 25, this.ground - 230);
                vertex(this.x + 6, this.ground - 222);
                vertex(this.x + 6, this.ground - 222);
                endShape(CLOSE);
                fill(0,0,0,64);
                beginShape();
                vertex(this.x + 101, this.ground + 37);
                curveVertex(this.x + 107, this.ground + 38);
                curveVertex(this.x + 127, this.ground + 36);
                vertex(this.x + 147, this.ground + 36);
                curveVertex(this.x + 137, this.ground + 33);
                curveVertex(this.x + 112, this.ground + 35);
                vertex(this.x + 92, this.ground + 33);
                vertex(this.x + 92, this.ground + 33);
                endShape(CLOSE);
            } else {
                fill(200, 80, 80);
                beginShape();
                vertex(this.x + 6, this.ground - 42);
                curveVertex(this.x + 20, this.ground - 50);
                curveVertex(this.x + 40, this.ground - 40);
                vertex(this.x + 60, this.ground - 40);
                curveVertex(this.x + 50, this.ground - 20);
                curveVertex(this.x + 25, this.ground - 30);
                vertex(this.x + 6, this.ground - 22);
                vertex(this.x + 6, this.ground - 22);
                endShape(CLOSE);
                fill(0, 0, 0, 64);
                beginShape();
                vertex(this.x + 24, this.ground + 8);
                curveVertex(this.x + 30, this.ground + 9);
                curveVertex(this.x + 50, this.ground + 7);
                vertex(this.x + 70, this.ground + 7);
                curveVertex(this.x + 60, this.ground + 4);
                curveVertex(this.x + 35, this.ground + 6);
                vertex(this.x + 15, this.ground + 4);
                vertex(this.x + 15, this.ground + 4);
                endShape(CLOSE);
            }
        }
    }
}

class Collectable extends Obj{

    constructor(_x, _y, _w, _h, _scale, _isFound, _colour, _val) {
        super(_x, _y, _w, _h);
        this.scale = _scale;
        this.isFound = _isFound;
        this.colour = _colour;
        this.val = _val;
    }

    show() {
        if(super.visible(this.x)) {
            fill(0, 0, 0, 64);
            ellipse(
                18 * this.scale + this.x,
                29 * this.scale + this.y,
                17 * this.scale,
                4 * this.scale
            );
            stroke(120, 80, 0);
            strokeWeight(2 * this.scale);
            line(
                14 * this.scale + this.x,
                11 * this.scale + this.y,
                14 * this.scale + this.x,
                28 * this.scale + this.y
            );
            noStroke();
            fill(250, 125, 0);
            triangle(
                9 * this.scale + this.x,
                this.y, 9 * this.scale + this.x,
                6 * this.scale + this.y,
                1 * this.scale + this.x,
                3 * this.scale + this.y
            );
            if (this.colour === 'yellow') {
                fill(250, 250, 0);
            } else if (this.colour === 'red') {
                fill(220, 0, 0);
            } else if (this.colour === 'purple') {
                fill(220, 0, 220);
            }
            ellipse(
                14 * this.scale + this.x,
                16 * this.scale + this.y,
                15 * this.scale,
                20 * this.scale
            );
            ellipse(
                14 * this.scale + this.x,
                3 * this.scale + this.y,
                10 * this.scale,
                10 * this.scale
            );
            triangle(
                14 * this.scale + this.x,
                6 * this.scale + this.y,
                14 * this.scale + this.x,
                23 * this.scale + this.y,
                34 * this.scale + this.x,
                21 * this.scale + this.y
            );
            fill(220, 220, 200);
            ellipse(
                11 * this.scale + this.x,
                13 * this.scale + this.y,
                8 * this.scale,
                10 * this.scale
            );
            if (this.colour === 'yellow') {
                fill(250, 230, 0);
            } else if (this.colour === 'red') {
                fill(180, 0, 0);
            } else if (this.colour === 'purple') {
                fill(180, 0, 180);
            }
            triangle(
                14 * this.scale + this.x,
                11 * this.scale + this.y,
                14 * this.scale + this.x,
                23 * this.scale + this.y,
                34 * this.scale + this.x,
                16 * this.scale + this.y
            );
            ellipse(
                13 * this.scale + this.x,
                17 * this.scale + this.y,
                8 * this.scale,
                12 * this.scale
            );
            fill(0, 0, 0);
            ellipse(
                13 * this.scale + this.x,
                1 * this.scale + this.y,
                2 * this.scale,
                2 * this.scale
            );
        }
    }
}

class Sun {
    
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.sr = 0;
    }
    
    show(_ground, _worldSunRotation) {
        this.ground = _ground;
        this.sr += _worldSunRotation;
        noStroke();
        fill(255, 200, 0);
        beginShape();
        for (let i = 0; i < 36; i++) {
            let r = 0;
            if (i % 3 === 0) {
                r = 80;
            } else {
                r = 35;
            }
            let xVal = r * cos(this.sr + i * 4);
            let yVal = r * sin(this.sr + i * 4);
            curveVertex(this.x + xVal, this.y + yVal);
        }
        endShape();
        fill(255, 155, 0);
        ellipse(this.x, this.y, 99, 99);
        fill(255, 175, 0);
        ellipse(this.x + 27, this.y + 3, 24, 20);
        ellipse(this.x - 27, this.y + 3, 24, 20);
        fill(255);
        strokeWeight(1);
        stroke(200, 150, 150);
        ellipse(this.x + 9, this.y - 10, 22, 22);
        ellipse(this.x - 9, this.y - 10, 22, 22);
        strokeWeight(2);
        stroke(60);
        if (player.y < (this.ground + 1)) { //Change the expression of the sun if you fall.
            curve(
                this.x - 25, this.y - 12,
                this.x - 15, this.y - 22,
                this.x - 3, this.y - 22,
                this.x, this.y - 12
            );
            curve(
                this.x + 25, this.y - 12,
                this.x + 15, this.y - 22,
                this.x + 3, this.y - 22,
                this.x, this.y - 12
            );
            strokeWeight(1);
            curve(
                this.x + 25, this.y - 20,
                this.x + 18, this.y + 15,
                this.x - 18, this.y + 15,
                this.x - 25, this.y - 20
            );
        } else {
            curve(this.x - 25, this.y - 16,
                this.x - 15, this.y - 26,
                this.x - 3, this.y - 26,
                this.x, this.y - 16
            );
            curve(this.x + 25, this.y - 16,
                this.x + 15, this.y - 26,
                this.x + 3, this.y - 26,
                this.x, this.y - 16
            );
            fill(60);
            ellipse(this.x, this.y + 15, 15, 18);
        }
        noStroke();
        fill(80, 80, 255);
        //Sun eyes follow character on screen
        ellipse(
            this.x + 7 + (5 * sin(player.screenX / 900)),
            this.y - 10 + (5 * cos(player.screenX / 900)),
            4, 4);
        ellipse(
            this.x - 7 + (5 * sin(player.screenX / 900)),
            this.y - 10 + (5 * cos(player.screenX / 900)),
            4, 4);
    }
}

class Cloud {

    constructor(_x, _y, _size) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
    }

    show(_wind) {
        this.wind = _wind;
        this.x += this.wind;
        noStroke();
        fill(255);
        beginShape();
        vertex(this.x + 104 * this.size, this.y);
        bezierVertex(
            this.x + 103.57 * this.size, this.y + -2.33 * this.size,
            this.x + 101.53 * this.size, this.y + -4.09 * this.size,
            this.x + 99.08 * this.size, this.y + -4.09 * this.size
        );
        bezierVertex(
            this.x + 98.91 * this.size, this.y + -4.09 * this.size,
            this.x + 98.75 * this.size, this.y + -4.08 * this.size,
            this.x + 98.59 * this.size, this.y + -4.07 * this.size);
        bezierVertex(
            this.x + 97.61 * this.size, this.y + -7.39 * this.size,
            this.x + 95.23 * this.size, this.y + -10.1 * this.size,
            this.x + 92.14 * this.size, this.y + -11.53 * this.size
        );
        bezierVertex(
            this.x + 91.01 * this.size, this.y + -19.31 * this.size,
            this.x + 84.32 * this.size, this.y + -25.28 * this.size,
            this.x + 76.23 * this.size, this.y + -25.28 * this.size
        );
        bezierVertex(
            this.x + 74.07 * this.size, this.y + -25.28 * this.size,
            this.x + 72.02 * this.size, this.y + -24.86 * this.size,
            this.x + 70.14 * this.size, this.y + -24.09 * this.size
        );
        bezierVertex(
            this.x + 68.92 * this.size, this.y + -29.39 * this.size,
            this.x + 64.19 * this.size, this.y + -33.34 * this.size,
            this.x + 58.52 * this.size, this.y + -33.34 * this.size
        );
        bezierVertex(
            this.x + 55.86 * this.size, this.y + -33.34 * this.size,
            this.x + 53.42 * this.size, this.y + -32.46 * this.size,
            this.x + 51.43 * this.size, this.y + -30.99 * this.size
        );
        bezierVertex(
            this.x + 48.55 * this.size, this.y + -34.76 * this.size,
            this.x + 44.01 * this.size, this.y + -37.18 * this.size,
            this.x + 38.91 * this.size, this.y + -37.18 * this.size
        );
        bezierVertex(
            this.x + 31.81 * this.size, this.y + -37.18 * this.size,
            this.x + 25.81 * this.size, this.y + -32.5 * this.size,
            this.x + 23.83 * this.size, this.y + -26.06 * this.size
        );
        bezierVertex(
            this.x + 22.4 * this.size, this.y + -26.67 * this.size,
            this.x + 20.82 * this.size, this.y + -27 * this.size,
            this.x + 19.17 * this.size, this.y + -27 * this.size
        );
        bezierVertex(
            this.x + 12.58 * this.size, this.y + -27 * this.size,
            this.x + 7.24 * this.size, this.y + -21.66 * this.size,
            this.x + 7.24 * this.size, this.y + -15.07 * this.size
        );
        bezierVertex(
            this.x + 7.24 * this.size, this.y + -12.32 * this.size,
            this.x + 8.17 * this.size, this.y + -9.8 * this.size,
            this.x + 9.73 * this.size, this.y + -7.79 * this.size
        );
        bezierVertex(
            this.x + 4.5 * this.size, this.y + -0.55 * this.size,
            this.x + 8.23 * this.size, this.y + -3.63 * this.size,
            this.x + 4 * this.size, this.y
        );
        endShape();
        fill(230);
        ellipse(this.x + 55 * this.size, this.y + -17 * this.size, 18 * this.size);
        fill(255);
        ellipse(this.x + 54 * this.size, this.y + -17 * this.size, 18 * this.size);
        fill(232, 246, 253);
        fill(230);
        ellipse(this.x + 63 * this.size, this.y + -12.5 * this.size, 18 * this.size);
        fill(255);
        ellipse(this.x + 62 * this.size, this.y + -12 * this.size, 18 * this.size);
        fill(232, 246, 253);
        beginShape();
        vertex(this.x + 100 * this.size, this.y + -7 * this.size);
        bezierVertex(
            this.x + 98.69 * this.size, this.y + -7.94 * this.size,
            this.x + 97.08 * this.size, this.y + -8.51 * this.size,
            this.x + 95.34 * this.size, this.y + -8.51 * this.size
        );
        bezierVertex(
            this.x + 93.29 * this.size, this.y + -8.51 * this.size,
            this.x + 91.43 * this.size, this.y + -7.73 * this.size,
            this.x + 90.02 * this.size, this.y + -6.45 * this.size
        );
        bezierVertex(
            this.x + 88.47 * this.size, this.y + -9.56 * this.size,
            this.x + 85.26 * this.size, this.y + -11.69 * this.size,
            this.x + 81.55 * this.size, this.y + -11.69 * this.size
        );
        bezierVertex(
            this.x + 80.36 * this.size, this.y + -11.69 * this.size,
            this.x + 79.22 * this.size, this.y + -11.46 * this.size,
            this.x + 78.16 * this.size, this.y + -11.06 * this.size
        );
        bezierVertex(
            this.x + 76.71 * this.size, this.y + -12.8 * this.size,
            this.x + 74.52 * this.size, this.y + -13.91 * this.size,
            this.x + 72.08 * this.size, this.y + -13.91 * this.size
        );
        bezierVertex(
            this.x + 68.86 * this.size, this.y + -13.91 * this.size,
            this.x + 66.1 * this.size, this.y + -11.99 * this.size,
            this.x + 64.85 * this.size, this.y + -9.24 * this.size
        );
        bezierVertex(
            this.x + 63.83 * this.size, this.y + -9.79 * this.size,
            this.x + 62.74 * this.size, this.y + -10.2 * this.size,
            this.x + 61.6 * this.size, this.y + -10.48 * this.size
        );
        bezierVertex(
            this.x + 61.43 * this.size, this.y + -14.71 * this.size,
            this.x + 57.95 * this.size, this.y + -18.09 * this.size,
            this.x + 53.67 * this.size, this.y + -18.09 * this.size
        );
        bezierVertex(
            this.x + 50.49 * this.size, this.y + -18.09 * this.size,
            this.x + 47.75 * this.size, this.y + -16.21 * this.size,
            this.x + 46.48 * this.size, this.y + -13.5 * this.size
        );
        bezierVertex(
            this.x + 44.74 * this.size, this.y + -15 * this.size,
            this.x + 42.49 * this.size, this.y + -15.9 * this.size,
            this.x + 40.02 * this.size, this.y + -15.9 * this.size
        );
        bezierVertex(
            this.x + 39.21 * this.size, this.y + -15.9 * this.size,
            this.x + 38.42 * this.size, this.y + -15.79 * this.size,
            this.x + 37.67 * this.size, this.y + -15.61 * this.size
        );
        bezierVertex(
            this.x + 35.21 * this.size, this.y + -19.23 * this.size,
            this.x + 31.06 * this.size, this.y + -21.61 * this.size,
            this.x + 26.35 * this.size, this.y + -21.61 * this.size
        );
        bezierVertex(
            this.x + 22.26 * this.size, this.y + -21.61 * this.size,
            this.x + 18.59 * this.size, this.y + -19.81 * this.size,
            this.x + 16.09 * this.size, this.y + -16.96 * this.size
        );
        bezierVertex(
            this.x + 14.63 * this.size, this.y + -18.8 * this.size,
            this.x + 12.38 * this.size, this.y + -19.99 * this.size,
            this.x + 9.85 * this.size, this.y + -19.99 * this.size
        );
        bezierVertex(
            this.x + 5.47 * this.size, this.y + -19.99 * this.size,
            this.x + 1.91 * this.size, this.y + -16.44 * this.size,
            this.x + 1.91 * this.size, this.y + -12.05 * this.size
        );
        bezierVertex(
            this.x + 1.91 * this.size, this.y + -10.37 * this.size,
            this.x + 2.44 * this.size, this.y + -8.82 * this.size,
            this.x + 3.33 * this.size, this.y + -7.53 * this.size
        );
        bezierVertex(
            this.x + 1.34 * this.size, this.y + -6.28 * this.size,
            this.x + -0.17 * this.size, this.y + -4.35 * this.size,
            this.x + -0.87 * this.size, this.y + -2.06 * this.size
        );
        bezierVertex(
            this.x + -4.51 * this.size, this.y + -1.34 * this.size,
            this.x + -7.25 * this.size, this.y + 1.86 * this.size,
            this.x + -7.25 * this.size, this.y + 5.72 * this.size
        );
        bezierVertex(
            this.x + -7.25 * this.size, this.y + 10.1 * this.size,
            this.x + -3.7 * this.size, this.y + 13.65 * this.size,
            this.x + 0.68 * this.size, this.y + 13.65 * this.size
        );
        bezierVertex(
            this.x + 1.13 * this.size, this.y + 13.65 * this.size,
            this.x + 1.58 * this.size, this.y + 13.61 * this.size,
            this.x + 2.01 * this.size, this.y + 13.53 * this.size
        );
        bezierVertex(
            this.x + 2.58 * this.size, this.y + 17.36 * this.size,
            this.x + 5.87 * this.size, this.y + 20.3 * this.size,
            this.x + 9.85 * this.size, this.y + 20.3 * this.size
        );
        bezierVertex(
            this.x + 13.21 * this.size, this.y + 20.3 * this.size,
            this.x + 16.08 * this.size, this.y + 18.22 * this.size,
            this.x + 17.24 * this.size, this.y + 15.27 * this.size
        );
        bezierVertex(
            this.x + 17.42 * this.size, this.y + 15.28 * this.size,
            this.x + 17.61 * this.size, this.y + 15.3 * this.size,
            this.x + 17.79 * this.size, this.y + 15.3 * this.size
        );
        bezierVertex(
            this.x + 19.36 * this.size, this.y + 15.3 * this.size,
            this.x + 20.82 * this.size, this.y + 14.84 * this.size,
            this.x + 22.05 * this.size, this.y + 14.05 * this.size
        );
        bezierVertex(
            this.x + 23.96 * this.size, this.y + 17.76 * this.size,
            this.x + 27.83 * this.size, this.y + 20.3 * this.size,
            this.x + 32.29 * this.size, this.y + 20.3 * this.size
        );
        bezierVertex(
            this.x + 38.64 * this.size, this.y + 20.3 * this.size,
            this.x + 43.8 * this.size, this.y + 15.15 * this.size,
            this.x + 43.8 * this.size, this.y + 8.79 * this.size
        );
        bezierVertex(
            this.x + 43.8 * this.size, this.y + 6.93 * this.size,
            this.x + 43.35 * this.size, this.y + 5.18 * this.size,
            this.x + 42.56 * this.size, this.y + 3.62 * this.size
        );
        bezierVertex(
            this.x + 43.33 * this.size, this.y + 3.42 * this.size,
            this.x + 44.06 * this.size, this.y + 3.14 * this.size,
            this.x + 44.74 * this.size, this.y + 2.77 * this.size
        );
        bezierVertex(
            this.x + 44.74 * this.size, this.y + 2.78 * this.size,
            this.x + 44.74 * this.size, this.y + 2.79 * this.size,
            this.x + 44.74 * this.size, this.y + 2.8 * this.size
        );
        bezierVertex(
            this.x + 72.06 * this.size, this.y + 1.96 * this.size,
            this.x + 72.07 * this.size, this.y + 1.96 * this.size,
            this.x + 72.07 * this.size, this.y + 1.96 * this.size
        );
        bezierVertex(
            this.x + 72.4 * this.size, this.y + 1.96 * this.size,
            this.x + 72.72 * this.size, this.y + 1.94 * this.size,
            this.x + 73.03 * this.size, this.y + 1.9 * this.size
        );
        bezierVertex(
            this.x + 74.56 * this.size, this.y + 5.06 * this.size,
            this.x + 77.8 * this.size, this.y + 7.25 * this.size,
            this.x + 81.55 * this.size, this.y + 7.25 * this.size
        );
        bezierVertex(
            this.x + 84.45 * this.size, this.y + 7.25 * this.size,
            this.x + 87.05 * this.size, this.y + 5.95 * this.size,
            this.x + 88.79 * this.size, this.y + 3.89 * this.size
        );
        bezierVertex(
            this.x + 90.03 * this.size, this.y + 5.72 * this.size,
            this.x + 92.02 * this.size, this.y + 6.99 * this.size,
            this.x + 94.32 * this.size, this.y + 7.29 * this.size
        );
        bezierVertex(
            this.x + 95.63 * this.size, this.y + 8.23 * this.size,
            this.x + 97.23 * this.size, this.y + 8.8 * this.size,
            this.x + 98.97 * this.size, this.y + 8.8 * this.size
        );
        bezierVertex(
            this.x + 103.36 * this.size, this.y + 8.8 * this.size,
            this.x + 106.91 * this.size, this.y + 5.25 * this.size,
            this.x + 106.91 * this.size, this.y + 0.86 * this.size
        );
        endShape(CLOSE);
        ellipse(this.x + 57 * this.size, this.y + 1 * this.size, 25 * this.size);
        ellipse(this.x + 45 * this.size, this.y + 3 * this.size, 10 * this.size);
        ellipse(this.x + 104 * this.size, this.y + -2 * this.size, 12 * this.size);
        fill(214, 231, 241);
        ellipse(this.x + 33 * this.size, this.y + -6 * this.size, 18 * this.size);
        ellipse(this.x + 60 * this.size, this.y + -3 * this.size, 15 * this.size);
        fill(232, 246, 253);
        ellipse(this.x + 33 * this.size, this.y + -7 * this.size, 18 * this.size);
        ellipse(this.x + 60 * this.size, this.y + -4 * this.size, 15 * this.size);
        fill(214, 231, 241);
        ellipse(this.x + 20 * this.size, this.y + -8 * this.size, 17 * this.size);
        fill(232, 246, 253);
        ellipse(this.x + 20 * this.size, this.y + -9 * this.size, 17 * this.size);
    }
}

class Mountain extends Obj {

    constructor(_x, _y, _scale, _type) {
        super(_x, _y);
        this.scale = _scale;
        this.type = _type;
    }

    show() {
        noStroke();
        fill(145);
        super.complexVertShape(mountainDat[this.type].bg,this.scale,this.x,this.y);
        fill(0,0,0,100);
        for(let s of mountainDat[this.type].shad){
            super.complexVertShape(s,this.scale,this.x,this.y);
        }
    }
}

class Grass{

    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

class Dirt{

    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
    }
}

// Works derived (converted and adjusted from SVG to a Javascript acceptable format) from "Tent Flat Icon Vector.svg" from Wikimedia Commons by Videoplasty.com, CC-BY-SA 4.0
class Tent extends Obj {

    constructor(_x, _y) {
        super(_x, _y);
    }

    show() {
        if(super.visible(this.x)) {
            fill(100, 137, 18);
            triangle(this.x, this.y - 102, this.x - 65, this.y, this.x, this.y);
            fill(82, 107, 13);
            triangle(this.x, this.y - 102, this.x + 63, this.y, this.x, this.y);
            fill(143, 168, 51);
            quad(this.x, this.y, this.x, this.y - 17, this.x - 54, this.y - 17, this.x - 65, this.y);
            fill(74, 91, 11);
            quad(this.x + 63, this.y, this.x + 53, this.y - 17, this.x + 17, this.y - 17, this.x + 25, this.y);
            fill(40, 48, 5);
            triangle(this.x, this.y - 56, this.x + 25, this.y, this.x - 27, this.y);
            fill(74, 91, 11);
            triangle(this.x, this.y - 56, this.x - 43, this.y - 15, this.x - 27, this.y);
            strokeWeight(4);
            stroke(80, 50, 0);
            line(this.x - 76, this.y - 2, this.x - 74, this.y + 2);
            line(this.x + 75, this.y - 2, this.x + 73, this.y + 2);
            strokeWeight(1);
            stroke(200);
            line(this.x, this.y - 102, this.x - 74, this.y);
            line(this.x, this.y - 102, this.x + 73, this.y);
            noStroke();
            fill(0, 0, 0, 100);
            triangle(this.x - 65, this.y, this.x + 63, this.y, this.x + 50, this.y + 10);
        }
    }
}

class Tree extends Obj {

    constructor(_x, _y, _scale, _colour, _type, _bg) {
        super(_x, _y);
        this.scale = _scale;
        this.colour = _colour;
        this.type = _type;
        this.bg = _bg;
    }

    show() {
        if(super.visible(this.x)) {
            noStroke();
            switch (this.colour) {
                case 1:
                    fill(73,135,49);
                    break;
                case 2:
                    fill(45,95,46);
                    break;
                case 3:
                    fill(102,166,56);
                    break;
            }
            super.complexVertShape(treeDat[this.type].leaf,this.scale,this.x,this.y);
            fill(176,191,198);
            super.complexVertShape(treeDat[this.type].trunk,this.scale,this.x,this.y);
            fill(66,80,106);
            for(let mark of treeDat[this.type].marking){
                super.complexVertShape(mark,this.scale,this.x,this.y);
            }
            fill(0,0,0,100);
            super.complexVertShape(treeDat[this.type].shad,this.scale,this.x,this.y);
        }
    }
}

class Bush extends Obj {

    constructor(_x, _y, _scale, _colour, _type, _fruiting, _bg) {
        super(_x, _y);
        this.scale = _scale;
        this.colour = _colour;
        this.fruit = _fruiting;
        this.bg = _bg;
        this.type = _type;
    }

    show() {
        if(super.visible(this.x)) {
            noStroke();
            switch (this.colour) {
                case 1:
                    fill(73,185,49);
                    break;
                case 2:
                    fill(45,145,46);
                    break;
                case 3:
                    fill(102,196,56);
                    break;
            }
            super.complexVertShape(bushDat[this.type].leaf,this.scale,this.x,this.y);
            fill(132,0,20);
            if(this.fruit) {
                let ex = 0;
                let ey = 0;
                for (let i = 0; i < bushDat[this.type].berry.length; i++) {
                    if ((i === 0) || (i % 2 === 0)) {
                        ex = bushDat[this.type].berry[i];
                    } else {
                        ey = bushDat[this.type].berry[i];
                        ellipse(this.x + ex, this.y + ey, 5, 5);
                    }
                }
            }
            fill(0,0,0,100);
            super.complexVertShape(bushDat[this.type].shad,this.scale,this.x,this.y);
        }
    }
}

class Rock extends Obj {

    constructor(_x, _y, _scale, _type) {
        super(_x, _y);
        this.scale = _scale;
        this.type = _type;
    }

    show() {
        if(super.visible(this.x)) {
            noStroke();
            fill(186,180,164);
            super.complexVertShape(rockDat[this.type].bg,this.scale,this.x,this.y);
            fill(255,255,255,100);
            for(let l of rockDat[this.type].light){
                super.complexVertShape(l,this.scale,this.x,this.y);
            }
            fill(0,0,0,100);
            for(let s of rockDat[this.type].shad){
                super.complexVertShape(s,this.scale,this.x,this.y);
            }
        }
    }
}

// Function to draw a sky gradient
function backgroundGradient(){
    noFill();
    for (let i = 0; i <= world.grnd; i++)
    {
        let inter = map(i, 0, world.grnd, 0, 1);
        let c = lerpColor(color(60, 204, 188),color(233, 255, 179),inter);
        stroke(c);
        line(0,i,0+width,i);
    }
}

//Draw grass based on player position (only load what is needed)
function drawGrass() {

    if (player.x > grass[grass.length - 1].x - 300) {
        grass.push(
            {x: grass[grass.length - 1].x + random(10, 25), y: random(15, 35)}
        );
    }
    if (player.x > dirt[dirt.length - 1].x - 300) {
        dirt.push(
            {x: dirt[dirt.length - 1].x + random(10, 25), y: random(height * 0.76, height),
                w: random(10, 30), h: random(15, 25)}
        );
    }
    noStroke();
    fill(73, 55, 41);
    rect(-1000, world.grnd, player.maxX + 1500, height / 4);
    fill(118, 91, 73);
    for (let speck of dirt) {
        ellipse(speck.x, speck.y, speck.w, speck.h);
    }
    fill(0, 0, 0, 100);
    beginShape();
    curveVertex(grass[0].x, world.grnd);
    curveVertex(grass[0].x, world.grnd);
    for (let blade of grass) {
        curveVertex(blade.x + 3, world.grnd + blade.y + 3);
    }
    curveVertex(player.maxX + 500, world.grnd);
    curveVertex(player.maxX + 500, world.grnd);
    endShape();
    fill(0, 100, 0);
    beginShape();
    curveVertex(grass[0].x, world.grnd);
    curveVertex(grass[0].x, world.grnd);
    for (let blade of grass) {
        curveVertex(blade.x, world.grnd + blade.y);
    }
    curveVertex(player.maxX + 500, world.grnd);
    curveVertex(player.maxX + 500, world.grnd);
    endShape();
}

// Function to draw Scoreboard and Character selector top of screen
function drawScoreboard() {
    strokeWeight(1);
    stroke(255);
    fill(128);
    ellipse(width-80,30,15,15);
    ellipse(width-65,30,15,15);
    noStroke();
    fill(255);
    rect(width-80,22,15,16);
    fill(128);
    rect(width-80,23,15,14);
    fill(64);
    if(player.pName === "Penny"){
        ellipse(width-80,30,13,13)
    } else if(player.pName === "Tob"){
        ellipse(width-65,30,13,13)
    }
    //Draw Penny Head
    fill(40);
    ellipse(width-110,30,40,35);
    fill(255);
    ellipse(width-104,29,18,20);
    ellipse(width-116,29,18,20);
    ellipse(width-110,34,24,15);
    fill(0);
    ellipse(width-106,29,4,5);
    ellipse(width-114,29,4,5);
    fill(250,200,0);
    beginShape();
    vertex(width-102,35);
    vertex(width-105,33);
    vertex(width-115,33);
    vertex(width-118,35);
    vertex(width-113,40);
    vertex(width-107,40);
    endShape();
    //Draw Tob Head
    fill(185,122,87);
    ellipse(width-35-16,85-68,11,11);
    ellipse(width-35+16,85-68,11,11);
    ellipse(width-35,85-55,40,35);
    fill(239,228,176);
    ellipse(width-35-16,85-68,6,6);
    ellipse(width-35+16,85-68,6,6);
    ellipse(width-35-6,85-56,18,20);
    ellipse(width-35+6,85-56,18,20);
    ellipse(width-35,85-51,24,15);
    fill(0);
    ellipse(width-35-4,85-56,4,5);
    ellipse(width-35+4,85-56,4,5);
    fill(185,122,87);
    ellipse(width-35,85-49,16,10);
    fill(0);
    ellipse(width-35,85-51,8,6);
    fill(0,0,0,64);
    let stringScore = "00000" + game.score;
    strokeWeight(2);
    stroke(25);
    fill(255);
    textSize(40);
    stext("SCORE: "+stringScore.substr(stringScore.length-5),width/2-103,37,3);
    stext("LIVES: ",17,37,3);
    textSize(20);
    stext("Penny",width-132,60,2);
    stext("Tob",width-48,60,2);
    hearts(player.lives);
}

//Scoreboard hearts
function hearts(c) {
    const inc = 35;
    noStroke();
    fill(200,0,40);
    for (let i = 1; i <= c; i++){
        fill(0,0,0,100);
        ellipse(79+i*inc,18,20,20);
        ellipse(93+i*inc,18,20,20);
        triangle(70+i*inc,23,102+i*inc,23,86+i*inc,43);
        fill(200,0,40);
        ellipse(76+i*inc,15,20,20);
        ellipse(90+i*inc,15,20,20);
        triangle(67+i*inc,20,99+i*inc,20,83+i*inc,40);
        fill(255,255,255,200);
        ellipse(76+i*inc,15,17,17);
        fill(200,0,40);
        ellipse(79+i*inc,16,17,17);
        ellipse(79+i*inc,18,17,17);
    }
}

//Shadow text
function stext(txt,x,y,o,t = 100){
    // txt = text, x/y co-ords, o = offset shadow, t = transparency
    push();
    noStroke();
    fill(0,0,0,t);
    text(txt,x+o,y+o);
    pop();
    text(txt,x,y);
}

function startScreen(){
    fill(220, 220, 60);
    rect(100,100, width - 200, height - 200);
    fill(0);
    text(
        "Help Penny and Tob rescue the endangered birds from the evil clutches of the\n" +
        "invading alien eyes, make it to the safety of the flag (to the right of the map).\n\n" +
        "Control the character with arrow keys and \'space\' to jump, press \'up\' to swap characters.\n\n\n" +
        "Press enter to start", width / 5, height / 3
    );
}

// ----------------------------------
// Main draw game function
// ----------------------------------
function drawGame() {
    // Draw sky.
    backgroundGradient();
    // Draw a sun.
    sun.show(world.grnd, world.sunRotation);
    // Draw clouds.
    push();
    translate(scrollPos / 30, 0);  //Parallax scrolling - each section moves at a different speed
    for (let c of clouds) {
        c.show(world.wind);
    }
    pop();
    // Draw mountains.
    push();
    translate(scrollPos / 20, 0);
    for (let m of mountains) {
        if (m.type === "tob") {
            m.show();
        }
    }
    pop();
    push();
    translate(scrollPos / 10, 0);
    for (let m of mountains) {
        if (m.type === "norm") {
            m.show();
        }
    }
    pop();
    push();
    translate(scrollPos, 0);
    //Draw grass.
    drawGrass();
    //Draw flagpole
    flagpole.show(world.grnd);
    //Draw canyons and check collision.
    for (let c of canyons) {
        if (player.collision(c)) {
            player.isPlummeting = true;
        }
        c.show(player.w, height);
    }
    //Draw platforms.
    for (let p of platforms) {
        p.show(world.grnd, height);
    }
    //Draw background rocks.
    for (let r of rocks) {
        r.show();
    }
    //Draw background trees.
    for (let t of trees) {
        if (t.bg) {
            t.show();
        }
    }
    //Draw background bushes.
    for (let b of bushes) {
        if (b.bg) {
            b.show();
        }
    }
    //Draw Tent
    tents[0].show();
    //Draw collectables and check if collected.
    for (let c of collectables) {
        if (!c.isFound) {
            if (player.collision(c)) {
                c.isFound = true;
                collect.play(0,1,0.9);
                game.score += c.val;
                cText.push({x: c.x, y: c.y, trans: 255, val: c.val})
            }
            c.show();
        }
    }
    //collectables popup text
    for (let c of cText) {
        if (c.trans >= 0) {
            fill(255, 255, 255, c.trans);
            stext("+" + c.val, c.x, c.y, 3, c.trans / 2.55);
        }
        c.y -= 1;
        c.trans -= 2;
    }
    //Draw enemies and make sure they don't fall down canyons.
    for (let e of enemies) {
        for (let c of canyons) {
            if (e.collision(c)) {
                if (e.facing === "left") {
                    e.facing = "right";
                } else {
                    e.facing = "left";
                }
            }
        }
        e.VelX += 0.01;
        e.update();
        e.show();
        if(player.collision(e)){
            if(!player.isPlummeting){
                death.play(0,1,0.25);
            }
            player.isPlummeting = true;
        }
    }
    pop();
    //Draw player and update position
    player.show();
    player.update();
    //Draw platforms and check if player has landed on one
    for (let p of platforms) {
        player.platformCheck(p);
    }
    push();
    translate(scrollPos, 0);
    //Draw in foreground objects (trees and bushes in front of player)
    //Draw foreground trees.
    for (let t of trees) {
        if (!t.bg) {
            t.show();
        }
    }
    //Draw foreground bushes.
    for (let b of bushes) {
        if (!b.bg) {
            b.show();
        }
    }
    pop();
}

// ----------------------------------
// Initialise Game and level objects
// ----------------------------------
function initialiseGame(){
    game.score = 0;
    inGame();
    //Grass array generation
    grass = [{x:-350,y: 0}];
    for(let i = 1; i < 200; i++){
        grass[i] = new Grass(grass[i-1].x + random(10, 25), random(15, 35));
    }
    //Dirt array generation
    dirt = [{x:-350, y:height * 0.80, w:10, h:15}];
    for(let i = 1; i < 200; i++){
        dirt[i] = new Dirt(
            dirt[i - 1].x + random(40, 55),
            random(height * 0.80, height),
            random(15, 50),
            random(15, 50),
        );
    }

    // Initialise objects
    sun = new Sun(100, 80);
    flagpole = new Flagpole(6500, world.grnd - 250, 6, 250, false);
    tents = [
        new Tent(175, world.grnd + 1)
    ];
    platforms = [
        new Platform(719, world.grnd - 150, 100, 16, "log"),
        new Platform(1278, world.grnd - 175, 100, 18, "dirt"),
        new Platform(1258, world.grnd - 75, 150, 18, "dirt"),
        new Platform(1065, world.grnd - 200, 100, 18, "dirt"),
        new Platform(570, world.grnd - 150, 150, 18, "dirt"),
        new Platform(500, world.grnd - 75, 150, 18, "dirt"),
        new Platform(1800, world.grnd - 260, 160, 18, "log"),
        new Platform(2075, world.grnd - 175, 130, 18, "log"),
        new Platform(2300, world.grnd - 120, 150, 18, "dirt"),
        new Platform(2495, world.grnd - 45, 60, 18, "invis"),
        new Platform(3415, world.grnd - 235, 60, 18, "invis"),
        new Platform(3500, world.grnd - 100, 100, 18, "dirt"),
        new Platform(3600, world.grnd - 200, 100, 18, "dirt"),
        new Platform(3700, world.grnd - 250, 100, 18, "dirt"),
        new Platform(3799, world.grnd - 250, 401, 18, "log"),
        new Platform(3599, world.grnd - 100, 301, 18, "log"),
        new Platform(4050, world.grnd - 160, 50, 18, "log"),
        new Platform(4350, world.grnd - 250, 50, 18, "log"),
        new Platform(4550, world.grnd - 200, 45, 18, "log"),
        new Platform(4830, world.grnd - 60, 60, 18, "invis"),
        new Platform(4900, world.grnd - 130, 200, 18, "dirt"),
        new Platform(5100, world.grnd - 230, 300, 18, "dirt")
    ];
    collectables = [
        new Collectable(250, 275,  30, 25, 1, false, 'yellow', 1),
        new Collectable(430, world.grnd - 25,  30, 25, 1, false, 'yellow', 1),
        new Collectable(600, 112, 30, 25, 1, false, 'purple', 5),
        new Collectable(792, 256, 30, 25, 1, false, 'red', 2),
        new Collectable(820, world.grnd - 25, 30, 25, 1, false, 'yellow', 1),
        new Collectable(1065, 206, 30, 25, 1, false, 'red', 2),
        new Collectable(1230, 70, 30, 25, 1, false, 'red', 2),
        new Collectable(1300, world.grnd - 25, 30, 25, 1, false, 'yellow', 1),
        new Collectable(1500, 280, 30, 25, 1, false, 'yellow', 1),
        new Collectable(1665, 140,  30, 25, 1, false, 'purple', 5),
        new Collectable(1890, 150, 30, 25, 1, false, 'red', 2),
        new Collectable(2000, world.grnd - 25,  30, 25, 1, false, 'yellow', 1),
        new Collectable(2090, 237, 30, 25, 1, false, 'yellow', 1),
        new Collectable(2730, 265,  30, 25, 1, false, 'yellow', 1),
        new Collectable(2950, 265, 30, 25, 1, false, 'red', 2),
        new Collectable(3250, 285,  30, 25, 1, false, 'yellow', 1),
        new Collectable(3250, world.grnd - 250, 30, 25, 1, false, 'purple', 5),
        new Collectable(3750, 15, 30, 25, 1, false, 'red', 2),
        new Collectable(3850, world.grnd - 25,  30, 25, 1, false, 'yellow', 1),
        new Collectable(4060, 245, 30, 25, 1, false, 'red', 2),
        new Collectable(4180, world.grnd - 90, 30, 25, 1, false, 'yellow', 1),
        new Collectable(4360, 155, 30, 25, 1, false, 'red', 2),
        new Collectable(4560, 210,  30, 25, 1, false, 'purple', 5)
    ];
    mountains = [
        new Mountain(540, 146, 1.4, "norm"),
        new Mountain(800, 200, 1.5, "norm"),
        new Mountain(-750, 200, 1.5, "norm"),
        new Mountain(1500, 230, 1.3, "norm"),
        new Mountain(0, 0, 1, "tob")
    ];
    canyons = [
        new Canyon(340, world.grnd, 70, height / 4),
        new Canyon(960, world.grnd, 70, height / 4),
        new Canyon(1190, world.grnd, 40, height / 4),
        new Canyon(1440, world.grnd, 70, height / 4),
        new Canyon(1840, world.grnd, 80, height / 4),
        new Canyon(2120, world.grnd, 40, height / 4),
        new Canyon(2640, world.grnd, 70, height / 4),
        new Canyon(2920, world.grnd, 40, height / 4),
        new Canyon(3120, world.grnd, 50, height / 4),
        new Canyon(3920, world.grnd, 120, height / 4),
        new Canyon(4420, world.grnd, 100, height / 4),
        new Canyon(5440, world.grnd, 150, height / 4)
    ];
    trees = [
        new Tree(-50, 147, 0.7, 3, "birch1", true),
        new Tree(130, 163, 0.75, 1,"birch3", true),
        new Tree(400, 90, 0.7, 1, "birch2", true),
        new Tree(1220, 23, 0.65, 1, "birch3", true),
        new Tree(1460, 181, 0.7, 2, "birch3", true),
        new Tree(1550, 134, 0.75, 3, "birch1", false),
        new Tree(2700, 127, 0.8, 1, "birch2", true),
        new Tree(2940, 175, 0.65, 1, "birch1", false),
        new Tree(3100, 181, 0.7, 2, "birch3", true),
        new Tree(3620, -69, 0.7, 1, "birch3", true),
        new Tree(4210, 196,0.6, 1, "birch1", false),
        new Tree(4590, 116, 0.8, 1,"birch1", false)
    ];
    bushes = [
        new Bush(-50, world.grnd, 1, 3, "bush1", true, true),
        new Bush(590, world.grnd, 1, 2, "bush3",true, true),
        new Bush(520, world.grnd, 0.7, 1, "bush2", false, true),
        new Bush(1620, world.grnd, 0.7, 1, "bush2", false, true),
        new Bush(2260, world.grnd, 1, 2, "bush3", true, true),
        new Bush(3320, world.grnd+ 10, 1, 3, "bush1", true, false),
        new Bush(3600, world.grnd, 0.7, 1, "bush2", false, true),
        new Bush(4080, world.grnd + 10, 1, 3, "bush3", false, false),
        new Bush(4580, world.grnd, 1, 2, "bush1", false, true),
        new Bush(4920, world.grnd, 1, 1, "bush3", true, true),
        new Bush(5300, world.grnd, 0.8, 2, "bush2", false, true),
        new Bush(5160, world.grnd + 10,1, 1, "bush1", false, false),
    ];
    clouds = [
        new Cloud(-630, 80, 3),
        new Cloud(-130, 130, 1.5),
        new Cloud(130, 100, 2),
        new Cloud(280, 70, 1),
        new Cloud(601, 120, 2),
        new Cloud(700, 110, 1.5),
        new Cloud(1000, 120, 2)
    ];
    rocks = [
        new Rock(2490, world.grnd, 0.22,"rock2"),
        new Rock(3400, world.grnd, 0.25,"rock1"),
        new Rock(4820, world.grnd, 0.3,"rock3")
    ];
    enemies = [
        new Enemies(800, world.grnd - 35, 0, 0, 30, 30, false, "eye", "right"),
        new Enemies(1600, world.grnd - 35, 0, 0, 30, 30, false, "eye", "left"),
        new Enemies(2800, world.grnd - 35, 0, 0, 30, 30, false, "eye", "right"),
        new Enemies(3600, world.grnd - 35, 0, 0, 30, 30, false, "eye", "left"),
        new Enemies(4210, world.grnd - 35, 0, 0, 30, 30, false, "eye", "right"),
        new Enemies(4210, world.grnd - 35, 0, 0, 30, 30, false, "eye", "left"),
        new Enemies(4590, world.grnd - 35, 0, 0, 30, 30, false, "eye", "left")
    ]
}

//Player reset (died, but maintain score/life count etc, still "in current game")
function inGame(){
    scrollPos = 0;
    player.screenX = 150;
    player.y = world.grnd;
    player.maxX = width;
    player.x = player.screenX-scrollPos;
    player.isLeft = false;
    player.isRight = false;
    player.isFalling = false;
    player.isPlummeting = false;
}
