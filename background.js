/**
 * Clase Layer
 * Background del juego
 */
class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;        
    }

    update(){
        if(this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;//OBJ Game
        this.width = 1667;//Ancho de Background IMG
        this.height = 500;//Alto de Background IMG
        this.layer1image = layer1;//ID del elemento del DOM background/layer
        this.layer2image = layer2;//ID del elemento del DOM background/layer
        this.layer3image = layer3;//ID del elemento del DOM background/layer
        this.layer4image = layer4;//ID del elemento del DOM background/layer
        this.layer5image = layer5;//ID del elemento del DOM background/layer
        //(instancia Game, width, height, speed, imgBackground)
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);//Instancia de Fondo
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);//Instancia de Fondo
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);//Instancia de Fondo
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);//Instancia de Fondo
        this.layer5 = new Layer(this.game, this.width, this.height, 2, this.layer5image);//Instancia de Fondo

        this.backgroundLayers = [this.layer1,
                                 this.layer2,
                                 this.layer3,
                                 this.layer4,
                                 this.layer5];
    }

    update(){
        this.backgroundLayers.forEach(layer =>{
            layer.update();
        })
    }

    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        })
    }
}