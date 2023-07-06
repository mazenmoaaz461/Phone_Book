// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//checkbox for deleting the checked records
let checkbox = document.createElement("input");
// checkbox1.setAttribute("type", "checkbox");
checkbox.type = "checkbox";
checkbox.name = "checkbox";
checkbox.value = "1";
checkbox.id="checkaya";
checkbox.style=
{
  background: "black",
  color: "black",
  height: "20px",
};


btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";

  //clear input fields
  document.getElementById("name").value='';
  document.getElementById("pn").value='';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  
    //clear input fields
  document.getElementById("name").value='';
  document.getElementById("pn").value='';
  }
  
} 

let cnFromStorage = JSON.parse(localStorage.getItem("cndata"));
let pnFromStorage = JSON.parse(localStorage.getItem("pndata"));

let cnFromStorage_str = JSON.stringify(cnFromStorage);
let pnFromStorage_str = JSON.stringify(pnFromStorage);


function save() {
  //The customer is restricted from saving blank data
  let regex=/^\s*$/gi;
  let pnregex= /^[0-9]+$/gi
  //if there is nothing saved at the start then save an empty array in localStorage
  if(regex.test(document.getElementById("name").value)===false
  &&
  regex.test(document.getElementById("pn").value)===false
  &&
  pnregex.test(document.getElementById("pn").value)===true
  ){
  if(localStorage.getItem('cndata')==null||localStorage.getItem('pndata')==null)
  {
    localStorage.setItem('cndata','[]');
    localStorage.setItem('pndata','[]'); 
  }

  let cn_old_data=JSON.parse(localStorage.getItem('cndata'));
  let pn_old_data=JSON.parse(localStorage.getItem('pndata'));

  

  //add saved data to the old data
  cn_old_data.push(document.getElementById("name").value);
  pn_old_data.push(document.getElementById("pn").value);
  
  
  //save old and new data in localStorage
  localStorage.setItem('cndata', JSON.stringify(cn_old_data));
  localStorage.setItem('pndata', JSON.stringify(pn_old_data));

    //clear input fields
    document.getElementById("name").value='';
    document.getElementById("pn").value='';

    //adding saved record to the table instantly on saving
    if(cn_old_data  && pn_old_data){
      let row = document.createElement("tr");
      let cnCell = document.createElement("td");
      let pnCell = document.createElement("td");


      let checkboxcell = document.createElement("td");
      checkboxcell.innerHTML = checkbox.outerHTML;
      row.appendChild(checkboxcell);
    
      
  
      const lastcn= cn_old_data[cn_old_data.length-1];
      const lastpn= pn_old_data[pn_old_data.length-1];
      cnCell.innerHTML = lastcn;
      pnCell.innerHTML = lastpn;
      
      row.appendChild(cnCell);
      row.appendChild(pnCell);
  
      document.getElementById("table").appendChild(row);
    }
  }
   else{
    alert("Please enter valid name or mobile number");
  }

};


function view()
{ 
    document.getElementById("table").innerHTML ='';
    
    try{
    for(let i = 0;i<cnFromStorage.length;i++){  
    
    let row = document.createElement("tr");
    let cnCell = document.createElement("td");
    let pnCell = document.createElement("td");
    let checkboxcell = document.createElement("td");
    
    
    checkboxcell.innerHTML = checkbox.outerHTML;
    cnCell.innerHTML = cnFromStorage[i];
    pnCell.innerHTML = pnFromStorage[i];
    
    row.appendChild(checkboxcell);
    row.appendChild(cnCell);
    row.appendChild(pnCell);
    

    document.getElementById("table").appendChild(row);
  }
}
catch(error)
{
  console.log("Empty data");
}
}

function delete_all_selectedrecords()
{
  let confirmdeletion = confirm("Are You sure you want to delete selected records");

  // Get all the checked checkboxes
  let  checkedboxes=document.querySelectorAll("input[type=checkbox]:checked")
  let  checkboxes=document.querySelectorAll("input[type=checkbox]");
  

  //if OK is clicked 
  if (confirmdeletion) {
  // For each checked checkbox, get the parent row.
    for (let i = 0; i < checkedboxes.length; i++) {
    //this is the row of the selected checkbox 
    let tr = checkedboxes[i].closest('tr');
    // Remove the row from the table.
    tr.remove();
   }

  // // Create an empty array to store the rows to be deleted.
  // let rowsToDelete = [];

  // // Loop through the checked checkboxes and add the corresponding rows to the array.
  // for (let i = 0; i < checkedboxes.length; i++) {
    
  //   let row = checkedboxes[i].parentNode.parentNode;
  //   rowsToDelete.push(row);
    
  // }
  // // Delete the rows.
  // for (let i = 0; i < rowsToDelete.length; i++) {
  //   rowsToDelete[i].remove();
  // }
  }
}