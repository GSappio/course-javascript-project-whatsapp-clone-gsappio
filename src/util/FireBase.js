const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){
        
        this._config = {
            apiKey: "AIzaSyDMMdhQJPzUMxu_3ISESog1EvM9yXYljDk",
            authDomain: "whatsapp-clone-10a1a.firebaseapp.com",
            projectId: "whatsapp-clone-10a1a",
            storageBucket: "whatsapp-clone-10a1a.appspot.com",
            messagingSenderId: "173205096350",
            appId: "1:173205096350:web:12b01b7fc3e74f0b40388f",
            measurementId: "G-Z6MP5RK7NW"

          };   

        this.init();
    }

    init(){

        if(!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                timestampsInSnapshots: true 

            });

            window._initializedFirebase = true;

        }
 
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });

            })
            .catch(err=>{
                f(err);
            });

        });

    }

} 

