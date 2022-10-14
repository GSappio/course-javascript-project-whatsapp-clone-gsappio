export class CameraController {

    constructor(videoEl) {
        this._videoEl = videoEl

        navigator.mediaDevices.getUserMedia({ video: true }).then(screenStream => {
            this._screenStream = screenStream
            this._videoEl.srcObject = screenStream;
            this._videoEl.play()
        }).catch(err => {
            console.error(err)
        })
    }

}