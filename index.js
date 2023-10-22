import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js'


const firebaseConfig = {
    // apiKey: "AIzaSyCmWfvheuMdAhaeQ4hOM4jaM4HJrW1H8FM",
    // authDomain: "fruitfinder-fd94b.firebaseapp.com",
    databaseURL: "https://fruitfinder-fd94b-default-rtdb.firebaseio.com"
    // projectId: "fruitfinder-fd94b",
    // storageBucket: "fruitfinder-fd94b.appspot.com",
    // messagingSenderId: "116443698159"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
        let shoppingListArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()

        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentShoppingListItem = shoppingListArray[i]
            let currentShoppingListItemID = currentShoppingListItem[0]
            let currentShoppingListItemValue = currentShoppingListItem[1]
            
            appendItemtoShoppingListEl(currentShoppingListItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here...yet"
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function appendItemtoShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let dbLocation = ref(database, `shoppingList/${itemID}`)
        remove(dbLocation)
    })

    shoppingListEl.append(newEl)
}

function deleteItem() {

}