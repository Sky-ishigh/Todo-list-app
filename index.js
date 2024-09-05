let date= new Date().toDateString()
document.getElementById("date").innerText= date

let itemsArray= localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")): []
// If items already exist in localstorage then we initialize the "itemsArray" with it else as an empty array

document.getElementById("enter").addEventListener("click", ()=>{
    const item = document.getElementById("item")
    createItem(item)
})

function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()  //used to reload the current page on call
}

function displayItems(){
    let items=" "
    for (let i=0; i<itemsArray.length; i++){
        items+=`<div class="todos">
                    <div class="input-controller">
                        <textarea class="text-fields" rows="2" maxlength="100" disabled >${itemsArray[i]}</textarea>
                        <div class="edit-options">
                            <i class="fa-solid fa-check deleteBtn" disabled></i>
                            <i class="fa-solid fa-pen-to-square editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`

    }
    document.getElementById("to-do-list").innerHTML= items
    
    activateDeleteListeners()
    activateEditListeners()
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
      dB.addEventListener("click", () => { 
            itemsArray.splice(i,1)
            localStorage.setItem('items', JSON.stringify(itemsArray))
            location.reload()     
        })
    })
}

function activateEditListeners(){
    let editorOptions = document.querySelectorAll(".edit-options")
    let editBtn = document.querySelectorAll(".editBtn")
    let updateController = document.querySelectorAll(".update-controller")
    let textFields= document.querySelectorAll(".text-fields")
    let saveBtn=document.querySelectorAll(".saveBtn")
    let cancelBtn=document.querySelectorAll(".cancelBtn")

    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => { 
          updateController[i].style.display = "block";
          textFields[i].disabled = false;
          editorOptions[i].style.display= "none";
        })
    })

    saveBtn.forEach((sB, i)=>{
        sB.addEventListener("click", ()=>{
            itemsArray[i] = textFields[i].value
            localStorage.setItem('items', JSON.stringify(itemsArray))
            location.reload()
            updateController[i].style.display ="none";
        })
    })

    cancelBtn.forEach((cB, i) =>{
        cB.addEventListener("click", ()=>{
            updateController[i].style.display ="none";
            location.reload()
        })
    })

}

window.onload= ()=>{
    displayItems()
}
