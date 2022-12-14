import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{

    constructor(){

        super();

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({ 
            audio: true 
        }).then(screenStream => {

            this._available = true; 

            this._screenStream = screenStream;

            this.trigger('ready', this._screenStream);

        }).catch(err => {
            console.error(err);
        }); 

    }

    isAvailible(){

        return this._available; 

    }
    
    stop(){

        screenStream.getTracks().forEach(track=>{
            track.stop();
        });

    }


    startRecorder(){

        if (this.isAvailible()) {

            this._mediaRecorder = new  MediaRecorder(this._screenStream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('datavailable', e => {
                 
                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });  

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e => {

                    audioContext.decodeAudioData(reader.result).then(decode=>{

                        let file = new File([blob], filename, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        }); 

                        this.trigger('recorded', file, decode);

                    });    

                 }

                 reader.readAsArrayBuffer(blob);

            });

            this._mediaRecorder.start();
            this.startTimer();

        }

    }

    stopRecorder(){

        if (this.isAvailible()) {

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }

    }

    startTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

           this.trigger('recordtimer', (Date.now() - start));

        }, 100);

    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);

    }

}