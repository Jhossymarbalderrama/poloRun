export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 32;
        this.fontFamily = 'Bangers';     
        this.livesImage = lives;
    }

    draw(context){
        context.save();
        context.shadowOffsetX= 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;

        /**Styles */
            context.font = this.fontSize + 'px ' + this.fontFamily;   
            context.textAlign = 'left';
            context.fillStyle = this.game.fontColor;

        /**Score */
            context.fillText('Puntaje:  ' + this.game.score, 20, 50);

        /**Timer */
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Tiempo: ' + (this.game.time * 0.001).toFixed(1) , 20 , 80);

        /** Lives Player */
        for (let i = 0; i < this.game.lives; i++) {        
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }

        /**Game Over messages */
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;  
            if(this.game.score > this.game.winningScore){
                context.fillText('Exterminio!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;  
                context.fillText('Quien es el señor de la noche???. Eres tú!!!', this.game.width * 0.5, this.game.height * 0.5 + 5);
            }else{
                context.fillText('Te quedaras satisfecho con eso ultimo?', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;  
                context.fillText('Vuelve a pelear!!!', this.game.width * 0.5, this.game.height * 0.5 + 5);
            }
        }

        context.restore();
    }

}