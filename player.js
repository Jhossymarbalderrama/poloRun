import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit} from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";
/**
 * Clase PLAYER
 * 
 * clase especifica para el jugador
 */
export class Player{
    constructor(game){
        this.game = game; // Area de Juego
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin; //alto del area de juego - alto de player
        this.vy = 0; //Velocidad de Y
        this.weight = 1;//Peso para salto
        this.image = player; //Esto solo se puede hacer en JS (busca la ID de un elemento en el DOM que coincida)
        this.frameX = 0;//Frame de Player X
        this.frameY = 0;//Frame de Player Y
        this.maxFrame = 0;
        this.fps = 60;
        this.frameInterval = 1000/this.fps; //frames x segundos
        this.frameTimer = 0;
        this.speed = 0; //Velocidad Player
        this.maxSpeed = 10; //Velocidad Maxima Player
        this.states = [new Sitting(game),
                       new Running(game),
                       new Jumping(game),
                       new Falling(game),
                       new Rolling(game),
                       new Diving(game),
                       new Hit(game)
                    ];//Estado de Player [sitting, running, jumping ...] //Instancio Sittin y paso el objeto PLAYER para que pueda acceder a las propiedades de ej keys        
        this.currentState = null;
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        
        /**Horizontal Movimiento */
            //Velocidad de Player
                this.x += this.speed;
                    //Movimiento de player
                    if(input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
                    else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed
                    else this.speed = 0;

        /**Limites Horizontales */
            //Limite margen Izquierdo
            if(this.x < 0) this.x = 0;
            //Limite margen Derecho
                if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;           

        /**Vertical Movimiento */
            //Velocidad de Salto
                this.y += this.vy;            
            //No esta saltando le agrego peso a VY para que baje del salto
            //Si Player volvio a su posicion inicial reseteo el VY
                if(!this.onGround()) this.vy += this.weight
                else this.vy = 0;

        /**Limites Horizontales */
            if(this.y > this.game.height - this.height - this.game.groundMargin){
                this.y = this.game.height - this.height - this.game.groundMargin;
            }
        
        /**Sprite Animation */
            if(this.frameTimer > this.frameInterval){
                this.frameTimer = 0;
                if(this.frameX < this.maxFrame) this.frameX++
                else this.frameX = 0;
            }else{
                this.frameTimer += deltaTime;
            }
    }

    draw(context){                
        
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);//Cuadro de debug Player

        //(img, FrameX, FrameY, playerW, PlayerH, playerX, playerY,playerW, PlayerH)
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround(){
        //Esta haciendo un salto true - false
            return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
        //get state
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){        
        this.game.enemies.forEach(enemy => {            
            if(                
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){                
                /**Collision Detected */
                    enemy.markedForDeletion = true; //Elimino Enemy
                    
                    /**Instancias de Animaciones de Colisiones */
                    this.game.collisions.push(new CollisionAnimation(this.game, 
                                                                    enemy.x + enemy.width * 0.5, 
                                                                    enemy.y + enemy.height * 0.5));

                    //Si hay una colision y el estado es Falling o Rolling (Caida o Rodar)
                    if(this.currentState === this.states[4] || this.currentState === this.states[5] ){
                        this.game.score++; //Sumo el Score       
                        this.game.time = this.game.time - 500;//Sumo medio segundo cuando mato                 
                        this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 70, 50));//60, 83 tiempo
                    }else{
                        this.setState(6, 0);
                        this.game.score-=5; //Resto el Score     
                        this.game.lives--;
                        if(this.game.lives <= 0) this.game.gameOver = true;
                    }                
            }else{                
                //No Collision Detected
            }
        });
    }
}