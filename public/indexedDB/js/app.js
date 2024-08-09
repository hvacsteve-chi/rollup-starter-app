(function () {
  // 1.)Check if the IndexedDB is supported
  // The following code checks if a web browser supports the indexedDB:

  if(!window.indexedDB){
    console.log(`Your browser doesn't support IndexedDB`);
    return;
  }

  // 2)Open a database
  // To open a connection o a database, you use the open() method of the window.indexedDBL

  const request = indexedDB.open('CRM', 1);

  // The open() method accepts two arguments:
  // -The database name (CRM)
  // -The database version(1)
  // The open() method returns a request object which is an instance of the IDBOpenDBRequest interface.
  // When you call the open() method, it can succeed or fail. To handle each case, you can assign the corresponding event handler as follows:

  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };
  request.onsuccess = (event) => {
    // add implementation here
  };

  // 3) Create object stores
  // When you open the database for the first time, the onupgradeneeded event trigger will trigger.
  // If you open the database for the second time with a version higher than the existing, the onupgradeneeded event also triggers.
  // For the firSt time, you can use the onupgradeneeded event handle to initialize the object stores and indexes.
  // For example, the following onupgradeneeded event handler creates the Contacts object store and its index.

  // create the Contacts object store and indexes
  request.onupgradeneeded = (event) => {
    let db = event.target.result;

    // create the Contacts object store
    // with auto-increment id
    let store = db.createObjectStore('Contacts', {
      autoIncrement: true
    });

    // create an index on the email property
    let index = store.createIndex('email', 'email', {
      unique: true
    });
  };
  // How it works.

  // -  First, get the IDBDatabase instance from the event.target.result and assign it to the db variable.
  // - Second, call the createObjectStore() method to create the Contacts object store with the autoincrement key. It means that the IndexedDB will generate an auto-increment number starting at one as the key for every new object inserted into the Contact object store.
  // - Third, call the createIndex() method to create an index on the email property. Since the email is unique, the index should also be unique.  To do so, you specify the third argument of the createIndex() method { unique: true }.

  // 4) Insert data into object stores
  // Once you open a connection to the database successfully, you can manage data in the onsuccess event handler.
  // For example, to add an object to an object store, you follow these steps:
  // First, open a new transaction.
  // Second, get an object store.
  // Third, call the put() method of the object store to insert a new record.
  // Finally, close the connection to the database once the transaction completes.
  // The following insertContact() function inserts a new contact into the Contacts object store:

  function insertContact(db, contact) {
    // create a new transaction
    const txn = db.transaction('Contacts', 'readwrite');
    // get the Contacts object store
    const store = txn.objectStore('Contacts');
    //
    let query = store.put(contact);

    // handle success case
    query.onsuccess = function (event) {
      console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
      console.log(event.target.errorCode);
    }

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
      db.close();
    };
  }

  // To create a new transaction, you cal the transaction() method of the IDBDatabase object.
  // You can open a transaction in one of two modes: readwrite or readonly.  The readwrite mode allows hou to read data from and write data to the database while the readonly mode allows you to only read data from the database.
  // It's a good practice to open readonly transaction if you need to read data from a database only.
  // After defining the insertContact() function, you can call it in the onsuccess event handler of the request to insert one or more contacts like this:
})();