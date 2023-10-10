import { Dust, Fire, Splash } from "./particles.js";

/**
 * Enum
 * Estados que puede tener PLAYER
 */
const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
}

/**
 * Clase Estados
 * 
 */
export class State{
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

/***
 * Clase Sitting - Sentado
 * especifica para el estado de Sentado - Sitting
 */
export class Sitting extends State{
    constructor(game){
        super('SITTING', game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    }

    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

/**
 * Clase Running - Correr
 * especifica para el estado de Correr - Running
 */
export class Running extends State{
    constructor(game){
        super('RUNNING', game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    }

    handleInput(input){
        /**Particulas */
            this.game.particles.unshift(new Dust(this.game, 
                                              this.game.player.x + this.game.player.width * 0.6, 
                                              this.game.player.y + this.game.player.height)); //Creo la Instancia para las particular al CORRER

        /**Condicionales */
            if(input.includes('ArrowDown')){
                this.game.player.setState(states.SITTING, 0);
            }else if(input.includes('ArrowUp')){
                this.game.player.setState(states.JUMPING, 1);
            }else if(input.includes('Enter')){
                this.game.player.setState(states.ROLLING,2);
            }
    }
}

/**
 * Clase Jumping - Saltar
 * especifica para el estado de Jump - Saltar
 */
export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);        
    }

    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
    }

    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING,2);
        }else if(input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

/**
 * Clase Falling - Caida
 * especifica para el estado de Falling - Caida
 */
export class Falling extends State{
    constructor(game){
        super('FALLING', game);        
    }

    enter(){       
        this.game.player.frameX = 0; 
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
    } 

    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }else if(input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

/**
 * Clase Rolling - Rodar 
 * especifica para el estado de Rolling - Rodar del Player
 */
export class Rolling extends State{
    constructor(game){
        super('ROLLING', game);        
    }

    enter(){       
        this.game.player.frameX = 0; 
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        // this.game.player.vy = 15;
    } 

    handleInput(input){
         /**Particulas */
            this.game.particles.unshift(new Fire(this.game, 
                                           this.game.player.x + this.game.player.width * 0.6, 
                                           this.game.player.y + this.game.player.height * 0.5)); //Creo la Instancia para las particular al CORRER

        /**Condicionales */
            if(!input.includes('Enter') && this.game.player.onGround()){
                //Si presiona Enter y se encuentra en el suelo
                this.game.player.setState(states.RUNNING, 1);
            }else if(!input.includes('Enter') && !this.game.player.onGround()){
                //Si No presiona Enter y No se encuentra en el suelo
                this.game.player.setState(states.FALLING, 1);
            }else if(input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
                //Si presiona Enter y se encuentra Saltando y Se encuentra en el suelo
                this.game.player.vy -27;
                this.game.player.setState(states.JUMPING,1);
            }else if(input.includes('ArrowDown') && !this.game.player.onGround()){
                this.game.player.setState(states.DIVING, 0);
            }
    }
}


/**
 * Clase Diving -  Caida
 *  especifica para el estado de Caida
 */
export class Diving extends State{
    constructor(game){
        super('DIVING', game);        
    }

    enter(){       
        this.game.player.frameX = 0; 
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15
    } 

    handleInput(input){
         /**Particulas */
            this.game.particles.unshift(new Fire(this.game, 
                                           this.game.player.x + this.game.player.width * 0.6, 
                                           this.game.player.y + this.game.player.height * 0.5)); //Creo la Instancia para las particular al CORRER

        /**Condicionales */
            if(this.game.player.onGround()){
                this.game.player.setState(states.RUNNING, 1);

            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game, 
                    this.game.player.x + this.game.player.width * 0.5, 
                    this.game.player.y + this.game.player.height));
            }

            }else if(input.includes('Enter') && this.game.player.onGround()){
                //Si No presiona Enter y No se encuentra en el suelo
                this.game.player.setState(states.ROLLING, 2);
            }
    }
}

/**
 * Clase Hit -  
 * 
 */
export class Hit extends State{
    constructor(game){
        super('HIT', game);        
    }

    enter(){       
        this.game.player.frameX = 0; 
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    } 

    handleInput(input){
        /**Condicionales */
            if(this.game.player.frameX >= 10 && this.game.player.onGround()){
                this.game.player.setState(states.RUNNING, 1);
            }else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
                //Si No presiona Enter y No se encuentra en el suelo
                this.game.player.setState(states.FALLING, 1);
            }
    }
}