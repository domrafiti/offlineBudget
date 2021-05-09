let db;
let dbVersion;

const request = window.indexedDB.open("BudgetDB", dbVersion || 1);

request.onupgradeneeded = function (e) {
    console.log("offline - indexDB");

    db = e.target.result;

    if (db.objectStoreNames.length === 0) {
        db.createObjectStore('BudgetStore', { autoIncrement: true });
    };

};

request.onsuccess = function (e) {

    db = e.target.result;

    if (navigator.onLine) {
        console.log('Database back online! 🗄️');
        checkDatabase();
    };
};

request.onerror = function (e) {
    console.log(`Bummer! ${e.target.errorCode}`);
};

const saveRecord = (record) => {
    console.log('Saving record(s)');

    const transaction = db.transaction(['BudgetStore'], 'readwrite');

    const store = transaction.objectStore('BudgetStore');

    store.add(record);
};