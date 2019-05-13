import { Component, OnInit } from '@angular/core';
// Import des components de formulaire d'angular 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  adminSignInForm: FormGroup;
  errMsg: string;

  // Appel aux autres composants
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  // Méthode d'initialisation du composant
  ngOnInit() {
    this.initForm();
  }

  // Initialisation du formulaire et validators
  initForm() {
    this.adminSignInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9-a-zA-Z]{6,}/)]]
    });
  }

  // Récupération des données du formulaire
  onAuth() {
    const email = this.adminSignInForm.get('email').value;
    const password = this.adminSignInForm.get('password').value;
    // Exécution de la méthode signInUser du composant AuthenticationService
    this.authenticationService.signInUser(email, password)
      .then(() => {
        // Redirection vers le tableau de bord si l'authentification est ok
        this.router.navigate(['/admin', 'dashboard']);
      },
        // Si l'authentification est KO, message d'erreur
        (error) => {
          this.errMsg = error;
          alert(this.errMsg);
        }
      )
  }
}
