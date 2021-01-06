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
                '<div class="col-sm-12 col-md-7">'+
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
            '<div class="row no-gutters d-none">'+
                '<div class="col-10 mx-auto meal-desc">'+
                    recipeData[i].description+
                '</div>'+
            '</div>'+
            '<div class="row no-gutters d-none">'+
                '<div class="col-10 mx-auto meal-ings">'+
                    recipeData[i].ingredients+
                '</div>'+
            '</div>'+
        '</div>';
    }
    recipeContainer.innerHTML = recipeList;
    
    //check to see if mealPlan has data - update 
    var mealPlanRec = document.querySelectorAll('.heading');
    console.log(mealPlanRec);
    if(window.sessionStorage.getItem('mealPlan')){
        mealPlan = JSON.parse(window.sessionStorage.getItem('mealPlan'));
            console.log(mealPlan);

        for (i = 0; i < mealPlanRec.length; i++){
            for(j = 0; j < mealPlan.length; j++){
                if(mealPlanRec[i].textContent === mealPlan[j].name){
                    mealPlanRec[i].parentNode.nextSibling.firstChild.classList.remove('add');
                    mealPlanRec[i].parentNode.nextSibling.firstChild.classList.add('rem');
                    mealPlanRec[i].parentNode.nextSibling.firstChild.textContent = 'Remove';
                }
            };
        };
    }

    //only show recipes based on menu choice that loaded the page
    filterRecipes(menuChoice);
};

// Refilter recipes by meal type based on menu selection
function filterRecipes(opt){
    var meals = document.querySelectorAll('.recipe-card');

    document.getElementById('category').textContent = opt; //Set the page header to match the menu option selected

    console.log(opt);

    if (opt === 'Snacks') {
        opt = 'snack'; // De-plural menu option to allow class search
    }

    // Check recipes and remove d-none from selected category, hide remaining. If already active do nothing
    for(i = 0; i < meals.length; i++){
        if(meals[i].classList.contains(opt.toLowerCase()) === true && meals[i].classList.contains('d-none') === true){
            meals[i].classList.remove('d-none');
        }
        else if(meals[i].classList.contains(opt.toLowerCase()) !== true && meals[i].classList.contains('d-none') !== true){
            meals[i].classList.add('d-none');
        };
    };
}

// Calculate % of calories allocated to each meal type
function mealPcCalc(rs, mType, operator){
    mealPcGuage = document.getElementsByClassName('meal_pc');

    // Perform operation based on adding or removing meal
    if (operator === 'add'){
        mealStats[mType] += parseInt(rs.textContent, 10);
    }
    else if (operator === "sub" && mealStats[mType] > 0) {
        mealStats[mType] -= parseInt(rs.textContent, 10);
    }
    else {
        mealStats[mType] = 0;
    }

    // Write meal % to HTML
    for (i = 0; i < mealPcGuage.length; i++){
        mealPc[i] = Math.round((mealStats[i] / planStats[0]) * 100);
        mealPcGuage[i].textContent = mealPc[i];
    };
};

function mealCalc(operator, rStats, rType){
    for(i = 0; i < rStats.length; i++){
        if(operator === "add"){
            planStats[i] += parseInt(rStats[i].textContent,10) || rStats[i];
        }
        else {
            planStats[i] -= parseInt(rStats[i].textContent,10) || rStats[i];
        };
    };

    switch (true){
        case rType.classList.contains('breakfast') && operator === "add":
            mealPcCalc(rStats[0], 0, 'add');
            break;
        case rType.classList.contains('lunch') && operator === "add":
            mealPcCalc(rStats[0], 1, 'add');
            break;
        case rType.classList.contains('dinner') && operator === "add":
            mealPcCalc(rStats[0], 2, 'add');
            break;
        case rType.classList.contains('snack') && operator === "add":
            mealPcCalc(rStats[0], 3, 'add');
            break;
        case rType.classList.contains('breakfast') && operator === "sub":
            mealPcCalc(rStats[0], 0, 'sub');
            break;
        case rType.classList.contains('lunch') && operator === "sub":
            mealPcCalc(rStats[0], 1, 'sub');
            break;
        case rType.classList.contains('dinner') && operator === "sub":
            mealPcCalc(rStats[0], 2, 'sub');
            break;
        case rType.classList.contains('snack') && operator === "sub":
            mealPcCalc(rStats[0], 3, 'sub');
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

//Add recipe details to meal plan to carry over into Meal Plan page
function addToPlan(rCard, s){
    
    var name = rCard.querySelector('.heading').textContent;
    var type = '';
    var cals = rCard.querySelector('.meal-cals').textContent;
    var prot = rCard.querySelector('.meal-protein').textContent;
    var carb = rCard.querySelector('.meal-carb').textContent;
    var fat = rCard.querySelector('.meal-fat').textContent;
    var ing = rCard.querySelector('.meal-ings').textContent;
    var desc = rCard.querySelector('.meal-desc').textContent;
    
    if(s === 'add'){
        if(rCard.classList.contains('breakfast')){
            type = 'breakfast';
        } else if (rCard.classList.contains('lunch')) {
            type = 'lunch';
        } else if (rCard.classList.contains('dinner')) {
            type = 'dinner';
        } else if (rCard.classList.contains('snack')) {
            type = 'snack';
        };
        mealPlan.push(new meal(name, type, cals, prot, carb, fat, ing, desc)); 
        console.log(mealPlan);
    }
    else {
        for(i = 0; i <= mealPlan.length; i++){
            if(mealPlan[i].name === name){
                mealPlan.splice(i, 1);
            }
        };
        console.log(mealPlan);
    };
}

function mealAddRemove(e){
    var recipeBtn = e.target;
    var recipeCard = recipeBtn.parentNode.parentNode.parentNode;
    var recipeStats = recipeBtn.parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    var state;

    // Toggle button status and add / remove meal based on current state
    if(recipeBtn.classList.contains('add')){
        mealCalc('add', recipeStats, recipeCard);
        toggleRecipeBtn(recipeBtn, 'add', 'rem', 'Remove');
        state = 'add';
    }
    else if(recipeBtn.classList.contains('rem')){    
        mealCalc('sub', recipeStats, recipeCard);
        toggleRecipeBtn(recipeBtn, 'rem', 'add', 'Add');
        state = 'rem';
    };
    
    addToPlan(recipeCard, state);
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

//Reset the plan category and update the trackers % values back to zero
function resetMeal(){
    var selMeals = document.querySelectorAll('.rem');
    var selMealStats = [];
    var mealStatsAdjust = [0, 0, 0, 0];
    var remMealType = [];

    // Get the macro stats for each recipe added to the meal plan
    for (i = 0; i < selMeals.length; i++){
        selMealStats[i] = selMeals[i].parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    };

    // Get total macros of all selected recipes
    for(x = 0; x < 4; x++){
        for (y = 0; y < selMealStats.length; y++){
            mealStatsAdjust[x] += parseInt(selMealStats[y][x].textContent, 10);
        };
    };

    // Reset recipe button states back to Add
    for (i = 0; i < selMeals.length; i++){
        toggleRecipeBtn(selMeals[i], 'rem', 'add', 'Add');
    };

    mealCalc('sub', mealStatsAdjust, remMealType);
    pcCalc();
}

//Plans refer to cals, prot, carbs, fat stats
var planStats = [0, 0, 0, 0];
var planPc = [0, 0, 0, 0];

//Meals refer to Breakfast, Lunch, Dinner, Snacks
var mealStats = [0, 0, 0, 0];
var mealPc = [0, 0, 0, 0, 0];
function  meal (name, type, cals, prot, carb, fat, ing, desc){
    this.name = name;
    this.type = type;
    this.calories = cals;
    this.protein = prot;
    this.carbs = carb;
    this.fat = fat;
    this.ingredients = ing;
    this.desc = desc;     
};
var mealPlan = [];

if (window.location.pathname === "../planner.html"){
    var resetCat = document.getElementById('resetBtn');
    resetCat.addEventListener('click', resetMeal, false);
};

if(window.location.pathname === "/planner.html"){
    window.addEventListener('load', readRecipeFile("data/recipes.JSON", function(text){
        var data = (JSON.parse(text));
        loadRecipeData(data);
        manageMeal();
    }));
};
