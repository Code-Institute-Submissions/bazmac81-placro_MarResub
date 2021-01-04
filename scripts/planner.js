function pcCalc(){
    var statsPc = document.getElementsByClassName('stat_pc');

    for (i = 0; i < stats.length; i++){
        allocPc[i] = Math.round((allocStats[i] / stats[i]) * 100);
        statsPc[i].firstChild.textContent = allocPc[i] + '%';
    }

    //mealPc();
};

function loadRecipeData(recipeData){
    var recipeContainer = document.getElementById('recipe-card-container');
    var recipeList = '';

    for (i = 0; i < recipeData.length; i++){
        recipeList += 
        '<div class="recipe-card col-10 col-md-5 mx-auto '+recipeData[i].mealType+'">'+
            '<div class="row no-gutters">'+
                '<div class="col-9 col-sm-10">'+
                    '<h3 class="heading">'+ recipeData[i].recipeName +'</h3>'+
                '</div>'+
                '<div class="col-3 col-sm-2">'+
                    '<button class="btn recipeBtn add">Add</button>'+
                '</div>'+
            '</div>'+
            '<div class="row no-gutters">'+
                '<div class="col-5">'+
                    '<div class="meal-img">'+
                    '</div>'+
                '</div>'+
                '<div class="col-7">'+
                    '<div class="row">'+
                        '<div class="middle col-5 mx-auto">'+
                            '<span class="meal-stat meal-cals">'+recipeData[i].mealStats.calories+'</span>g'+
                        '</div>'+
                        '<div class="middle col-5 mx-auto">'+
                            '<span class="meal-stat meal-protein">'+recipeData[i].mealStats.protein+'</span>g'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="middle col-5 mx-auto">'+
                            '<span class="meal-stat meal-carb">'+recipeData[i].mealStats.carbs+'</span>g'+
                        '</div>'+
                        '<div class="middle col-5 mx-auto">'+
                            '<span class="meal-stat meal-fat">'+recipeData[i].mealStats.fat+'</span>g'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    }
    recipeContainer.innerHTML = recipeList;
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

function readRecipeFile(file, callback){
    var fileReq = new XMLHttpRequest();
    
    fileReq.open('GET', file, true);
    fileReq.onreadystatechange = function(){
        if(fileReq.readyState === 4 && fileReq.status === 200){
            callback(fileReq.responseText);
        };
    };
    fileReq.send(null);
};

function manageMeal(){
    var manageMeal = document.getElementsByClassName('recipeBtn');
    for (i = 0; i < manageMeal.length; i++){
        manageMeal[i].addEventListener('click', function(e){
            mealAddRemove(e);
        });
    };
};

var allocStats = [0, 0, 0, 0];
var allocPc = [0, 0, 0, 0];

window.addEventListener('load', readRecipeFile("data/recipes.JSON", function(text){
    var data = (JSON.parse(text));
    loadRecipeData(data);
    manageMeal();
}));
