class Player {
    constructor(
        _x, _y, _velX, _velY, _pName = "Tob", _screenX = 0,
        _maxX = 0, _lives = 3, _w = 30, _h = 55, _onGround = true,
        _isLeft = false, _isRight = false, _isFalling = false,
        _isPlummeting = false, _movement = true
    ){
        this.x = _x;
        this.y = _y;
        this.velX = _velX;
        this.velY = _velY;
        this.pName = _pName;
        this.screenX = _screenX;
        this.maxX = _maxX;
        this.lives = _lives;
        this.w = _w;
        this.h = _h;
        this.onGround = _onGround;
        this.isLeft = _isLeft;
        this.isRight = _isRight;
        this.isFalling = _isFalling;
        this.isPlummeting = _isPlummeting;
        this.movement = _movement;
    }

    //Check player collision with enemies and canyons
    collision(other) {
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;
        if(this.constructor.name === "Player"){
            left = this.x - this.w/2;
            right = this.x + this.w/2;
            top = this.y - this.h;
            bottom = this.y + 2;
        } else {
            left = this.x;
            right = this.x + this.w;
            top = this.y;
            bottom = this.y + this.h + 5;
        }
        let oleft = other.x;
        let oright = other.x + other.w;
        let otop = other.y;
        let obottom = other.y + other.h;
        return (left <= oright &&
                right >= oleft &&
                top <= obottom &&
                bottom >= otop);
    }

    //Player check for platform intersect
    platformCheck(platform) {
        let px = platform.x;
        let py = platform.y;
        let pw = platform.w;
        let ph = platform.h;

        if (
            this.x > px &&
            this.x < px + pw &&
            this.y > py &&
            this.y < py + ph
        ){
            this.y = py;
            this.onGround = true;
            this.isFalling = false;
        }
    }

    //Player swap between Penny and Tob
    swap(){
        if(this.pName === "Penny"){
            this.pName = "Tob";
        } else if(this.pName === "Tob"){
            this.pName = "Penny";
        }
    }

    //Player jump
    jump(){
        this.velY = -9;
        this.isFalling = true;
        jump.play(0,1,0.5);
    }

    //Player position update
    update() {
        this.y += this.velY;
        if(this.onGround) {
            this.velX *= 0.8;
        } else {
            this.velY += world.gravity;
        }

        this.onGround = false;
        if(this.isPlummeting) {
            this.onGround = false;
            if(this.y > height + 500) {
                this.lives -= 1;
                inGame();
            }
        } else if (this.y >= world.grnd - this.velY - 5) {
            this.y = world.grnd;
            this.onGround = true;
            this.isFalling = false;
        }

        if(this.isLeft) {
            if(!this.isPlummeting){
                this.velX = -5;
            } else {
                this.velX = 0;
            }
            if(this.screenX > width*0.2) {
                this.screenX += this.velX;
            } else {
                scrollPos -= this.velX;
            }
        }

        if(this.isRight) {
            this.velX = 5;
            if(this.screenX < width*0.8) {
                this.screenX += this.velX;
            } else {
                scrollPos -= this.velX; // negative for moving against the background
            }
        }

        //Player life check and end of game checks
        if (this.y === height+108) {
            this.lives -= 1;
            if(this.lives >= 1) {
                inGame();
            }
        }

        if(this.lives < 1) {
            this.movement = false;
            textSize(160);
            stroke(25);
            strokeWeight(10);
            fill(200,10,200);
            stext("Game Over!",width/5,height/2,10);
            textSize(50);
            strokeWeight(5);
            fill(125);
            stext("Press the space bar to try again",width/4-30,height/2+50,5);
            return;
        }

        if(!flagpole.isReached) {
            if(this.collision(flagpole)) {
                flagpole.isReached  = true;
                this.movement = false;
            }
        } else {
            textSize(160);
            strokeWeight(10);
            stroke(25);
            fill(200,10,200);
            stext("Level",width/5+10,height/2-90,10);
            stext("Complete!",width/5+50,height/2+10,10);
            textSize(50);
            strokeWeight(5);
            fill(125);
            stext("Press the space bar to try again",width/4-30,height/2+50,5);
            return;
        }

        // Update real position of Character for collision detection and random grass generation.
        this.x = this.screenX-scrollPos;
        this.maxX = max(this.maxX,this.x);
    }

    //Player draw on canvas
    show(){
        if(this.pName === "Penny") {
            if (this.isLeft && this.isFalling) {
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(255);
                ellipse(this.screenX-12,this.y-56,14,20);
                ellipse(this.screenX-5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX-20,this.y-50);
                vertex(this.screenX-9,this.y-49);
                vertex(this.screenX-10,this.y-44);
                vertex(this.screenX-8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX-17,this.y-56,2,5);
                fill(40);
                beginShape();
                curveVertex(this.screenX+13,this.y-30);
                curveVertex(this.screenX+13,this.y-30);
                curveVertex(this.screenX-19,this.y-20);
                curveVertex(this.screenX-19,this.y-27);
                curveVertex(this.screenX+13,this.y-50);
                curveVertex(this.screenX+13,this.y-50);
                endShape();
                ellipse(this.screenX+19,this.y-20,6,6);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-25,this.y-50);
                vertex(this.screenX-20,this.y-52);
                vertex(this.screenX-17,this.y-52);
                vertex(this.screenX-17,this.y-50);
                vertex(this.screenX-12,this.y-45);
                vertex(this.screenX-18,this.y-45);
                endShape();
                fill(250,200,0);
                beginShape();
                vertex(this.screenX+9,this.y-5);
                vertex(this.screenX+13,this.y+1);
                vertex(this.screenX+11,this.y+2);
                vertex(this.screenX+5,this.y-3);
                endShape();
                beginShape();
                vertex(this.screenX+3,this.y-3);
                vertex(this.screenX-12,this.y);
                vertex(this.screenX-15,this.y-13);
                vertex(this.screenX-13,this.y-13);
                vertex(this.screenX-8,this.y-4);
                vertex(this.screenX-5,this.y-3);
                vertex(this.screenX-2,this.y-2);
                endShape();
            } else if(this.isRight && this.isFalling) {
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(255);
                ellipse(this.screenX+12,this.y-56,14,20);
                ellipse(this.screenX+5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX+20,this.y-50);
                vertex(this.screenX+9,this.y-49);
                vertex(this.screenX+10,this.y-44);
                vertex(this.screenX+8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX+17,this.y-56,2,5);
                fill(40);
                beginShape();
                curveVertex(this.screenX-13,this.y-30);
                curveVertex(this.screenX-13,this.y-30);
                curveVertex(this.screenX+19,this.y-20);
                curveVertex(this.screenX+19,this.y-27);
                curveVertex(this.screenX-13,this.y-50);
                curveVertex(this.screenX-13,this.y-50);
                endShape();
                ellipse(this.screenX-19,this.y-20,6,6);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX+25,this.y-50);
                vertex(this.screenX+20,this.y-52);
                vertex(this.screenX+17,this.y-52);
                vertex(this.screenX+17,this.y-50);
                vertex(this.screenX+12,this.y-45);
                vertex(this.screenX+18,this.y-45);
                endShape();
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-9,this.y-5);
                vertex(this.screenX-13,this.y+1);
                vertex(this.screenX-11,this.y+2);
                vertex(this.screenX-5,this.y-3);
                endShape();
                beginShape();
                vertex(this.screenX-3,this.y-3);
                vertex(this.screenX+12,this.y);
                vertex(this.screenX+15,this.y-13);
                vertex(this.screenX+13,this.y-13);
                vertex(this.screenX+8,this.y-4);
                vertex(this.screenX+5,this.y-3);
                vertex(this.screenX+2,this.y-2);
                endShape();
            } else if(this.isLeft) {
                fill(250,200,0);
                beginShape();
                vertex(this.screenX+6,this.y-5);
                vertex(this.screenX+11,this.y);
                vertex(this.screenX+7,this.y+4);
                vertex(this.screenX-2,this.y+4);
                vertex(this.screenX-1,this.y+1);
                vertex(this.screenX+4,this.y);
                vertex(this.screenX-1,this.y-3);
                endShape();
                beginShape();
                vertex(this.screenX+1,this.y-4);
                vertex(this.screenX-2,this.y+4);
                vertex(this.screenX-5,this.y+4);
                vertex(this.screenX-16,this.y+1);
                vertex(this.screenX-15,this.y-1);
                vertex(this.screenX-5,this.y-1);
                vertex(this.screenX-5,this.y-7);
                endShape();
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(255);
                ellipse(this.screenX-12,this.y-56,14,20);
                ellipse(this.screenX-5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX-20,this.y-50);
                vertex(this.screenX-9,this.y-49);
                vertex(this.screenX-10,this.y-44);
                vertex(this.screenX-8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX-17,this.y-56,2,5);
                fill(40);
                ellipse(this.screenX+2,this.y-24,17,35);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-25,this.y-50);
                vertex(this.screenX-20,this.y-52);
                vertex(this.screenX-17,this.y-52);
                vertex(this.screenX-17,this.y-50);
                vertex(this.screenX-12,this.y-45);
                vertex(this.screenX-18,this.y-45);
                endShape();
            } else if(this.isRight) {
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-6,this.y-5);
                vertex(this.screenX-11,this.y);
                vertex(this.screenX-7,this.y+4);
                vertex(this.screenX+2,this.y+4);
                vertex(this.screenX+1,this.y+1);
                vertex(this.screenX-4,this.y);
                vertex(this.screenX+1,this.y-3);
                endShape();
                beginShape();
                vertex(this.screenX-1,this.y-4);
                vertex(this.screenX+2,this.y+4);
                vertex(this.screenX+5,this.y+4);
                vertex(this.screenX+16,this.y+1);
                vertex(this.screenX+15,this.y-1);
                vertex(this.screenX+5,this.y-1);
                vertex(this.screenX+5,this.y-7);
                endShape();
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(255);
                ellipse(this.screenX+12,this.y-56,14,20);
                ellipse(this.screenX+5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX+20,this.y-50);
                vertex(this.screenX+9,this.y-49);
                vertex(this.screenX+10,this.y-44);
                vertex(this.screenX+8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX+17,this.y-56,2,5);
                fill(40);
                ellipse(this.screenX-2,this.y-24,17,35);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX+25,this.y-50);
                vertex(this.screenX+20,this.y-52);
                vertex(this.screenX+17,this.y-52);
                vertex(this.screenX+17,this.y-50);
                vertex(this.screenX+12,this.y-45);
                vertex(this.screenX+18,this.y-45);
                endShape();
            } else if((this.isFalling || this.isPlummeting)) {
                fill(250,200,0);
                beginShape();
                vertex(this.screenX+7,this.y);
                vertex(this.screenX+17,this.y);
                vertex(this.screenX+5,this.y-15);
                vertex(this.screenX+3,this.y-15);
                endShape();
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX+15,this.y-23,12,35);
                fill(255);
                ellipse(this.screenX-6,this.y-56,18,20);
                ellipse(this.screenX+6,this.y-56,18,20);
                ellipse(this.screenX,this.y-51,24,15);
                ellipse(this.screenX,this.y-25,28,38);
                fill(0);
                ellipse(this.screenX-4,this.y-56,4,5);
                ellipse(this.screenX+4,this.y-56,4,5);
                //arm up
                fill(40);
                ellipse(this.screenX-15,this.y-43,12,35);
                fill(255);
                ellipse(this.screenX-15,this.y-41,8,28);
                ellipse(this.screenX-12,this.y-32,8,15);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-8,this.y-50);
                vertex(this.screenX-5,this.y-52);
                vertex(this.screenX+5,this.y-52);
                vertex(this.screenX+8,this.y-50);
                vertex(this.screenX+3,this.y-45);
                vertex(this.screenX-3,this.y-45);
                endShape();
                beginShape();
                vertex(this.screenX-15,this.y-17);
                vertex(this.screenX-5,this.y-17);
                vertex(this.screenX-8,this.y);
                vertex(this.screenX-12,this.y);
                endShape();
            } else {
                fill(250,200,0);
                rect(this.screenX-10,this.y-6,5,10);
                rect(this.screenX+5,this.y-6,5,10);
                rect(this.screenX-13,this.y-1,10,5);
                rect(this.screenX+3,this.y-1,10,5);
                fill(40);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX-15,this.y-23,12,35);
                ellipse(this.screenX+15,this.y-23,12,35);
                fill(255);
                ellipse(this.screenX-6,this.y-56,18,20);
                ellipse(this.screenX+6,this.y-56,18,20);
                ellipse(this.screenX,this.y-51,24,15);
                ellipse(this.screenX,this.y-25,28,38);
                fill(0);
                ellipse(this.screenX-4,this.y-56,4,5);
                ellipse(this.screenX+4,this.y-56,4,5);
                fill(250,200,0);
                beginShape();
                vertex(this.screenX-8,this.y-50);
                vertex(this.screenX-5,this.y-52);
                vertex(this.screenX+5,this.y-52);
                vertex(this.screenX+8,this.y-50);
                vertex(this.screenX+3,this.y-45);
                vertex(this.screenX-3,this.y-45);
                endShape();
            }
        } else if(this.pName === "Tob") {
            if (this.isLeft && this.isFalling) {
                fill(185,122,87);
                ellipse(this.screenX-2,this.y-72,8,8); //ear
                ellipse(this.screenX+10,this.y-8,10,15); //foot
                ellipse(this.screenX-8,this.y-5,15,10); //foot
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(239,228,176);
                ellipse(this.screenX-4,this.y-70,3,8);
                ellipse(this.screenX-12,this.y-56,14,20);
                ellipse(this.screenX-5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX-20,this.y-50);
                vertex(this.screenX-9,this.y-49);
                vertex(this.screenX-10,this.y-44);
                vertex(this.screenX-8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX-17,this.y-56,2,5);
                fill(185,122,87);
                ellipse(this.screenX-10,this.y-27,15,15);
                quad(
                    this.screenX+10,this.y-40,
                    this.screenX+10,this.y-25,
                    this.screenX-10,this.y-19,
                    this.screenX-10,this.y-35
                );
                ellipse(this.screenX+18,this.y-15,5,5); //tail
                ellipse(this.screenX-19,this.y-48,12,10); //nose
                ellipse(this.screenX-19,this.y-48,12,10); //ears
                ellipse(this.screenX-12,this.y-8,10,19); //foot2
                fill(0);
                ellipse(this.screenX-22,this.y-51,5,6);
            } else if(this.isRight && this.isFalling) {
                fill(185,122,87);
                ellipse(this.screenX+2,this.y-72,8,8); //ear
                ellipse(this.screenX-10,this.y-8,10,15); //foot
                ellipse(this.screenX+8,this.y-5,15,10); //foot
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                fill(239,228,176);
                ellipse(this.screenX+4,this.y-70,3,8);
                ellipse(this.screenX+12,this.y-56,14,20);
                ellipse(this.screenX+5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX+20,this.y-50);
                vertex(this.screenX+9,this.y-49);
                vertex(this.screenX+10,this.y-44);
                vertex(this.screenX+8,this.y-38);
                endShape();
                fill(0);
                ellipse(this.screenX+17,this.y-56,2,5);
                fill(185,122,87);
                ellipse(this.screenX+10,this.y-27,15,15);
                quad(
                    this.screenX-10,this.y-40,
                    this.screenX-10,this.y-25,
                    this.screenX+10,this.y-19,
                    this.screenX+10,this.y-35
                );
                ellipse(this.screenX-18,this.y-15,5,5); //tail
                ellipse(this.screenX+19,this.y-48,12,10); //nose
                ellipse(this.screenX+19,this.y-48,12,10); //ears
                ellipse(this.screenX+12,this.y-8,10,19); //foot2
                fill(0);
                ellipse(this.screenX+22,this.y-51,5,6);
            } else if(this.isLeft) {
                fill(185,122,87);
                ellipse(this.screenX-2,this.y-72,8,8); //ear
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX+18,this.y-15,5,5); //tail
                fill(239,228,176);
                ellipse(this.screenX-4,this.y-70,3,8);
                ellipse(this.screenX-12,this.y-56,14,20);
                ellipse(this.screenX-5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX-20,this.y-50);
                vertex(this.screenX-9,this.y-49);
                vertex(this.screenX-10,this.y-44);
                vertex(this.screenX-8,this.y-38);
                endShape();
                fill(185,122,87);
                ellipse(this.screenX-19,this.y-48,12,10); //nose
                ellipse(this.screenX+2,this.y-37,14,14); //arm
                rect(this.screenX-5,this.y-37,14,14); //arm
                ellipse(this.screenX+2,this.y-22,14,14); //arm
                ellipse(this.screenX-12,this.y-4,8,8); //leg
                ellipse(this.screenX+2,this.y-3,8,8); //leg
                rect(this.screenX-10,this.y-4,13,5); //leg
                fill(0);
                ellipse(this.screenX-17,this.y-56,2,5);
                ellipse(this.screenX-22,this.y-51,5,6);
            } else if(this.isRight) {
                fill(185,122,87);
                ellipse(this.screenX+2,this.y-72,8,8); //ear
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX-18,this.y-15,5,5); //tail
                fill(239,228,176);
                ellipse(this.screenX+4,this.y-70,3,8);
                ellipse(this.screenX+12,this.y-56,14,20);
                ellipse(this.screenX+5,this.y-25,28,38);
                beginShape();
                vertex(this.screenX+20,this.y-50);
                vertex(this.screenX+9,this.y-49);
                vertex(this.screenX+10,this.y-44);
                vertex(this.screenX+8,this.y-38);
                endShape();
                fill(185,122,87);
                ellipse(this.screenX+19,this.y-48,12,10); //nose
                ellipse(this.screenX-2,this.y-37,14,14); //arm
                rect(this.screenX-9,this.y-37,14,14); //arm
                ellipse(this.screenX-2,this.y-22,14,14); //arm
                ellipse(this.screenX+12,this.y-4,8,8); //leg
                ellipse(this.screenX-2,this.y-3,8,8); //leg
                rect(this.screenX,this.y-4,13,5); //leg
                fill(0);
                ellipse(this.screenX+17,this.y-56,2,5);
                ellipse(this.screenX+22,this.y-51,5,6);
            } else if((this.isFalling || this.isPlummeting)) {
                fill(185,122,87);
                ellipse(this.screenX+10,this.y-11,15,22); //leg
                ellipse(this.screenX-16,this.y-68,11,11);
                ellipse(this.screenX+16,this.y-68,11,11);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX+15,this.y-23,12,35);
                fill(239,228,176);
                ellipse(this.screenX-16,this.y-68,6,6);
                ellipse(this.screenX+16,this.y-68,6,6);
                ellipse(this.screenX-6,this.y-56,18,20);
                ellipse(this.screenX+6,this.y-56,18,20);
                ellipse(this.screenX,this.y-51,24,15);
                ellipse(this.screenX,this.y-25,28,38);
                fill(0);
                ellipse(this.screenX-4,this.y-56,4,5);
                ellipse(this.screenX+4,this.y-56,4,5);
                fill(185,122,87);
                ellipse(this.screenX,this.y-49,16,10);
                fill(0);
                ellipse(this.screenX,this.y-51,8,6);
                //arm up
                fill(185,122,87);
                ellipse(this.screenX-15,this.y-43,15,15);
                rect(this.screenX-23,this.y-53,15,10);
                ellipse(this.screenX-15,this.y-53,15,15);
                ellipse(this.screenX-10,this.y-11,15,22); //leg
                fill(239,228,176);
                ellipse(this.screenX-15,this.y-52,10,8);
                ellipse(this.screenX-10,this.y-8,10,10); //leg
                ellipse(this.screenX-10,this.y-17,3,5); //leg
                ellipse(this.screenX-13,this.y-16,3,5); //leg
                ellipse(this.screenX-7,this.y-16,3,5); //leg
            } else {
                fill(185,122,87);
                rect(this.screenX-10,this.y-6,20,10);
                ellipse(this.screenX-10,this.y+1,8,6);
                ellipse(this.screenX+10,this.y+1,8,6);
                ellipse(this.screenX-16,this.y-68,11,11);
                ellipse(this.screenX+16,this.y-68,11,11);
                ellipse(this.screenX,this.y-55,40,35);
                ellipse(this.screenX,this.y-25,40,45);
                ellipse(this.screenX-15,this.y-23,12,35);
                ellipse(this.screenX+15,this.y-23,12,35);
                fill(239,228,176);
                ellipse(this.screenX-16,this.y-68,6,6);
                ellipse(this.screenX+16,this.y-68,6,6);
                ellipse(this.screenX-6,this.y-56,18,20);
                ellipse(this.screenX+6,this.y-56,18,20);
                ellipse(this.screenX,this.y-51,24,15);
                ellipse(this.screenX,this.y-25,28,38);
                fill(0);
                ellipse(this.screenX-4,this.y-56,4,5);
                ellipse(this.screenX+4,this.y-56,4,5);
                fill(185,122,87);
                ellipse(this.screenX,this.y-49,16,10);
                fill(0);
                ellipse(this.screenX,this.y-51,8,6);
            }
        }
    }
}

class Enemies extends Player {
    constructor(_x, _y, _velX, _velY, _w, _h, _isPlummeting, _type, _facing) {
        super(_x, _y, _velX, _velY, _w, _h, _isPlummeting);
        this.type = _type;
        this.facing = _facing;
    }

    //Enemy position update
    update() {
        let angryL = 0;
        let angryR = 0;
        if (dist(player.x, player.y, this.x, this.y) < 300) {
            angryL = 1;
            angryR = -1;
        } else {
            angryL = 0;
            angryR = 0;
        }
        if (this.facing === "left") {
            this.velX = 1 + angryL;
            this.y = world.grnd - 35;
        } else {
            this.velX = -1 + angryR;
            this.y = world.grnd - 35;
        }
        this.x += this.velX;
        this.y += cos(this.x/6);
    }

    //Enemy draw on canvas
    show() {
        let angry = 0;
        if(dist(player.x,player.y,this.x,this.y) < 300){
            angry = cos(this.x/6)*25;
        }
        fill(200,20,20,25 + angry);
        ellipse(this.x + this.w/2, this.y + 10, 50, 50);
        ellipse(this.x + this.w/2, this.y + 10, 45, 45);
        ellipse(this.x + this.w/2, this.y + 10, 40, 40);
        ellipse(this.x + this.w/2, this.y + 10, 35, 35);
        fill(255);
        ellipse(this.x + this.w/2, this.y + 10,30,30);
        fill(0,0,0,100);
        ellipse(this.x + this.w/2, this.y + 38 - cos(this.x/6),20,6);
        if( this.facing === "left") {
            fill(150, 0, 30);
            ellipse(this.x + this.w/2 + 11, this.y + 10, 10, 20);
            fill(0);
            ellipse(this.x + this.w/2 + 14, this.y + 10, 6, 12);
        } else {
            fill(150, 0, 30);
            ellipse(this.x + this.w/2 - 11, this.y + 10, 10, 20);
            fill(0);
            ellipse(this.x + this.w/2 - 14, this.y + 10, 6, 12);
        }
    }
}
