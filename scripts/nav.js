// Capture menu option selected and direct based on choice made
function menuOption(e){
    var option = e.target;
    var meals = document.querySelectorAll('.recipe-card');

    if (option.textContent === "Your stats"){
        changeStats();
    }
    else if (option.textContent === "Your goal"){
        changeGoal();
    }
    else if (option.textContent === "Breakfast"){
        for(i = 0; i < meals.length; i++){
            if(meals[i].classList.contains('breakfast')){
                meals[i].classList.remove('d-none');
            }
            else {
                meals[i].classList.add('d-none');
            };
        };
        document.getElementById('category').textContent = "Breakfast";
    }
    else if (option.textContent === "Lunch"){
        for(i = 0; i < meals.length; i++){
            if(meals[i].classList.contains('lunch')){
                meals[i].classList.remove('d-none');
            }
            else {
                meals[i].classList.add('d-none');
            };
        };
        document.getElementById('category').textContent = "Lunch";
    }
    else if (option.textContent === "Dinner"){
        for(i = 0; i < meals.length; i++){
            if(meals[i].classList.contains('dinner')){
                meals[i].classList.remove('d-none');
            }
            else {
                meals[i].classList.add('d-none');
            };
        };
        document.getElementById('category').textContent = "Dinner";
    }
    else if (option.textContent === "Snacks"){
        for(i = 0; i < meals.length; i++){
            if(meals[i].classList.contains('snack')){
                meals[i].classList.remove('d-none');
            }
            else {
                meals[i].classList.add('d-none');
            };
        };
        document.getElementById('category').textContent = "Snacks";
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