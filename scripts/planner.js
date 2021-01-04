function pcCalc(){
    var statsPc = document.getElementsByClassName('stat_pc');

    for (i = 0; i < stats.length; i++){
        allocPc[i] = Math.round((allocStats[i] / stats[i]) * 100);
        statsPc[i].firstChild.textContent = allocPc[i] + '%';
    }

    //mealPc();
};

function mealPc(){
    var m = 'breakfast';

    for (i = 0; i < meal.length; i++){
        if(m === 'breakfast'){
            meal[i][j]
        }
        else if(m === 'lunch') {

        }
        else if(m === 'dinner') {

        }
        else {

        };
    };
};

function mealCalc(operator, rStats){
    console.log(rStats);
    for(i = 0; i < rStats.length; i++){
        if(operator === "add"){
            console.log(rStats[i].value);
            allocStats[i] += parseInt(rStats[i].textContent);
        }
        else {
            allocStats[i] -= parseInt(rStats[i].textContent);
        };
    };
};

function mealAddRemove(e){
    var recipeBtn = e.target;
    var rBtnClass = recipeBtn.getAttribute('class').split(' ');
    var replaceClass = '';
    var recipeStats = recipeBtn.parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    
    // Toggle button status and add / remove meal based on current state
    for (i = 0; i < rBtnClass.length; i++){
        if(rBtnClass[i] === "add"){
            rBtnClass[i] = "rem";
            for(j = 0; j < rBtnClass.length; j++){
                replaceClass += rBtnClass[j] + ' ';
            }
            mealCalc('add', recipeStats);
            recipeBtn.setAttribute('class', replaceClass.trim());
            recipeBtn.textContent = "Remove";
            break;
        }
        else if(rBtnClass[i] === "rem"){
            rBtnClass[i] = "add";
            for(j = 0; j < rBtnClass.length; j++){
                replaceClass += rBtnClass[j] + ' ';
            }
            mealCalc('sub', recipeStats);
            recipeBtn.setAttribute('class', replaceClass.trim());
            recipeBtn.textContent = "Add";
            break;
        };
    };

    pcCalc();
};

var allocStats = [0, 0, 0, 0];
var allocPc = [0, 0, 0, 0];
var recipeCardHTML = [];

window.addEventListener('load', pcCalc, false);

var fileReq = new XMLHttpRequest();
fileReq.onload = function(){
    if(fileReq.status === 200){
        recipeData = JSON.parse(fileReq.responseText);
        console.log(recipeData);
    };
};
fileReq.open('GET', "data/recipes.JSON");
fileReq.send(null);


var manageMeal = document.getElementsByClassName('recipeBtn');
for (i = 0; i < manageMeal.length; i++){
    manageMeal[i].addEventListener('click', function(e){
        mealAddRemove(e);
    });
};
