import { Firebase } from './../util/Firebase';
import { Model } from './Model';

export class User extends Model {

    constructor(id){

        super();

        if(id) this.getById(id);

    }

    getById(id){

        return new Promise((s, f)=>{

            User.findByEmail(id).get().then(doc=>{

                this.fromJSON(doc.data());

            });

        });

    }

    save(){

        return User.findByEmail(this.email).set(this.toJSON());

    }

    static getRef(){

        return Firebase.db().collection('/users');

    }

    static findByEmail(email){

        return User.getRef().doc(email);

    }

}