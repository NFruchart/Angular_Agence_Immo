import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/service/properties.service';
import { Property } from 'src/app/models/Property.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

  propertyForm: FormGroup;
  properties: Property[];
  propertiesSubscritpion: Subscription;
  editProperty: boolean = false;
  createTitle: boolean = true;
  editTitle: boolean = false;
  photoUploading: boolean = false;
  photoUploaded: boolean = false;
  photoUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit() {
    this.initForm();
    this.propertiesSubscritpion = this.propertiesService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      });
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  ngOnDestroy() {
    this.propertiesSubscritpion.unsubscribe();
  }

  initForm() {
    // Construction du formulaire d'ajout de biens HTML dans le fichier TS (méthode template)
    this.propertyForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['']
    })
  }

  resetPropertyForm() {
    this.editProperty = false;
    this.propertyForm.reset();
    this.editTitle = false;
    this.createTitle = true; 
  }

  onSaveProperty() {
    // Enregistrement des données dans des constantes lors du submit du formulaire d'ajout de biens
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    const newProperty = new Property(title, category, surface, rooms, description);
    if (this.photoUrl && this.photoUrl !== '') {
      newProperty.photo = this.photoUrl
    } 
    if (this.editProperty == true) {
      // On appelle la fonction updateProperty du component PropertiesService      
      this.propertiesService.updateProperty(newProperty, id);
    } else {
      // On appelle la fonction createProperty du component PropertiesService      
      this.propertiesService.createProperty(newProperty);
    }
    // On cache le formulaire lors de la soumission   
    $('#propertiesFormModal').modal('hide');
    this.resetPropertyForm();
    this.photoUploaded = false;
    this.photoUrl = '';
    
  }

  onDeleteProperty(property: Property) {
    // On fait appel à la fonction removeProperty dans le composant PropertiesService
    this.propertiesService.removeProperty(property);
    this.propertiesService.removePropertyPhoto(property.photo);
  }

  // Récupération des données du biens immobilier pour remplir les champs du formulaire et les modifier
  onEditProperty(property: Property, id: number) { 
    // Rendu conditionnel du titre de la modal   
    this.editTitle = true;
    this.createTitle = false;    
    $('#propertiesFormModal').modal('show')    
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);
    this.editProperty = true;
  }

  detectFile(event) {
    this.photoUploading = true;
    // On récupère le premier élément du tableau
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl= url;
        this.photoUploading = false;
        this.photoUploaded = true;
      }
    )
  }
}
