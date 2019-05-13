import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Property } from '../models/Property.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  // Tableau qui va contenir tous les biens immobiliers
  properties: Property[] = [];
  // Subject = émetteur de données pour pouvoir les récupérer
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  // Récupération et émission des données
  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  // Enregistrement en base de donnée firebase
  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  // Récupération des données via firebase
  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      // Ternaire pour vérifier s'il y a des données à récupérer, sinon tableau vide
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  // Création des biens immobiliers
  createProperty(newProperty: Property) {
    // On insère le nouveau bien dans le tableau
    this.properties.push(newProperty);
    // On enregistre le tableau dans firebase
    this.saveProperties();
    this.emitProperties();
  }

  // Suppression d'un bien immobilier
  removeProperty(property: Property) {
    // On récupère l'index d'un bien pour pouvoir le supprimer
    const index = this.properties.findIndex(
      (propertyEl) => {
        if (propertyEl === property) {
          return true;
        }
      }
    );
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  // Modification d'un bien immobilier
  updateProperty(property: Property, id: number) {
    firebase.database().ref('/properties/' + id).update(property);
  }

  // Méthode de chargement d'un fichier
  uploadFile(file: File) {
    console.log("fuck")
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        console.log(uniqueId)
        const upload = firebase.storage().ref().child('images/properties/' + uniqueId + file.name).put(file);
        console.log(upload)
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading...')
          },
          (error) => {
            console.log("error" + error);
            reject()
          },
          () => {
            // Quand le chargement est complet, 
            // on demande au serveur de nous retourner le lien de téléchargement du fichier
            upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              resolve(downloadURL);
            })
          })
      }
    )
  }

  // Méthode de suppression des photos
  removePropertyPhoto(photoLink: string) {
    // Si le lien existe
    if (photoLink) {
      // On stocke dans une constante le lien où se trouve la photo
      const storageRef = firebase.storage().refFromURL(photoLink);
      // Méthode de suppression de firebase
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.log('File not found :' + error)
        }
      )
    }
  }
}
