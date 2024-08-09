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
  // When you call the open() method, it can succeed or fail. To handle each case, you can assign the corresponding event handler as follows.:
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
})();