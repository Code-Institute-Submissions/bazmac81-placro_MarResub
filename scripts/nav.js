function menuOption(e){
    var option = e.target;

    console.log(option.textContent);

    if (option.textContent === "Your stats"){
        changeStats();
    }
    else if (option.textContent === "Your goal"){
        changeGoal();
    }
};

function changeStats(){
    var statsForm = document.getElementById('stats');
    var fields = statsForm.getElementsByClassName('form-control');

    console.log(fields);

    for(i = 0; i < fields.length; i++){
        fields[i].value = inputs[i];
    };
};

function changeGoal(){
    var goalForm = document.getElementsByName('goals');

    console.log(goalForm);
    console.log(modifiers);

    for(i = 0; i < goalForm.length; i++){
        if(goalForm[i].value === modifiers[1] && goalForm[i].checked === false){
            goalForm[i].checked = true;
        } else if (goalForm[i].value !== modifiers[1 && goalForm[i].checked === true]){
            goalForm[i].checked = false;
        };
    };
};

var menu = document.getElementById('navbarMenu');

menu.addEventListener('click', function(e){
    menuOption(e);
});

console.log(menu);