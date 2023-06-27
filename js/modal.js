// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//save button
const save=document.getElementById("save");

//view button
const view=document.getElementById("view");






// When the user clicks on the button, open the modal
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





// save.onclick = function save() {

//   //created Objects for user inputs 
// const userdata = 
// {
//   name:document.getElementById("name").value,
//   pnum:document.getElementById("pn").value
// } 

//   //if there is nothing saved at the start then save an empty array in localStorage
//   if(localStorage.getItem('data')==null)
//   {
//     localStorage.setItem('data','[]')
//   }
  
//   let old_data=JSON.parse(localStorage.getItem('data'));

//   //add saved data to the old data
//   old_data.push(userdata.name);
//   old_data.push(userdata.pnum);
//   // old_data.push(allinputs);

//   //save old and new data in localStorage
//   localStorage.setItem('data', JSON.stringify(old_data));

//   //clear input fields
//   document.getElementById("name").value='';
//   document.getElementById("pn").value='';
// };





save.onclick = function save() {

  //if there is nothing saved at the start then save an empty array in localStorage
  if(localStorage.getItem('cndata')==null||localStorage.getItem('cndata')==null)
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
};


// Get the items from local storage
const cnFromStorage = JSON.parse(localStorage.getItem("cndata"));
const pnFromStorage = JSON.parse(localStorage.getItem("pndata"));
// document.write(cnFromStorage);




    let delbtn = document.createElement("button");
    
    let editbtn = document.createElement("button");
    
    delbtn.innerHTML = "Delete";
    
    editbtn.innerHTML="Edit";
    

    
    // delbtn.onclick = function () {
    //   alert("fghe");
    //  };

    //  document.body.appendChild(delbtn);

view.onclick=function view()
{ 
    document.getElementById("table").innerHTML ='';

    for(let i = 0;i<cnFromStorage.length;i++){  

    let row = document.createElement("tr");
    let cnCell = document.createElement("td");
    let pnCell = document.createElement("td");
    let actionscell = document.createElement("td");



    cnCell.innerHTML = cnFromStorage[i];
    pnCell.innerHTML = pnFromStorage[i];
    actionscell.innerHTML=`${delbtn.outerHTML} ${editbtn.outerHTML}`;
    





    // console.log(actionscell.getElementsByTagName('button'));
    actionscell.getElementsByTagName('button')[0].onclick = function () {
      
      // Shift the first item from the array.
      cnFromStorage.shift();
      pnFromStorage.shift();
      // Save the array back to localstorage.
      localStorage.setItem('cndata', JSON.stringify(cnFromStorage));
      localStorage.setItem('pndata', JSON.stringify(pnFromStorage));

      const table1=document.getElementById("table"); 
      table1.getElementsByTagName("tr")[0].remove();
    };














     actionscell.getElementsByTagName('button')[1].onclick = function () {
      // alert("Editing");
      modal.style.display = "block";
     };

     
    // actionscell.innerHTML=`${
      
      
    //   delbtn[i].outerHTML.onclick = function () {
    //   alert("dfas");
     
    
    // }} 
    
    // ${editbtn.outerHTML}
    
    // `;
    
    row.appendChild(cnCell);
    row.appendChild(pnCell);
    row.appendChild(actionscell);


    document.getElementById("table").appendChild(row);
    // document.body.appendChild(delbtn);

    // let table1 = document.getElementById("table").appendChild(row);
    // let table2 = document.getElementById("wholetable").appendChild(table1);
    // document.body.appendChild(table2);

  }
  
}


// delbtn.addEventListener("click", function(){
//   alert("fayzz");
// })



// save.onclick = function save() {

// //contact name
// let cn = document.getElementById("name").value;

// //CONTACT PHONE NUMBER
// let pn = document.getElementById("pn").value;

// // let actionsbuttons = document.createElement(`
// // <button></button>
// // `);
// let actionsbuttons=`
// <button id="edit" >Edit</button>
// <button id="del" >Delete</button>
// `


//   let row = document.createElement("tr");
//   let cnCell = document.createElement("td");
//   let pnCell = document.createElement("td");
//   let actionscell = document.createElement("td");

  
//   cnCell.innerHTML = cn ;
//   pnCell.innerHTML = pn;
//   actionscell.innerHTML = actionsbuttons;
  
//   row.appendChild(cnCell);
//   row.appendChild(pnCell);
//   row.appendChild(actionscell);

//   document.getElementById("table").appendChild(row);
//   document.getElementById("name").value='';
//   document.getElementById("pn").value='';
  
// }