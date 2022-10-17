export class MicrophoneController {

    constructor(){

        navigator.mediaDevices.getUserMedia({ 
            audio: true 
        }).then(screenStream => {

            this._screenStream = screenStream;

            let audio = new Audio();

            audio.src  = screenStream;
            
            audio.play();

            this.trigger('play', audio);

        }).catch(err => {
            console.error(err);
        }); 

    }

}