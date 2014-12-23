

var champCivilite,champNom, champPrenom,champEmail,champTelephone,champCompagnie,champPoste;
var contacts = [];

function enregisterModifications() {

  console.log("sauvegarde du formulaire");
  console.log("valeur de la civilite : " + champNom.value);
  console.log("valeur du nom : " + champNom.value);
  console.log("valeur du prenom : " + champNom.value);
  console.log("valeur du email : " + champNom.value);
  console.log("valeur du telephone : " + champNom.value);
  console.log("valeur du compagnie : " + champNom.value);
  console.log("valeur du poste : " + champNom.value);
  
  var contact = {};
    
  contact.civilite=champCivilite.value
  contact.nom = champNom.value;
  contact.prenom=champPrenom.value
  contact.email = champEmail.value;
  contact.telephone = champTelephone.value;
  contact.compagnie = champCompagnie.value;
  contact.poste = champPoste.value;
  
  champCivilite.value="";
  champNom.value="";
  champPrenom.value="";
  champEmail.value="";
  champTelephone.value="";
  champCompagnie.value="";
  champPoste.value="";
  
  // On rajoute le contact dans le tableau des contacts
  contacts = JSON.parse(localStorage.contacts);
  contacts.push(contact);
  
  // On sauvegarde au format JSON
  localStorage.contacts = JSON.stringify(contacts);
  
  ajouteLigneAuTableau(contact.civilite, contact.nom, contact.prenom,contact.email,contact.telephone, contact.compagnie, contact.poste);
    }
	









function init() {

//test
 var contact = {};
  
  contact.civilite="Mr.";
  contact.nom = "nom 1";
  contact.prenom="prenom 1";
  contact.email = "email1@gmail.com";
  contact.telephone ="765-765-7654";
  contact.compagnie = "compagnie1";
  contact.poste = "poste1";
  
    contacts.push(contact);
	localStorage.contacts = JSON.stringify(contacts);
	ajouteLigneAuTableau(contact.civilite, contact.nom, contact.prenom,contact.email,contact.telephone, contact.compagnie, contact.poste);
  
  //fin test

  champCivilite = document.querySelector("#civilite");
  champNom = document.querySelector("#nom");
  champPrenom = document.querySelector("#prenom");
  champEmail=document.querySelector("#email");
  champTelephone=document.querySelector("#telephone");
  champCompagnie=document.querySelector("#compagnie");
  champPoste=document.querySelector("#poste");
  
  console.log("On regarde s'il y'a des contacts dans le localStorage");
  if(localStorage.contacts) {
    contacts = JSON.parse(localStorage.contacts);
  }

  
  console.log("init effectué");
  
  console.log("liste des contacts :");
  afficheContacts();

}








function afficheContacts() {
    for(var i = 0; i < contacts.length; i++) {
    console.log("Informations du contact : " +contacts[i].civilite + contacts[i].nom + contacts[i].prenom + contacts[i].poste + " chez " + contacts[i].compagnie + " joignable au " + contacts[i].telephone + "ou à " + contacts[i].email);
    
      ajouteLigneAuTableau(contacts[i].civilite, contacts[i].nom, contacts[i].prenom, contacts[i].poste, contacts[i].compagnie, contacts[i].telephone, contacts[i].email );

  }
}







function ajouteLigneAuTableau(civilite,nom,prenom,poste,compagnie,telephone,email) {
      // on cree une ligne
    var ligne = document.createElement("tr");
    
    // on crée 7 cellules pour les informations
    var celCivilite = document.createElement("td");
    celCivilite.innerHTML = civilite;
	
	var celNom = document.createElement("td");
    celNom.innerHTML = nom;
	
	var celPrenom = document.createElement("td");
    celPrenom.innerHTML = prenom;
	
	var celPoste = document.createElement("td");
    celPoste.innerHTML = poste;
	
	var celCompagnie = document.createElement("td");
    celCompagnie.innerHTML = compagnie;
	
	var celTelephone = document.createElement("td");
    celTelephone.innerHTML = telephone;
	
	var celEmail = document.createElement("td");
    celEmail.innerHTML = email;
 
       
    // On met les cellules dans la ligne
  ligne.appendChild(celCivilite);
  ligne.appendChild(celNom);
	ligne.appendChild(celPrenom);
	ligne.appendChild(celPoste);
	ligne.appendChild(celCompagnie);
	ligne.appendChild(celTelephone);
	ligne.appendChild(celEmail);
    
    // on ajoute la ligne au tbody
       document.querySelector("#LeTbody").appendChild(ligne);
}









function effacerTout() {
  localStorage.clear();
  document.querySelector("#LeTbody").innerHTML="";
}
