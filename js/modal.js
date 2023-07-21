// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


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
let indexesFromStorage = JSON.parse(localStorage.getItem("indexes"));

let cnFromStorage_str = JSON.stringify(cnFromStorage);
let pnFromStorage_str = JSON.stringify(pnFromStorage);
let indexesFromStorage_str = JSON.stringify(indexesFromStorage);


function save() {
  //The customer is restricted from saving blank data
  let regex=/^\s*$/gi;
  let pnregex= /^[0-9]+$/gi
  if(regex.test(document.getElementById("name").value)===false
  &&
  regex.test(document.getElementById("pn").value)===false
  &&
  pnregex.test(document.getElementById("pn").value)===true
  ){
  //if there is nothing saved at the start then save an empty array in localStorage
  if(localStorage.getItem('cndata')==null||localStorage.getItem('pndata')==null
  ||localStorage.getItem('indexes')==null||localStorage.getItem('id')==null)
  {
    localStorage.setItem('cndata','[]');
    localStorage.setItem('pndata','[]'); 
    localStorage.setItem('indexes','[]');
    localStorage.setItem('id',0);
  }

  let cn_old_data=JSON.parse(localStorage.getItem('cndata'));
  let pn_old_data=JSON.parse(localStorage.getItem('pndata'));
  let indexes_old_data=JSON.parse(localStorage.getItem('indexes'));

  //add saved data to the old data
  cn_old_data.push(document.getElementById("name").value);
  pn_old_data.push(document.getElementById("pn").value);


  //save old and new data in localStorage
  localStorage.setItem('cndata', JSON.stringify(cn_old_data));
  localStorage.setItem('pndata', JSON.stringify(pn_old_data));

  let id_storage=JSON.parse(localStorage.getItem('id'));
  
    indexes_old_data.push(id_storage);
    id_storage++;
    localStorage.setItem("id",JSON.stringify(id_storage));
  

    localStorage.setItem('indexes', JSON.stringify(indexes_old_data));


    //clear input fields
    document.getElementById("name").value='';
    document.getElementById("pn").value='';

    //adding saved record to the table instantly on saving
    if(cn_old_data  && pn_old_data){
      let row = document.createElement("tr");
      let cnCell = document.createElement("td");
      let pnCell = document.createElement("td");
      let checkboxcell = document.createElement("td");    

      const lastcn= cn_old_data[cn_old_data.length-1];
      const lastpn= pn_old_data[pn_old_data.length-1];
      cnCell.innerHTML = lastcn;
      pnCell.innerHTML = lastpn;
      checkboxcell.innerHTML = checkbox.outerHTML;
  
      row.appendChild(checkboxcell);
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

function delete_allrecords()
{
  let deleteall=document.createElement("button");
  deleteall.innerHTML="Delete All";

  // document.body.appendChild(deleteall);

  let confirmdeletion = confirm("Are You sure you want to clear your contacts");

  if(confirmdeletion)
  {
    localStorage.removeItem("cndata");
    localStorage.removeItem("pndata");
    localStorage.removeItem("indexes");
    localStorage.removeItem("id");
    document.getElementById("table").innerHTML='';

  }
}

function delete_all_selectedrecords()
{
  // Get all the checked checkboxes
  // let  checkedboxes=document.querySelectorAll("input[type=checkbox]:checked");
  let  checkbox=document.querySelectorAll("input[type=checkbox]");
  let cn=JSON.parse(localStorage.getItem("cndata"));
  let pn=JSON.parse(localStorage.getItem("pndata"));
  let indexes=JSON.parse(localStorage.getItem("indexes"));
  const checkedCheckboxes = [];


  let checkedCount=0;
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      checkedCount++;
    }
  }
  
  if(checkedCount!==0){
  let confirmdeletion = confirm("Are You sure you want to delete the selected records");
  //if OK is clicked 
  if (confirmdeletion) {

   for (let i = 0; i < cnFromStorage.length; i++) {
    if(checkbox[i].checked)
    {
      console.log(i);
      let tr = checkbox[i].closest('tr');
      // Remove the row from the table.
      tr.remove(); 
    }
  }

  for(let i=0;i<indexesFromStorage.length;i++)
  {
    if (checkbox[i].checked) {
      checkedCheckboxes.push(i);
    }
  }

  // Create a new array without the checked indexes.
  const newArray = indexes.filter((item, index) => {
    return !checkedCheckboxes.includes(index);
  });
  const newArray2 = cn.filter((item, index) => {
    return !checkedCheckboxes.includes(index);
  });
  const newArray3 = pn.filter((item, index) => {
    return !checkedCheckboxes.includes(index);
  });

// Save the new array to localStorage.
localStorage.setItem("indexes", JSON.stringify(newArray));
localStorage.setItem("cndata", JSON.stringify(newArray2));
localStorage.setItem("pndata", JSON.stringify(newArray3));

  }
}
else
{
  alert("Please select the records you want to delete");
}
}