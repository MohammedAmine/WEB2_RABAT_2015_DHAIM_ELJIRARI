const DB_NAME = 'indexedDB-contacts';
const DB_VERSION = 1;
const DB_STORE_NAME = 'contacts';
var db;
var req;

var current_view_contact_key;

// openDb
function openDb() {
    console.log("Ouverture de la BD ...");
    req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function(evt) {
        db = this.result;
        console.log("Base de donnees ouverte avec succes.");
    };
    req.onerror = function(evt) {
        console.error("Erreur d'ouverture de la BD:", evt.target.errorCode);
    };
    req.onupgradeneeded = function(evt) {
        console.log("Creation de l'objectStore");
        var store = evt.currentTarget.result.createObjectStore(
                DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
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
	
	displayContactList()
}

// fin open db


//get objectstore
function getObjectStore(store_name, mode) {

    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

//clear objectstore
function clearObjectStore(store) {
    var store = getObjectStore('contacts', 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
        displayActionSuccess("Store efface avec succes.");
        displayContactList(store);
    };
    req.onerror = function(evt) {
        console.error("Erreur de suppression objectStore:", evt.target.errorCode);
        displayActionFailure(this.error);
    };
}



function displayContactList() {

    console.log("displayContactList");
    if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readonly');
    var contact_msg = $('#contact-msg');
    contact_msg.empty();
    var contact_list = $('#contact-list');
    contact_list.empty();
    // voit cette fonction
    //newViewerFrame();
    var req;
    req = store.count();
    req.onsuccess = function(evt) {
        contact_msg.append('<p>Vous avez <strong>' + evt.target.result +
                '</strong> contacts dans votre annuaire.</p>');
    };
    req.onerror = function(evt) {
        console.error("Erreur lors de l'ajout du contact : ", this.error);
        displayActionFailure(this.error);
    };
    var i = 0;
    req = store.openCursor();
    req.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            console.log("displayContactList cursor:", cursor);
            req = store.get(cursor.key);
            req.onsuccess = function(evt) {
                var value = evt.target.result;
                var list_item = $('<li>' +
                        '[' + cursor.key + '] ' +
                        '(ID: ' + value.prenom + ') ' +
                        value.nom + ' ' +value.prenom +' ' + value.poste +' ' + value.compagnie + ' ' +value.telephone + ' ' +value.email +
                        '</li>');
                //if (value.year != null)
                  //  list_item.append(' - ' + value.year);
                contact_list.append(list_item);
            };
            // Move on to the next object in store
            cursor.continue();
            // This counter serves only to create distinct ids
            i++;
        } else {
            console.log("Aucun autre contact.");
        }
    };

}// fin display contact list



function newViewerFrame() {
    var viewer = $('#contact-viewer');
    viewer.empty();
    var iframe = $('<iframe />');
    viewer.append(iframe);
    return iframe;
}

function setInViewer(key) {
    console.log("setInViewer:", arguments);
    key = Number(key);
    if (key == current_view_contact_key)
        return;
    current_view_contact_key = key;
    var store = getObjectStore(DB_STORE_NAME, 'readonly');

}


function addContact() {
	    console.log("Ajout du contact ...");
		console.log("Recuperation des donnees du contact ...");
        var nom = $('#nom').val();
		console.log(nom);
		console.log("OK");
        var prenom = $('#prenom').val();
		console.log(prenom);
		console.log("OK");
        var email = $('#email').val();
		console.log(email);
		console.log("OK");
        var telephone = $('#telephone').val();
		console.log(telephone);
		console.log("OK");
        var poste = $('#poste').val();
		console.log(poste);
		console.log("OK");
        var compagnie = $('#compagnie').val();
		console.log(compagnie);
		console.log("OK");
		var obj = { nom: nom, prenom:prenom,email:email,telephone:telephone,poste:poste,compagnie:compagnie};
		console.log("Recuperation des donnees du contact effectuee avec succes");
		
        if (!nom || !prenom) {
            displayActionFailure("Le contact doit avoir au moins un nom et un prenom");
            return;
        }
	console.log("Acquisition de l'objectStore");
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
	console.log("Acquisition de l'objectStore reussie");
    var req;
	req = store.add(obj);
	
	req.onsuccess = function(evt) {
        console.log("Insertion dans la BD effetctuee avec succes.");
        //displayActionSuccess("Contact ajoute");
        //displayContactList(store);
    };
	
    req.onerror = function() {
        console.error("Erreur insertion contact dans la BD", this.error);
        //displayActionFailure(this.error);
    };
    
}


function deleteContact(key, store) {
    console.log("deleteContact:", arguments);
    if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var record = evt.target.result;
        console.log("contact:", record);
        if (typeof record == 'undefined') {
            displayActionFailure("Aucun contact trouve.");
            return;
        }

        req = store.delete(key);
        req.onsuccess = function(evt) {
            console.log("evt:", evt);
            console.log("evt.target:", evt.target);
            console.log("evt.target.result:", evt.target.result);
            console.log("Suppression effectuee avec succes.");
            displayActionSuccess("Suppression effectuee avec succes");
            displayContactList(store);
        };
        req.onerror = function(evt) {
            console.error("Supprimer Contact:", evt.target.errorCode);
        };
    };
    req.onerror = function(evt) {
        console.error("Supprimer Contact:", evt.target.errorCode);
    };
}

function deleteContact(id) {
    console.log("Suppression du contact:", arguments);
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.index('id');
    req.get(id).onsuccess = function(evt) {
        if (typeof evt.target.result == 'undefined') {
            displayActionFailure("Aucun contact trouve.");
            return;
        }
        deleteContact(evt.target.result.id, store);
    };
    req.onerror = function(evt) {
        console.error("deleteContact:", evt.target.errorCode);
    };
}



function displayActionSuccess(msg) {
   // msg = typeof msg != 'undefined' ? "Succes : " + msg : "Succes";
   // $('#contact-msg').html('<span class="action-success">' + msg + '</span>');
}

function displayActionFailure(msg) {
   // msg = typeof msg != 'undefined' ? "Echec : " + msg : "Echec";
   // $('#contact-msg').html('<span class="action-failure">' + msg + '</span>');
}

function resetActionStatus() {
    console.log("Reinitialisation ...");
    $('#contact-msg').empty();
    console.log("Reinitialisation reussie");
}




		