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

    const cnFromStorage = JSON.parse(localStorage.getItem("cndata"));
    const pnFromStorage = JSON.parse(localStorage.getItem("pndata"));
    
function save() {

  //if there is nothing saved at the start then save an empty array in localStorage
  if(localStorage.getItem('cndata')==null||localStorage.getItem('pndata')==null)
  {
    // localStorage.setItem('cndata','[]');
    // localStorage.setItem('pndata','[]');
    alert("Please Enter a valid name or number");
  }

  let cn_old_data=JSON.parse(localStorage.getItem('cndata'));
  let pn_old_data=JSON.parse(localStorage.getItem('pndata'));

  // //save data to localStorage if it matches these regular expressions(any character)
  // let regex=/^\S|\S.*\S$/gi;
  // if(regex.test(localStorage.getItem('cndata'))){

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

  
      const lastcn= cn_old_data[cn_old_data.length-1];
      const lastpn= pn_old_data[pn_old_data.length-1];
      cnCell.innerHTML = lastcn;
      pnCell.innerHTML = lastpn;
  
      row.appendChild(cnCell);
      row.appendChild(pnCell);
  
      document.getElementById("table").appendChild(row);
    }
  // }
    
  // else{
  //   alert("fas");
  // }

};

function view()
{ 
    document.getElementById("table").innerHTML ='';

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

// function deleteAll(){

// }