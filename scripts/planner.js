function pcCalc(){
    var statsPc = document.getElementsByClassName('stat_pc');

    if(planStats[0] > 0){
        for (i = 0; i < stats.length; i++){
            planPc[i] = Math.round((planStats[i] / stats[i]) * 100);
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        }
    }
    else {
       for (i = 0; i < stats.length; i++){
            planPc[i] = 0;
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        } 
    }
    //mealPc();
};

function loadRecipeData(recipeData){
    var recipeContainer = document.getElementById('recipe-card-container');
    var recipeList = '';
    var menuChoice = window.sessionStorage.getItem('menu');

    for (i = 0; i < recipeData.length; i++){
        recipeList += 
        '<div class="recipe-card col-10 col-md-5 mx-auto d-none '+recipeData[i].mealType+'">'+
            '<div class="row no-gutters">'+
                '<div class="col-9 col-sm-10">'+
                    '<h3 class="heading">'+ recipeData[i].recipeName +'</h3>'+
                '</div>'+
                '<div class="col-3 col-sm-2">'+
                    '<button class="btn recipeBtn add">Add</button>'+
                '</div>'+
            '</div>'+
            '<div class="row no-gutters">'+
                '<div class="d-sm-none col-md-5">'+
                    '<div class="meal-img">'+
                    '</div>'+
                '</div>'+
                '<div class="col-12 col-md-7">'+
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
    console.log(menuChoice);
    filterRecipes(menuChoice);
};

function filterRecipes(opt){
    var meals = document.querySelectorAll('.recipe-card');
    
    document.getElementById('category').textContent = opt;

    if (opt === 'Snacks') {
        opt = 'snack';
    }
    for(i = 0; i < meals.length; i++){
        if(meals[i].classList.contains(opt.toLowerCase()) && meals[i].classList.contains('d-none') === true){
            meals[i].classList.remove('d-none');
        }
        else if(meals[i].classList.contains(opt.toLowerCase()) !== opt && meals[i].classList.contains('d-none') !== true){
            meals[i].classList.add('d-none');
        };
    };
    
}

function mealPcCalc(rs, mType, operator){
    mealPcGuage = document.getElementsByClassName('meal_pc');

    if (operator === 'add'){
        mealStats[mType] += parseInt(rs.textContent, 10);
    }
    else{
        mealStats[mType] -= parseInt(rs.textContent, 10);
    };

    mealPcGuage[0].textContent = mealPc.breakfast = Math.round((mealStats.breakfast / planStats[0]) * 100);
    mealPcGuage[1].textContent = mealPc.lunch = Math.round((mealStats.lunch / planStats[0]) * 100);
    mealPcGuage[2].textContent = mealPc.dinner = Math.round((mealStats.dinner / planStats[0]) * 100);
    mealPcGuage[3].textContent = mealPc.snack = Math.round((mealStats.snack / planStats[0]) * 100);

    console.log(mealStats, mealPc, planStats);
};

function mealCalc(operator, rStats, rType){
    for(i = 0; i < rStats.length; i++){
        if(operator === "add"){
            planStats[i] += parseInt(rStats[i].textContent,10);
        }
        else {
            planStats[i] -= parseInt(rStats[i].textContent,10);
        };
    };

    switch (true){
        case rType.classList.contains('breakfast') && operator === "add":
            mealPcCalc(rStats[0], 'breakfast', 'add');
            break;
        case rType.classList.contains('lunch') && operator === "add":
            mealPcCalc(rStats[0], 'lunch', 'add');
            break;
        case rType.classList.contains('dinner') && operator === "add":
            mealPcCalc(rStats[0], 'dinner', 'add');
            break;
        case rType.classList.contains('snack') && operator === "add":
            mealPcCalc(rStats[0], 'snack', 'add');
            break;
        case rType.classList.contains('breakfast') && operator === "sub":
            mealPcCalc(rStats[0], 'breakfast', 'sub');
            break;
        case rType.classList.contains('lunch') && operator === "sub":
            mealPcCalc(rStats[0], 'lunch', 'sub');
            break;
        case rType.classList.contains('dinner') && operator === "sub":
            mealPcCalc(rStats[0], 'dinner', 'sub');
            break;
        case rType.classList.contains('snack') && operator === "sub":
            mealPcCalc(rStats[0], 'snack', 'sub');
            break;
        default :
            break;
    }
};

function toggleRecipeBtn(btn, currentBtnClass, newBtnClass, btnText){
    btn.classList.remove(currentBtnClass);
    btn.classList.add(newBtnClass);
    btn.textContent = btnText;
};

function mealAddRemove(e){
    var recipeBtn = e.target;
    var recipeType = recipeBtn.parentNode.parentNode.parentNode;
    var recipeStats = recipeBtn.parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    
    // Toggle button status and add / remove meal based on current state
    if(recipeBtn.classList.contains('add')){
        mealCalc('add', recipeStats, recipeType);
        toggleRecipeBtn(recipeBtn, 'add', 'rem', 'Remove');
    }
    else if(recipeBtn.classList.contains('rem')){    
        mealCalc('sub', recipeStats, recipeType);
        toggleRecipeBtn(recipeBtn, 'rem', 'add', 'Add');
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
    pcCalc();
};

/*Reset the current meal categoery and update the trackers % values
function resetMeal(){
    var selMeals = document.querySelectorAll('.rem');
    var selMealStats = [];
    var mealStatsAdjust = [0, 0, 0, 0];

    for (i = 0; i < selMeals.length; i++){
        selMealStats[i] = selMeals[i].parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    };

    for(x = 0; x < 4; x++){
        for (y = 0; y < selMealStats.length; y++){
            mealStatsAdjust[x] += parseInt(selMealStats[y][x].textContent, 10);
        };
    };

    for (i = 0; i < selMeals.length; i++){
        toggleRecipeBtn(selMeals[i], 'rem', 'add', 'Add');
    };

    mealCalc('sub', mealStatsAdjust);
    pcCalc();
}
*/

var planStats = [0, 0, 0, 0];
var planPc = [0, 0, 0, 0];
var mealStats = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
};
var mealPc = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
};
var meals = {
    name = '',
    calories = '',
    protein = '',
    carbs = '',
    fat = '',
    ingredients = {
        ingredient = [],
        value = [],        
    }
};

/*
var resetCat = document.getElementById('resetBtn');
resetCat.addEventListener('click', resetMeal, false);
*/

window.addEventListener('load', readRecipeFile("data/recipes.JSON", function(text){
    var data = (JSON.parse(text));
    loadRecipeData(data);
    manageMeal();
}));
