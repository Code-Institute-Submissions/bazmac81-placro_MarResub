// Capture menu option selected and direct based on choice made
function menuOption(e){
    var option = e.target;

    if (option.textContent === "Your stats"){
        changeStats();
    }
    else if (option.textContent === "Your goal"){
        changeGoal();
    }
    else {

    }
};

// Load Stats form with user entered data ready to change
function changeStats(){
    var statsForm = document.getElementById('stats');
    var fields = statsForm.getElementsByClassName('form-control');

    console.log(fields);

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

function updateStats(e){
    var button = e.target;
    var closemodal = '#' + button.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        
    //Re-calculate the numbers and write them to memory
    statsCapture();
    submitStats(inputs, stats, modifiers);

    //Write the numbers to the page
    writeStats();

    //Close the BS Modal window
    $(closemodal).modal('toggle')
};

var menu = document.getElementById('navbarMenu');
var statsChangeSubmit = document.getElementById('update-goal');
var goalsChangeSubmit =  document.getElementById('update-stats');

menu.addEventListener('click', function(e){
    menuOption(e);
});
statsChangeSubmit.addEventListener('click', function(e) {
    updateStats(e);
});
goalsChangeSubmit.addEventListener('click', updateStats, false);