
// init
function init() {
  contactsDb.indexedDB.open(); // open displays the data previously saved
}

//A function that takes the data out of the DOM is needed so, call the contactsDb.indexedDB.addcontact method
window.addEventListener("DOMContentLoaded", init, false);

//namespace to encapsulate the database logic
var contactsDb = {};
contactsDb.indexedDB = {};

//Opening the database
contactsDb.indexedDB.db = null;

contactsDb.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("contacts", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = contactsDb.indexedDB.onerror;

	// Objectstore is recreated after each execution
    if(db.objectStoreNames.contains("contact")) {
      db.deleteObjectStore("contact");
    }

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
    contactsDb.indexedDB.db = e.target.result;
    contactsDb.indexedDB.getAllcontactItems();
  };

  request.onerror = contactsDb.indexedDB.onerror;
};
//
//
//
//
//
//Adding data to an object store
contactsDb.indexedDB.addcontact = function(contactText) {

//
		var nom = $('#nom').val();
        var prenom = $('#prenom').val();
		
        var email = $('#email').val();
        var telephone = $('#telephone').val();
		
        var poste = $('#poste').val();
        var compagnie = $('#compagnie').val();
//
  var db = contactsDb.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");
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
    contactsDb.indexedDB.getAllcontactItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};
//
//
//
//
//
//Querying the data in a store
contactsDb.indexedDB.getAllcontactItems = function() {
  var contact_list = $('#contact-list');
    contact_list.empty();

  var db = contactsDb.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    rendercontact(result.value);
    result.continue();
  };

  cursorRequest.onerror = contactsDb.indexedDB.onerror;
};
//
//
//
//
//
//Rendering data from an Object Store
function rendercontact(row) {
  var contacts = document.getElementById("contactItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode();
  t.data = row.text;

  a.addEventListener("click", function(e) {
    contactsDb.indexedDB.deletecontact(row.text);
  });

  a.textContent = " [Delete]";
  li.appendChild(t);
  li.appendChild(a);
  contacts.appendChild(li);
}
//
//
//
//
//
//Deleting data from a table
contactsDb.indexedDB.deletecontact = function(id) {
  var db = contactsDb.indexedDB.db;
  var trans = db.transaction(["contact"], "readwrite");
  var store = trans.objectStore("contact");

  var request = store.delete(id);

  trans.oncomplete = function(e) {
    contactsDb.indexedDB.getAllcontactItems();  // Refresh the screen
  };

  request.onerror = function(e) {
    console.log(e);
  };
};

