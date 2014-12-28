var id=1;
var nom;
var idRechercher;


<<<<<<< HEAD
function f_consult() {
f_viderTableau();
for(var i in localStorage)
{
  var monitem=localStorage[i];
=======
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
  
>>>>>>> FETCH_HEAD
  var contact = {};

  contact.civilite=JSON.parse(monitem).civilite;
  contact.nom =JSON.parse(monitem).nom;
  contact.prenom=JSON.parse(monitem).prenom;
  contact.email =JSON.parse(monitem).email;
  contact.telephone =JSON.parse(monitem).telephone;
  contact.compagnie = JSON.parse(monitem).compagnie;
  contact.poste =JSON.parse(monitem).poste;
  
  f_ajouteLigneAuTableau(contact.civilite, contact.nom, contact.prenom,contact.email,contact.telephone, contact.compagnie, contact.poste);
}
}






function f_getMaxId()
{
	id=JSON.parse(localStorage[localStorage.length]).identifiant;

}	





function f_ajouteLigneAuTableau(civilite,nom,prenom,poste,compagnie,telephone,email) {
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








function f_ajouter()
{
	
	if (localStorage.length==0)
	{
	id=1;
	f_inserer();
	}
	else 
	{
	f_getMaxId();
	id++;
	f_inserer();
	}
	
}


function f_inserer()
{
	contact={};
	contact.identifiant=id;
    var selectElmt = document.getElementById("civilite");
	var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
  	contact.civilite=selectElmt.options[selectElmt.selectedIndex].text;
  	
  	//nom,prenom,email,telephone,compagnie
    contact.nom = document.getElementById("nom").value;
  	contact.prenom=document.getElementById("prenom").value;
  	contact.email = document.getElementById("email").value;
  	contact.telephone = document.getElementById("telephone").value;
  	contact.compagnie = document.getElementById("compagnie").value;
  	contact.poste = document.getElementById("poste").value;
  
  	//Ajout du contact dans le local storage
    localStorage.setItem(id.toString(),JSON.stringify(contact));
    id++;
}



function f_viderTableau()
{
	document.querySelector("#LeTbody").innerHTML="";
}


function f_effacerTout() {
  localStorage.clear();
  f_viderTableau();
}



function f_rechercher()
{
for(var i in localStorage)
{
	var monitem=localStorage[i];
	if (JSON.parse(monitem).nom==document.getElementById("nom").value)
	{
 		console.log(document.getElementById("nom").value);
 		//document.form1.T_nom.value=JSON.parse(monitem).nom;
 		document.form1.T_prenom.value=JSON.parse(monitem).prenom;
 		document.form1.T_email.value=JSON.parse(monitem).email;
 		document.form1.T_telephone.value=JSON.parse(monitem).telephone;
 		document.form1.T_compagnie.value=JSON.parse(monitem).compagnie;
 		document.form1.T_post.value=JSON.parse(monitem).poste;
 		idRechercher=JSON.parse(monitem).identifiant;
	} 
	else {alert("aucun contact avec ce nom");}
}}



function f_enregisterModifications() 
{
	contact={};
	contact.identifiant=idRechercher;
    var selectElmt = document.getElementById("civilite");
	var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
  	contact.civilite=selectElmt.options[selectElmt.selectedIndex].text;
  	
  	//nom,prenom,email,telephone,compagnie
    contact.nom = document.getElementById("nom").value;
  	contact.prenom=document.getElementById("prenom").value;
  	contact.email = document.getElementById("email").value;
  	contact.telephone = document.getElementById("telephone").value;
  	contact.compagnie = document.getElementById("compagnie").value;
  	contact.poste = document.getElementById("poste").value;
  
  	//Ajout du contact dans le local storage
    localStorage.setItem(id.toString(),JSON.stringify(contact));
    
}
    
    
function f_supprimer() 
{
localStorage.removeItem(idRechercher);
}
