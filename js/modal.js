// Get the modal
const modal = document.getElementById("myModal");

// Get the edit modal
const edit_modal = document.getElementById("editmodal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const spans = document.getElementsByClassName("close");


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
for(let i=0;i<spans.length;i++){
spans[i].onclick = function() {
  modal.style.display = "none";
  edit_modal.style.display="none";
  //clear input fields
  document.getElementById("name").value='';
  document.getElementById("pn").value='';

  document.getElementById("name_edit").value='';
  document.getElementById("pn_edit").value='';
}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

    //clear input fields
    document.getElementById("name").value='';
    document.getElementById("pn").value='';
  }
  else if(event.target == edit_modal){
    edit_modal.style.display = "none";

    //clear input fields
    document.getElementById("name_edit").value='';
    document.getElementById("pn_edit").value='';
  }
} 

let cnFromStorage = JSON.parse(localStorage.getItem("cndata"));
let pnFromStorage = JSON.parse(localStorage.getItem("pndata"));
let indexesFromStorage = JSON.parse(localStorage.getItem("indexes"));

let cnFromStorage_str = JSON.stringify(cnFromStorage);
let pnFromStorage_str = JSON.stringify(pnFromStorage);
let indexesFromStorage_str = JSON.stringify(indexesFromStorage);


function save() {
  //The user is restricted from saving blank data
  let regex=/^\s*$/gi;
  //The user  is restricted from saving non integers values
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
  // indexes_old_data.push(id);


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
      // let checkboxcell = document.createElement("td");
    
    

      const lastcn= cn_old_data[cn_old_data.length-1];
      const lastpn= pn_old_data[pn_old_data.length-1];
      cnCell.innerHTML = lastcn;
      pnCell.innerHTML = lastpn;
      // checkboxcell.innerHTML = checkbox.outerHTML;
  
      // row.appendChild(checkboxcell);
      row.appendChild(cnCell);
      row.appendChild(pnCell);
  
      document.getElementById("table").appendChild(row);
    }
    modal.style.display = "none";
    executed=false;
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
    // let checkboxcell = document.createElement("td");
    
    
    // checkboxcell.innerHTML = checkbox.outerHTML;
    cnCell.innerHTML = cnFromStorage[i];
    pnCell.innerHTML = pnFromStorage[i];
    
    // row.appendChild(checkboxcell);
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

//initialize a boolean state to do the select function only once (if this step wasn't made the select button will create a checkbox columns at each click)
let executed = false;

function selecting()
{
  // Check if the select button is clicked and save button has been clicked before.
  if (!executed) {
    executed = true;
    
    let th_row=document.getElementById("mytableheader");
    //create a new header elemet
    let checkbox_th=document.createElement("th");
    checkbox_th.id="checkbox_th_id";
    let firstheader = th_row.getElementsByTagName("th")[0];
    th_row.insertBefore(checkbox_th,firstheader);

    let table = document.getElementById("table");
    
    const rows = table.querySelectorAll("tr");
    
    
    //disable adding a new record until finishing the select process
    document.getElementById("myBtn").disabled=true;
      
    // Loop through all the rows and insert a new cell before the first existing cell.    
    for (let row of rows) {
      let checkboxcell = document.createElement("td");
      checkboxcell.id="checkboxcell";
      checkboxcell.innerHTML = checkbox.outerHTML;
      row.insertBefore(checkboxcell, row.firstChild);

    }
 
    document.getElementById("edit").disabled=true;

// Replace the old button with the new button.

deselectbtn_func("select");

}
}

function deselectbtn_func(buttonId)
{

// Get the button element with the specified ID.
let replacedbutton=document.getElementById(buttonId);

//create a deselect button to replace the selectbtn on select's click
let deselectbtn=document.createElement("button");
//set the deselectbtn text
deselectbtn.innerHTML="Deselect";
// Set the deselectbtn's id
deselectbtn.id = 'deselect';
//replace the select button with a new button to deselect
deselectbtn.style.marginRight="16px";

  if(edit_modal.style.display === "none"){  
  // Replace the old button with the new button.
  replacedbutton.parentNode.replaceChild(deselectbtn, replacedbutton);
  }

// const firstCheckbox = document.querySelector('input[type="checkbox"]:first-child');

deselectbtn.onclick= function()
{
  executed=false; //for the select button

  // Get the table header you want to remove.
  let checkbox_th=document.getElementById("mytableheader").querySelector("th[id='checkbox_th_id']");
  
  
  deselectbtn.parentNode.replaceChild(replacedbutton,deselectbtn);
  
  // Get the cells you want to remove.
  let checkboxcells = document.getElementById("table").querySelectorAll("td[id='checkboxcell']");
  
  
  
  //remove all the checkbox cells
  for(let cells of checkboxcells)
  {
    cells.remove();
  }
  
  
  //remove the table header
  checkbox_th.remove();
  

  
  //finally replace the deselect button with the select button
  // deselectbtn.replaceWith(selectbtn);

  // document.getElementById("edit").disabled=false;
  document.getElementById("del").disabled=false;
  document.getElementById("myBtn").disabled=false;
  document.getElementById("delall").disabled=false;
  document.getElementById("select").disabled=false;
  document.getElementById("edit").disabled=false;

  // deselectbtn.style.display = "none";
  // selectbtn.style.display="block";  

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

  for(let i=0;i<indexesFromStorage.length;i++)
  {
    if (checkbox[i].checked) {
      let tr = checkbox[i].closest('tr');
      // Remove the row from the table.
      tr.remove(); 
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


function edit()
  {  
      // let edit_btn=document.getElementById("edit");

      // edit_btn.disabled=true;
      document.getElementById("del").disabled=true;
      document.getElementById("myBtn").disabled=true;
      document.getElementById("delall").disabled=true;
      document.getElementById("select").disabled=true;

    // Check if the select button is clicked and save button has been clicked before.
    // if (!executed) {
    // executed = true;
    
    let th_row=document.getElementById("mytableheader");
    //create a new header elemet
    let checkbox_th=document.createElement("th");
    checkbox_th.id="checkbox_th_id";
    let firstheader = th_row.getElementsByTagName("th")[0];
    th_row.insertBefore(checkbox_th,firstheader);

    let table = document.getElementById("table");
    // const firstCell = table.rows[0].cells[0];
    const rows = table.querySelectorAll("tr");
    // table.rows[0].insertBefore(checkboxcell,firstCell);
     

    // Get the table header you want to remove.
    let get_checkbox_th=document.getElementById("mytableheader").querySelector("th[id='checkbox_th_id']");
      
    // Loop through all the rows and insert a new cell before the first existing cell.    
    for (let row of rows) {
      let checkboxcell = document.createElement("td");
      checkboxcell.id="checkboxcell";
      checkboxcell.innerHTML = checkbox.outerHTML;
      row.insertBefore(checkboxcell, row.firstChild);
    
      checkboxcell.onclick=function()
      {
        
        edit_modal.style.display = "block";
        
        //for initializing selecting function boolean state to be selected only one time
        executed=false;

        // Get the cells you want to remove.
        let checkboxcells = document.getElementById("table").querySelectorAll("td[id='checkboxcell']");
        

        //remove all the checkbox cells
        for(let cells of checkboxcells)
        {
          cells.remove();
        }

        //remove the table header
        checkbox_th.remove();
        
        document.getElementById("del").disabled=false;
        document.getElementById("myBtn").disabled=false;
        document.getElementById("delall").disabled=false;
        document.getElementById("select").disabled=false;
        
      }
    }     
  // }    

  if(edit_modal.style.display === "none"){  
  deselectbtn_func("edit");
  }
  else if(edit_modal.style.display === "block"){ 
  deselectbtn_func("deselect");
  }


    // return edit_btn;
}

function searching() {
  var input = document.getElementById("search").value;
  var table = document.getElementById("wholetable");
  var rows = table.querySelectorAll("tr");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var text = row.textContent.toLowerCase();

    if (text.indexOf(input.toLowerCase()) === -1) {
      row.style.display = "none";
    } else {
      row.style.display = "table-row";
    }
  }
}

function edit_backend()
{
 // Retrieve the phone contact and number from localstorage.
 const cnarray = JSON.parse(localStorage.getItem('cndata'));
 const pnarray = JSON.parse(localStorage.getItem('pndata'));

 let cn_input=document.getElementById("name_edit");
 let pn_input=document.getElementById("pn_edit");

// Get the values of the input elements.
var name_value = cn_input.value;
var pn_value = pn_input.value;

// Get the table element.
const table = document.getElementById("myTable");

// Get the checked row.
var checkedRow = table.querySelector("tr:checked");


 //The user is restricted from saving blank data
 let regex=/^\s*$/gi;
 //The user  is restricted from saving non integers values
 let pnregex= /^[0-9]+$/gi
 if(regex.test(name_value)===false
 &&
 regex.test(pn_value)===false
 &&
 pnregex.test(pn_value)===true
 ){

  checkedRow.cells[0].textContent = name_value;
  checkedRow.cells[1].textContent = pn_value;

 }
 else
 {
  alert("Please enter valid name or mobile number");
 }
}