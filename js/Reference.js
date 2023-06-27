//modal.js
save.onclick = function save() {

    //contact name
    let cn = document.getElementById("name").value;
    
    //CONTACT PHONE NUMBER
    let pn = document.getElementById("pn").value;
    
    // let actionsbuttons = document.createElement(`
    // <button></button>
    // `);
    let actionsbuttons=`
    <button id="edit" >Edit</button>
    <button id="del" >Delete</button>
    `
      // create an array to store the input field values
      var cnArray = [];
      var pnArray = [];
    
      // push the input field value to the array
      cnArray.push(cn);
      pnArray.push(pn);
    
      // store the array in local storage
      localStorage.setItem("cnArray", JSON.stringify(cnArray));
      localStorage.setItem("pnArray", JSON.stringify(pnArray));
    
    
      // get the inputArray array from local storage
      var cnparsedArray = JSON.parse(localStorage.getItem("cnArray"));
      var pnparsedArrayz = JSON.parse(localStorage.getItem("pnArray"));
    
      let row = document.createElement("tr");
      let cnCell = document.createElement("td");
      let pnCell = document.createElement("td");
      let actionscell = document.createElement("td");
    
      // localStorage.setItem("cnrecords",cn);
      // localStorage.setItem("pnrecords",pn);
    
    
      // let cnrecords= localStorage.getItem("cnrecords");
      // let pnrecords= localStorage.getItem("pnrecords");
    
      
      row.appendChild(cnCell);
      row.appendChild(pnCell);
      row.appendChild(actionscell);
    
      document.getElementById("table").appendChild(row);
      document.getElementById("name").value='';
      document.getElementById("pn").value='';
      // cn1 = "";
      // pn1="";
    }
    