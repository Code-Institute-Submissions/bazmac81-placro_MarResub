// Capture menu option selected and direct based on choice made
function menuOption(e){
    var option = e.target.textContent;
    e.preventDefault();

    if (option === "Your stats" || option === "Your goal"){
        changeStats();
        changeGoal();
    }
    else if((option === "Breakfast" || option === "Lunch" || option === "Dinner" || option === "Snacks") && window.location.pathname !== ('/planner.html')){
        window.sessionStorage.setItem("menu", option);
        if(window.location.pathname === '/mealplan.html'){
            completeMealPlan = JSON.stringify(mealPlan);
            window.sessionStorage.setItem('mealPlan', completeMealPlan);
        };
        window.location.assign('../planner.html');
    }
    else if((option === "Breakfast" || option === "Lunch" || option === "Dinner" || option === "Snacks") && window.location.pathname === ('/planner.html')){
        filterRecipes(option);
    }
    else if(option === "Meal plan"){
        if(window.location.pathname === ('/planner.html')){
            completeMealPlan = JSON.stringify(mealPlan);
            window.sessionStorage.setItem('mealPlan', completeMealPlan);
        }
        window.location.assign('../mealplan.html');
    };
};

// Load Stats form with user entered data ready to change
function changeStats(){
    var statsForm = document.getElementById('stats');
    var fields = statsForm.getElementsByClassName('form-control');

    for(i = 0; i < fields.length; i++){
        fields[i].value = inputs[i];
    };
};

// Load Goals form with user data ready to change
function changeGoal(){
    var goalForm = document.getElementsByName('goals');

    for(i = 0; i < goalForm.length; i++){
        if(goalForm[i].value === modifiers[1] && goalForm[i].checked === false){
            goalForm[i].checked = true;
        } else if (goalForm[i].value !== modifiers[1] && goalForm[i].checked === true){
            goalForm[i].checked = false;
        };
    };
};

// Take the navmenu form stats to recalculate and display new figures
function updateStats(e){
    var button = e.target;
    var closemodal = '#' + button.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        
    //Re-calculate the numbers and write them to memory
    statsCapture();
    submitStats(inputs, modifiers, stats);

    //Write the numbers to the page
    writeStats();

    //Update % sections if the relevant page is being used
    if(window.location.pathname === "/mealplan.html" || window.location.pathname === "/planner.html"){
        pcCalc();
    };

    //Close the BS Modal window
    $(closemodal).modal('toggle')
};

var menu = document.getElementById('navbarMenu');
var statsChangeSubmit = document.getElementById('update-stats');
var goalsChangeSubmit = document.getElementById('update-goal');

menu.addEventListener('click', function(e){
    menuOption(e);
});
statsChangeSubmit.addEventListener('click', function(e) {
    updateStats(e);
});
goalsChangeSubmit.addEventListener('click', function(e){
    updateStats(e)
});