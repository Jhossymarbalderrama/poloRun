class Enemy{
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 30;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
        //Movimiento
            this.x -= this.speedX + this.game.speed;
            this.y += this.speedY;

            //Frame x Segundos
                if(this.frameTimer > this.frameInterval){
                    this.frameTimer = 0;
                    //Animacion de cambio de Frame
                        if(this.frameX < this.maxFrame) this.frameX++
                        else this.frameX = 0;
                }else{
                    this.frameTimer += deltaTime;
                }
        
        // chek if off screen - chequeo si esta fuera del foco cambio estado a eliminado
            if(this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);//Rectangulo Debug Enemies
        
        context.drawImage(this.image, 
                          this.frameX * this.width, 0,
                          this.width, this.height,
                          this.x, this.y, 
                          this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;//OBJ Game
        this.width = 60;//Ancho Frame
        this.height = 44;//Alto Frame
        this.x = this.game.width + Math.random() * this.game.width * 0.5;//Posicion
        this.y = Math.random() * this.game.height * 0.5;//Posicion
        this.speedX = Math.random() + 1;//Velocidad en el eje X
        this.speedY = 0;
        this.maxFrame = 5;//Maximo Frame
        // this.image = document.getElementById('enemy_fly');
        this.image = enemy_fly;
        this.angle = 0;//Angulo de Enemigo
        this.va = Math.random() * 0.1 + 0.1;//
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);//Efecto de Sube baja SIN
    }

    draw(context){
        super.draw(context);
    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super(game);
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = enemy_plant;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super(game);
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = enemy_spider_big;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }

    update(deltaTime){
        super.update(deltaTime);
        //Sube Despacio la Araña/Spdier
            if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        //Si se pasa del margen Y cambio el estado de Eliminado a True    
            if(this.y < -this.height) this.markedForDeletion = true;
    }

    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2,0);
        context.lineTo(this.x + this.width/2, this.y + 50);
        context.stroke();
    }
}