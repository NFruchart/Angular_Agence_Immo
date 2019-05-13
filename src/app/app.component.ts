import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // Initialisation de Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyDQknjVlqq43M1xNVB2WxTUyVM1ag9YF60",
      authDomain: "agenceimmo-cb08f.firebaseapp.com",
      databaseURL: "https://agenceimmo-cb08f.firebaseio.com",
      projectId: "agenceimmo-cb08f",
      storageBucket: "agenceimmo-cb08f.appspot.com",
      messagingSenderId: "303963946352",
      appId: "1:303963946352:web:0bd17bbbb839009d"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
