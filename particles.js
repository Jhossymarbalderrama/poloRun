class Particle{
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }

    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle{
    /**Constructor de ATRIBUTOS */
    constructor(game, x, y){
        super(game); 
        this.size = Math.random() * 10 + 10; // Tamaño de Particulas
        this.x = x; //Posicion de Particulas X
        this.y = y; //Posicion de Particulas Y
        this.speedX = Math.random(); //Rapides de Particulas EJE X
        this.speedY = Math.random(); //Rapides de Particulas EJE Y
        // this.color = 'black'; //Color de Particulas
        this.color = 'rgba(10,6,0,0.3)'; //Color de Particulas
    }
    
    /**Alta de Estilos de Particulas */
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 100 + 100; //Tamaño
        this.x = x - this.size * 0.4; //Posicion X
        this.y = y - this.size * 0.5; //Posicion Y
        this.speedX = Math.random() * 6 - 4; //Velocidad eje X
        this.speedY = Math.random() * 2 + 2; //Velocidad eje Y
        this.gravity = 0; //Gravedad
        this.image = fire; //IMG
    }

    update(){
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.image = fire;//IMG 
        this.size = Math.random() * 100 + 100; //Tamaño
        this.x = x;//Posicion eje X
        this.y = y;//Posicion eje Y
        this.speedX = 1;//Velocidad eje X
        this.speedY = 1;//Velocidad eje Y
        this.angle = 0;//Angulo
        this.va = Math.random() * 0.2 - 0.1;//Velocidad de Angulo
    }

    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size *0.5, this.size, this.size);
        context.restore();
    }
}