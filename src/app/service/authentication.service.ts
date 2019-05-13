import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  // Authentification avec firebase
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        // Méthode firebase        
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            // si ok
            resolve();
            console.log("connecté");
          },
            // si erreur
            (error) => {
              reject(error);
            })
      }
    )
  }

  signOutUser() {
    // Méthode de déconnexion de firebase
    firebase.auth().signOut();
    console.log("déconnecté")
  }
}
