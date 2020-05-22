const Vehicle = function(color, engine){
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    this.model = 'Vehicle';
    this.currentSpeed = 0;
    this.driving = false;
}
Vehicle.prototype.getInfo = function(){
    return {engine: this.engine, color: this.color,maxSpeed: this.maxSpeed,model: this.model}
}
Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed){
    if (!this.driving){
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }
}
Vehicle.prototype.drive = function(){
    if (this instanceof Motorcycle){
        console.log(`Let's drive`);
    }
    if (!this.driving){
        let drive = setInterval(() => {

            if (this.currentSpeed > this.maxSpeed){
                console.log('speed is too high, SLOW DOWN!');
            }
            if (this instanceof Motorcycle && this.currentSpeed - this.maxSpeed>=30){
                console.log('Engine overheating');
                this.stop();

            }
            this.currentSpeed+=20;
            console.log(this.currentSpeed);
        },2000)
        this.driving = drive;
    } else {
        console.log('Already driving');
    }

}
Vehicle.prototype.stop = function(){
    if (this.driving && this.currentSpeed > 0){

        clearInterval(this.driving);
        this.driving = false;
        let maxSpeed = this.currentSpeed;
        let stopping = setInterval(() => {

            if (this.currentSpeed > 0){
                console.log(this.currentSpeed);
                this.currentSpeed-=20;
            } else{
                clearInterval(stopping);
                if (this instanceof Motorcycle){
                    console.log(`Motorcycle ${this.model} is stopped. Good drive`)
                } else if(this instanceof Car) {
                    console.log(`Car ${this.model} is stopped. Maximum speed during the drive ${maxSpeed}`);
                } else {
                    console.log(`Vehicle is stopped. Maximum speed during the drive ${maxSpeed}`);
                }
            }
        },1500)
    } else {
        console.log('Already slows down');
    }
}


const Car = function(model,color,engine){
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 80;
}

const Motorcycle = function(model,color,engine){
    Vehicle.call(this,color,engine)
    this.maxSpeed = 90;
    this.model = model;

}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.changeColor = function(newColor){
    if (this.color === newColor){
        console.log('The selected color is the same as the previous, please choose antoher one');
    } else {
        this.color = newColor;
    }
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;