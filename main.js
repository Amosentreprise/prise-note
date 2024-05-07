//effet loading 

window.addEventListener("load", ()=>{
    setTimeout(() => {
    const val = document.querySelector(".notes-app");
    val.classList.add("block")
    val.classList.remove("hidden")

    const load = document.querySelector(".load");
    load.classList.add("hidden")
 }, 1000);
})


//Mode light/night
const mode = document.getElementById("mode");
const themeSwitch = ()=> {
    if(document.documentElement.classList.contains("dark")){
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light")

       

         mode.setAttribute("class", "ri-moon-fill" ) 
         buttonMode.classList.add("text-black")
         buttonMode.classList.remove("text-white")
        return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark")
    mode.setAttribute("class", "ri-sun-fill" ) 
    buttonMode.classList.add("text-white")
    buttonMode.classList.remove("text-black")
}
const buttonMode = document.getElementById("buttonMode");
buttonMode.addEventListener("click", ()=>{
    themeSwitch();
})


let isUpdate = false;
let updateID;
//Modal form pour l'enregistremnt des notes
 const addButton = document.getElementById('addButton');
 const closeButton = document.getElementById('closeButton');
 const addform = document.getElementById('addform');
 const formTitle = document.getElementById('formTitle');
 addButton.addEventListener("click", ()=>{
     addform.classList.remove("hidden");
     addform.classList.add("flex");
     
 })


 //Enregistrement des données dans le localstorage
 
  const addNote = document.getElementById("addNote");
  const titleNote = document.getElementById("titleNote");
  const descriptionEl = document.getElementById("description");


  const notes = JSON.parse(localStorage.getItem("notes") || "[]")

 

  const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]
  addNote.addEventListener("click", (e)=>{
      e.preventDefault();
      let noteTitle = titleNote.value;
      let noteDesc  = descriptionEl.value;    

      if(noteDesc && noteDesc){
          let dateObject = new Date();
          let month = months[dateObject.getMonth()];
          let day = dateObject.getDate();
          let year = dateObject.getFullYear()
          
          let noteInfo = {
              title : noteTitle,
              description: noteDesc,
              date:`Le ${day} ${month} ${year}`,
          }
          
          if(!isUpdate){
            
          notes.push(noteInfo);

          }else{
           isUpdate = false;
          notes[updateID] = noteInfo;
          }
 
          localStorage.setItem("notes", JSON.stringify(notes))
          closeButton.click();
          showNotes();
      }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Merci de renseigner les champs 🙂",
           
                
          });
      }
      

  })
  closeButton.addEventListener("click", ()=>{
    isUpdate = false;
   

    formTitle.innerHTML = "Ajouter une note",
    titleNote.value  = "";
    descriptionEl.value = "";

    addform.classList.add("hidden");
    addform.classList.remove("flex");
    
})

 

  //Affichages des notes
  function createNoteElement(note, index) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("lg:w-[30%]","sm:w-[80%]", "md:w-[40%]", "rounded-lg", "bg-white", "p-2");

    noteElement.innerHTML = `
        <h2 class="text-center font-[600] uppercase py-1">${note.title}</h2>
        <p class="">${note.description}</p>
        <div class="border-t-2 border-slate-200 py-2">
            <div class="relative flex justify-between w-full">
                <p>${note.date}</p>
                <button onmouseenter="showMenu(this)" class="text-xl font-bold" id="more"><i class="ri-more-line"></i></button>
                <div onmouseleave="hideMenu(this)"  class="setting hidden absolute justify-center items-center bg-white transform transition ease-linear duration-700 scale-75 z-20 -right-2 -bottom-2  shadow-md">
                    <div onclick="deleteNote(${index})" class="w-full flex items-center gap-3 py-2 text-sm px-1 cursor-pointer hover:bg-slate-200">
                        <span class="text-primary text-xl"><i class="ri-delete-bin-line"></i></span>
                        <span>Supprimer</span>
                    </div>
                    <div onclick ="updateNote(${index}, '${note.title}','${note.description}')" class="w-full flex items-center gap-3 py-2 text-sm px-1 cursor-pointer hover:bg-slate-200">
                        <span class="text-blue-500 text-xl"><i class="ri-edit-fill"></i></span>
                        <span>Modifier</span>
                    </div>
                </div> 
            </div>                           
        </div>
    `;
    
    return noteElement;
}
const noteID = document.getElementById("notes");

function showNotes() {
    noteID.innerHTML = ""; // Efface le contenu existant
    if (notes.length === 0) {
        const emptyMessageContainer = document.createElement("div");
        emptyMessageContainer.classList.add("w-[80%]", "m-auto", "flex", "flex-col", "items-center", "justify-center");

        const emptyMessageText = document.createElement("p");
        emptyMessageText.textContent = "Aucune note disponible pour le moment.";
        emptyMessageContainer.classList.add("dark:text-white", "text-black", "font-bold", "text-2xl", "text-blue-500")
        const emptyMessageImage = document.createElement("img");
        emptyMessageImage.src = "./assets/animation.gif"; 

        emptyMessageContainer.appendChild(emptyMessageImage);
        emptyMessageContainer.appendChild(emptyMessageText);
       

        noteID.appendChild(emptyMessageContainer);
    } else{
        notes.forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            noteID.appendChild(noteElement);
        });


    }
   
}
showNotes();

function showMenu(elem) {
    
    const noteElement = elem.parentElement;  // Trouve l'élément parent de la note
    console.log(noteElement.querySelector(".setting")) 
    const element = noteElement.querySelector(".setting") // Cible le menu setting dans cette note
    element.classList.remove("hidden")
    
    
}

function hideMenu(elem) {
    const noteElement = elem.parentElement;  // Trouve l'élément parent de la note
    console.log(noteElement.querySelector(".setting")) 
    const element = noteElement.querySelector(".setting") // Cible le menu setting dans cette note
    element.classList.add("hidden")
        
}

//delete MENU
function deleteNote(id) {
    console.log(id)
    notes.splice(id, 1);
    
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
    
}

//update MENU
function updateNote(noteId, title, description){
    isUpdate = true;
    updateID = noteId;
    addButton.click()
    formTitle.innerHTML = "Mise à jour de la note",
    titleNote.value  = title;
    descriptionEl.value = description;
    
        
}


