function menuOption(e){
    var option = e.target;

    console.log(option.textContent);

    if (option.textContent === "Your stats"){
        changeStats();
    }
    else if (option.textContent === "Your Goal"){
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

};

var menu = document.getElementById('navbarMenu');

menu.addEventListener('click', function(e){
    menuOption(e);
});

console.log(menu);