function getData() {

//variable cl� : idcontact
//variable valeur : contactdata (c'est un tableau) 

idcontact;
contactdata[];

// ajout de donn�es de test
idcontact=1;
//civilit�
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
contactdata[6]="Directeur G�n�ral";


// enregistrement des donn�es de test dans le local storage
localeStorage.idcontact=contactdata;

//store test data in local storage


// retrieve data from localstorage

    }