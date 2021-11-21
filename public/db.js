let db;

const request = indexedDB.open("budgettrack", 1);

request.onupgradeneeded = function(event) {
  
  db.createObjectStore("pending", { autoIncrement: true });
};


//if there's an error, show what it is
request.onerror = function(event) {
 
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");

  store.add(record);
}


function checkDB() {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    console.log(getAll.result)
    if (getAll.result.length > 0) {
        
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
        .then(() => {
       
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");
          store.clear();
        });
    }
  };
}



