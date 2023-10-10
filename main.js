import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;//500
    canvas.height = 500;//500

    class Game{
        constructor(width, height){
            this.width = width; //Ancho de area de juego
            this.height = height; // Alto de area de juego
            this.groundMargin = 80; //margen de piso del mundo
            this.speed = 0; //Velocidad de Game
            this.maxSpeed = 3; //Maxima Velocidad de Game
            this.background = new Background(this);//Instancia de Background
            this.player = new Player(this); //Instancia de Player, le paso la instancia de "game"
            this.input = new InputHandler(this);   
            this.UI = new UI(this);//Instancia de UI
            this.enemies = [];//Collecciones de Enemigos
            this.particles = []; //Collecciones de Particulas
            this.collisions = []; //Collecciones de Animaciones
            this.floatingMessages = []; //Collecciones de Mensajes
            this.maxParticles = 200; //Maximo de Particulas
            this.enemyTimer = 0;//Time Enemigos x Segundo
            this.enemyInterval = 1000;//Intervalo de enemigos x Segundos
            this.debug = false;//Modo Debug
            this.score = 0;//Score de Game
            this.winningScore = 40;
            this.fontColor = 'black';//Font Color de Game
            this.time = 0; //Timer de game
            this.maxTime = 30000;//Maximo Time
            this.gameOver = false;//Verificador de Finalizacion de Game
            this.lives = 5;//Vidas del Player
            this.player.currentState = this.player.states[0]; //
            this.player.currentState.enter();
        }

        update(deltaTime){
            this.time += deltaTime;
            if(this.time > this.maxTime){
                this.gameOver = true;
            }

            /**Manejo de IMGs Background */
                this.background.update();

            /**Manejo de INPUTs Keys */
                this.player.update(this.input.keys, deltaTime); //sends INPUTs the player

            /**Manejo de Enemigos */
                if(this.enemyTimer > this.enemyInterval){
                    this.addEnemy();
                    this.enemyTimer = 0;
                }else{
                    this.enemyTimer += deltaTime;
                }

                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                });

            /**Manejo de Mensajes */
                this.floatingMessages.forEach(message => {
                    message.update();                                   
                });

            /**Manejo de Particulas*/
                this.particles.forEach((particle, index) =>{
                    particle.update();
                });  

                if(this.particles.length > this.maxParticles){
                    this.particles.length = this.maxParticles;
                }
            /**Manejo de Colisiones sprites*/
                this.collisions.forEach((collision, index) => {
                    collision.update(deltaTime);
                }); 

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);//Elimino Enemigos fuera de foco
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);//Elimino Particulas por repeticion
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);//Elimino Colisiones Sprite
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);//Elimino Mensajes repetidos
        }

        draw(context){
            /**Styles Background */
                this.background.draw(context);
            
            /**Player */
                this.player.draw(context); //Le paso el context ctx para que use ese elemento el modelo

            /**Enemigos */
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                });

            /**Particulas */
                this.particles.forEach(particle => {
                    particle.draw(context);
                });

            /** Colisiones*/
                this.collisions.forEach(collision => {
                    collision.draw(context);
                });

            /** Mensajes*/
                this.floatingMessages.forEach(message => {
                    message.draw(context);                                   
                });

            /**UI */
                this.UI.draw(context);
        }

        addEnemy(){
            //Enemys
                //Spaw de Platnas or Spiders
                    //Plants
                        if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this))
                    //Spider
                        else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
                //Spaw de Flys
                    //Fly
                        this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies);
        }

    }

    const game = new Game(canvas.width, canvas.height);
    // console.log(game);
    let lastTime = 0;

    //timeStamp, lastTime, deltaTime : para frame x segundos
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height); //Elimino los frame de Movimiento
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});