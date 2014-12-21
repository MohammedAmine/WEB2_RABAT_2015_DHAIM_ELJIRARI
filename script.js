function getData() {

//variable clé : idcontact
//variable valeur : contactdata (c'est un tableau) 

idcontact;
contactdata[];

// ajout de données de test
idcontact=1;
//civilité
contactdata[0]="Mr.";
//nom
contactdata[1]="Buffa";
//prenom
contactdata[2]="Michel";
//email
contactdata[3]="michel.buffa@gmail.com";
//telephone
contactdata[4]="0033676986543";
//compagnie
contactdata[5]="Bufallo";
//poste
contactdata[6]="Directeur Général";


// enregistrement des données de test dans le local storage
localeStorage.idcontact=contactdata;

//store test data in local storage


// retrieve data from localstorage

    }