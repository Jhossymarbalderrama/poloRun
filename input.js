/**
 * Clase InputHandler - Key de Entrada
 * 
 * clase especifica para obtener las teclas de entrada presionadas
 */
export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = []; //Keys de entradas

        //Get Inputs
            window.addEventListener('keydown', e =>{
                if((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'
                ) && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                // else if(e.key === 'd') this.game.debug = !this.game.debug;  
                if(e.key == 'r' || e.key == 'R'){
                    console.log("restart");
                    window.location.reload();
                }
            });


        //Delete INPUT del Array keys
            window.addEventListener('keyup', e =>{
                if(
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter'
                ){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }                
            });
    }
}