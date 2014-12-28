
// init -- OK
function init() {
  console.log("Ouverture BD...");
  contacts.indexedDB.open(); // open displays the data previously saved
  console.log("Ouverture BD...OK");
  
  
}



//A function that takes the data out of the DOM is needed so, call the contacts.indexedDB.addcontact method
window.addEventListener("DOMContentLoaded", init, false);

//namespace to encapsulate the database logic
var contacts = {};
contacts.indexedDB = {};

//Opening the database
contacts.indexedDB.db = null;


//opening IDB -- 
contacts.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("contacts", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = contacts.indexedDB.onerror;

	// Objectstore is recreated after each execution
    //if(db.objectStoreNames.contains("contact")) {
   //   db.deleteObjectStore("contact");
   // }

    var store = db.createObjectStore("contact", {keyPath: 'id', autoIncrement: true});
		console.log("Creation de l'objectStore terminee avec succes");
		console.log("Creation des index");
        store.createIndex('nom', 'nom', {unique: false});
		console.log("Nom OK");
        store.createIndex('prenom', 'prenom', {unique: false});
		console.log("Prenom OK");
        store.createIndex('poste', 'poste', {unique: false});
		console.log("Poste OK");
        store.createIndex('compagnie', 'compagnie', {unique: false});
		console.log("Compagnie OK");
        store.createIndex('email', 'email', {unique: true});
		console.log("Email OK");
        store.createIndex('telephone', 'telephone', {unique: true});
		console.log("Telephone OK");
		console.log("Creation des index terminee avec succes");
		
	  
	  
	  
  };

  request.onsuccess = function(e) {
    contacts.indexedDB.db = e.target.result;
    contacts.indexedDB.getAllcontactItems();
  };

  request.onerror = contacts.indexedDB.onerror;
};
//
//
//
//
//
//Adding data to an object store -- OK
contacts.indexedDB.addThecontact = function(nom,prenom,email,telephone,poste,compagnie) {

/*
		var nom = $('#nom').val();
        var prenom = $('#prenom').val();
		
        var email = $('#email').val();
        var telephone = $('#telephone').val();
		
        var poste = $('#poste').val();
        var compagnie = $('#compagnie').val();
*/
  var db = contacts.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");
  console.log("Enregistrement du contact...");
  var request = store.put({
    "nom": nom,
	"prenom":prenom,
	"email":email,
	"telephone":telephone,
	"poste":poste,
	"compagnie":compagnie
  });
  

  trans.oncomplete = function(e) {
    // Re-render all the contact's
 console.log("Enregistrement du contact...OK");
    contacts.indexedDB.getAllcontactItems();
  };

  request.onerror = function(e) {
     console.log("Enregistrement du contact...ERREUR");
  };
};
//
//
//A function that takes the data out of the DOM is needed -- OK
//
//
function addContact() {
console.log("Ajout du contact...");
//create contact object
  var nom = document.getElementById('nom');
  var prenom = document.getElementById('prenom');
  
  var email = document.getElementById('email');
  var telephone = document.getElementById('telephone');
  
  var poste = document.getElementById('poste');
  var compagnie = document.getElementById('compagnie');
   
  //add data to contact
  contacts.indexedDB.addThecontact(nom.value,prenom.value,email.value,telephone.value,poste.value,compagnie.value);
  nom.value = '';
  prenom.value = '';
  email.value = '';
  telephone.value = '';
  poste.value = '';
  compagnie.value = '';
}
//
//
//
//
//
//Querying the data in a store -- OK
contacts.indexedDB.getAllcontactItems = function() {
console.log("Acces aux contacts...");

  var db = contacts.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");
  
console.log("Acces aux contacts...OK");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  console.log("Chargement curseur...");
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var cursor = e.target.result;
	
	
    if(cursor) {
	console.log("Chargement curseur...OK");
	
			cursorRequest = store.get(cursor.key);
			
					cursorRequest.onsuccess = function(evt) {
					var value = evt.target.result;
					console.log("Contact "+cursor.key+" chargé");
					rendercontact(cursor.key,value.nom,value.prenom,value.poste,value.compagnie,value.email,value.telephone);
                   return;
					};
			
	cursor.continue();		
  };
  
 

  cursorRequest.onerror = contacts.indexedDB.onerror;
};

console.log("Chargement des contacts...OK");
}
//
//
//
//
//
//Rendering data from an Object Store - POK
function rendercontact(key,nom,prenom,poste,compagnie,email,telephone) {


  var contact_list = $('#contact-list');
    contact_list.empty();

	
  var list_contact = $(
  
  
					
							'<li>' + 
							'Contact numero : '+key +' : '
							+nom+ ' '+
							prenom+ ' , '+
							poste+
							compagnie+ ' joignable at : '+
							email+ ' ou au :'
							+telephone+'</li>'
					
					);
					

					
						
contact_list.append(list_contact);

 
}
//
//
//
//
//
//Deleting data from a table -- OK
contacts.indexedDB.deletecontact = function() {

var id =document.getElementById('key-to-delete');
  var db = contacts.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");

  var request = store.delete(id.value);

  trans.oncomplete = function(e) {
    contacts.indexedDB.getAllcontactItems();  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};

