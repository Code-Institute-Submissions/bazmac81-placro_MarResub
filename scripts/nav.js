/*jshint esversion: 6 */
var menu = document.getElementById('navbarMenu');
var statsChangeSubmit = document.getElementById('update-stats');
var goalsChangeSubmit = document.getElementById('update-goal');

// Capture menu option selected and direct based on choice made
function menuOption(e){
    let option = '';
    
    if (e.target){
        option = e.target.textContent;
    }
    else{
        option = e;
    }

    window.sessionStorage.setItem("menu", option);

    if (option === "Your stats" || option === "Your goal"){
        changeStats();
        changeGoal();
    }
    else if((option === "Breakfast" || option === "Lunch" || option === "Dinner" || option === "Snacks") && (window.location.pathname !== ('/planner.html') || window.location.pathname !== ('/placro/planner.html'))){
        storeStats();
        window.location.assign('./planner.html');
    }
    else if((option === "Breakfast" || option === "Lunch" || option === "Dinner" || option === "Snacks") && (window.location.pathname !== ('/planner.html') || window.location.pathname !== ('/placro/planner.html'))){
        filterRecipes(option);
    }
    else if(option === "Meal plan"){
        storeStats();
        window.location.assign('./mealplan.html');
    }
}

// Load Stats form with user entered data ready to change
function changeStats(){
    let statsForm = document.getElementById('stats');
    let fields = statsForm.getElementsByClassName('form-control');

    let keys = Object.keys(userStats);
    for(let i = 0; i < fields.length; i++){
        fields[i].value = userStats[keys[i]];
    }
}

// Load Goals form with user data ready to change
function changeGoal(){
    let goalForm = document.getElementsByName('goals');

    for(let i = 0; i < goalForm.length; i++){
        if(goalForm[i].value === modifiers.goal && goalForm[i].checked === false){
            goalForm[i].checked = true;
        } else if (goalForm[i].value !== modifiers.goal && goalForm[i].checked === true){
            goalForm[i].checked = false;
        }
    }
}

// Take the navmenu form stats to recalculate and display new figures
function updateStats(e){
    var button = e.target;
    var closemodal = '#' + button.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        
    //Re-calculate the numbers and write them to memory
    let success = statsCapture();
    submitStats();

    //Write the numbers to the page
    writeStats();

    //Update % sections if the relevant page is being used
    if(window.location.pathname === "/mealplan.html" || window.location.pathname === "/planner.html" || window.location.pathname === "/placro/planner.html" || window.location.pathname === "/placro/mealplan.html"){
        pcCalc();
        mealPcCalc();
    }
    //Close the BS Modal window
    if (success === 0){
        $(closemodal).modal('toggle');
    }
}

menu.addEventListener('click', function(e){
    menuOption(e);
});
statsChangeSubmit.addEventListener('click', function(e) {
    updateStats(e);
});
goalsChangeSubmit.addEventListener('click', function(e){
    updateStats(e);
});