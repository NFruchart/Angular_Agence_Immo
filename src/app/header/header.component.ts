import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean

  // Appel d'autres composants
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Vérification de l'état de connexion de l'utilisateur
    firebase.auth().onAuthStateChanged(
      // Vérifie si l'utilisateur est connecté pour nous permettre de modifier l'affichage du header (fichier HTML)
      // => le menu dropdown "Administration" s'affiche uniquement si l'utilisateur est connecté 
      (user) => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    )
  }

  onSignOut() {
    // Appel à la méthode signOutUser du composant authenticationService qu'on a passé dans le constructor
    this.authenticationService.signOutUser();
  }

}
