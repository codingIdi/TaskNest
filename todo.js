const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const undo = document.getElementById("undo-button");

    
 
let lastDeletedTask = null; // Store the last deleted task
let undoTimer;
let timerDuration = 5000;




function AddTask(){
    if(inputBox.value === ''){
        inputBox.placeholder = "Enter a task"; // Temporarily change placeholder to "hello"
        
        // Set a timeout to reset the placeholder back to "Start" after 3 seconds
        setTimeout(()=>{
        inputBox.placeholder = "Start";
        
    }, 1000);
}
 
    else{
        let li = document.createElement("li");//creats html element with tagname li//
        li.innerHTML = inputBox.value; //wtv text will be added in input, will be added in li.innerhtml//
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
     
    
    
      
        
    inputBox.value = ''; //value will be empty after being added//
    saveData();
} 


listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") { // Check or uncheck task
        e.target.classList.toggle("checked");


    } else if (e.target.tagName === "SPAN") { // Click on delete button
        lastDeletedTask = e.target.parentElement.outerHTML; // Store deleted task
        e.target.parentElement.remove();
        saveData(); // Update storage
        showUndoButton(); // Show undo button when task is deleted

        
    }
}, false);



// Function to show the undo button
function showUndoButton() {
    undo.style.display = "block"; // Show the button
    undo.style.opacity = "1"; // Fade in
    undo.style.transform = "scale(1.1)"; // Scale up
    clearTimeout(undoTimer); // Clear any existing timer
    undoTimer = setTimeout(hideUndoButton, timerDuration); // Set a new timer to hide the button
}



// Function to hide the undo button
function hideUndoButton() {
    undo.style.opacity = "0"; // Fade out
    undo.style.transform = "scale(0.8)"; // Scale back to original size

    // Use a timeout to wait for the fade out before setting display to none
    setTimeout(() => {
        undo.style.display = "none"; // Hide the button after fading out
    }, 500); // Match this time with the CSS transition duration

}

// Undo button functionality
undo.addEventListener("click", function() {
    if (lastDeletedTask) {
        listcontainer.insertAdjacentHTML("beforeend", lastDeletedTask); // Add deleted task back to list
        lastDeletedTask = null; // Clear the storage
        hideUndoButton(); // Hide the undo button after restoring the task
        saveData(); // Update storage
    } 
    
});





function updateTime(){
    const now = new Date();

    const dateOptions = { month: 'long', day: 'numeric', year:'numeric'};
    document.getElementById("date").textContent = now.toLocaleDateString(undefined, dateOptions);

}
setInterval(updateTime, 1000);
updateTime();


function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}
function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data") || "";

    // Reattach event listeners to each delete button (span)
    listcontainer.querySelectorAll("li").forEach(li => {
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
}
showTask();