//Plans refer to cals, prot, carbs, fat stats
var planPc = [0, 0, 0, 0];
var mealPc = [0, 0, 0, 0];

//Array to store users selected recipes
//var mealPlan = [];

function loadRecipeData(recipeData){
    var recipeContainer = document.getElementById('recipe-card-container');
    var recipeListHTML = '';
    var menuChoice = window.sessionStorage.getItem('menu');

    for (let i = 0; i < recipeData.length; i++){
        recipeListHTML += 
        '<div class="recipe-card col-11 col-md-5 mx-auto d-none '+recipeData[i].mealType+'">'+
            '<div class="row no-gutters">'+
                '<div class="col-8 col-sm-9">'+
                    '<h3 class="heading recipe-name">'+ recipeData[i].recipeName +'</h3>'+
                '</div>'+
                '<div class="col-4 col-sm-3">'+
                    '<button class="btn recipeBtn add">Add</button>'+
                '</div>'+
            '</div>'+
            '<div class="row no-gutters">'+
                '<div class="d-none d-sm-block col-sm-5">'+
                    '<div class="meal-img">'+
                        '<img src="assets/images/'+recipeData[i].mealType+'/'+recipeData[i].image+'" alt="'+recipeData[i].recipeName+'">'+
                    '</div>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-7">'+
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
            '<div class="row no-gutters d-none details">'+
                '<div class="col-11 mx-auto meal-desc">'+
                    recipeData[i].description+
                '</div>'+
            '</div>'+
            '<div class="row no-gutters d-none details">'+
                '<div class="col-11 mx-auto meal-ings">';
        /*console.log(recipeData[i].ingredients);
        for(let i = 0; i < recipeData[i].ingredients[i].length; i++){
            recipeData[i].ingredients;
        };*/
        recipeListHTML +=
                '</div>'+
            '</div>'+
        '</div>';
    };
    recipeContainer.innerHTML = recipeListHTML;
    
    //check to see if mealPlan has data - update 
    var mealPlanRec = document.querySelectorAll('.heading');
    if(window.sessionStorage.getItem('mealPlan')){
        mealPlan = JSON.parse(window.sessionStorage.getItem('mealPlan'));
        for (let i = 0; i < mealPlanRec.length; i++){
            for(let j = 0; j < mealPlan.length; j++){
                if(mealPlanRec[i].textContent === mealPlan[j].name){
                    mealPlanRec[i].parentNode.nextSibling.firstChild.classList.remove('add');
                    mealPlanRec[i].parentNode.nextSibling.firstChild.classList.add('rem');
                    mealPlanRec[i].parentNode.nextSibling.firstChild.textContent = 'Remove';
                };
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

    if (opt === 'Snacks') {
        opt = 'snack'; // De-plural menu option to allow class search
    }

    // Check recipes and remove d-none from selected category, hide remaining. If already active do nothing
    for(let i = 0; i < meals.length; i++){
        if(meals[i].classList.contains(opt.toLowerCase()) === true && meals[i].classList.contains('d-none') === true){
            meals[i].classList.remove('d-none');
        }
        else if(meals[i].classList.contains(opt.toLowerCase()) !== true && meals[i].classList.contains('d-none') !== true){
            meals[i].classList.add('d-none');
        };
    };
};

// Calculate % of calories allocated to each meal type
function mealPcCalc(){
    mealPcGuage = document.getElementsByClassName('meal_pc');

    // Check value of mealStats then calc and write meal % to HTML 
    let mSVals = Object.values(mealStats);
    for (let i = 0; i < mealPcGuage.length; i++){
        if(mSVals[i]>0){
            mealPc[i] = Math.round((mSVals[i] / planStats[0]) * 100);
        }
        else {
            mealPc[i] = 0;
        };
        mealPcGuage[i].textContent = mealPc[i];
    };
};

function mealCalc(operator, rCard){
    var mt = rCard.classList;
    var mc = rCard.getElementsByClassName('meal-stat')
    var mealCals = parseInt(mc[0].textContent,10);
    
    if(mt.contains('breakfast')){
        switch (operator){
            case 'add':
                mealStats.breakfast += mealCals;
                break;
            case 'sub':
                mealStats.breakfast -= mealCals;
                break;
        }
    }
    else if(mt.contains('lunch')){
        switch (operator){
            case 'add':
                mealStats.lunch += mealCals;
                break;
            case 'sub':
                mealStats.lunch -= mealCals;
                break;
        }
    }
    else if(mt.contains('dinner')){
        switch (operator){
            case 'add':
                mealStats.dinner += mealCals;
                break;
            case 'sub':
                mealStats.dinner -= mealCals;
                break;
        }
    }
    else if(mt.contains('snack')){
        switch (operator){
            case 'add':
                mealStats.snacks += mealCals;
                break;
            case 'sub':
                mealStats.snacks -= mealCals;
                break;
        }
    };

    mealPcCalc();
};

function toggleRecipeBtn(btn, currentBtnClass, newBtnClass, btnText){
    btn.classList.remove(currentBtnClass);
    btn.classList.add(newBtnClass);
    btn.textContent = btnText;
};

//Add recipe details to meal plan to carry over into Meal Plan page
function addToPlan(rCard, s){
    var meal = {};

    meal.name = rCard.querySelector('.heading').textContent;
    meal.cals = rCard.querySelector('.meal-cals').textContent;
    meal.prot = rCard.querySelector('.meal-protein').textContent;
    meal.carb = rCard.querySelector('.meal-carb').textContent;
    meal.fat = rCard.querySelector('.meal-fat').textContent;
    meal.ing = rCard.querySelector('.meal-ings').textContent;
    meal.desc = rCard.querySelector('.meal-desc').textContent;
    
    if(rCard.classList.contains('breakfast')){
        meal.type = 'breakfast';
    } else if (rCard.classList.contains('lunch')) {
        meal.type = 'lunch';
    } else if (rCard.classList.contains('dinner')) {
        meal.type = 'dinner';
    } else if (rCard.classList.contains('snack')) {
        meal.type = 'snack';
    };

    if(s === 'add'){
        mealPlan.push(meal); 
    }
    else if(mealPlan.length > 0){
        for(let i = 0; i < mealPlan.length; i++){
            if(mealPlan[i].name === meal.name){
                mealPlan.splice(i, 1);
            }
        };
    };
};

function recCalc(operator, rStats){
    for(i = 0; i < rStats.length; i++){
        if(operator === "add"){
            planStats[i] += parseInt(rStats[i].textContent,10) || rStats[i];
        }
        else {
            planStats[i] -= parseInt(rStats[i].textContent,10) || rStats[i];
        };
    };
    pcCalc();
};

// Capture recipe btn actived and update trackers and btn state
function mealAddRemove(e){
    var recipeBtn = e.target;
    var recipeCard = recipeBtn.parentNode.parentNode.parentNode;
    var recipeStats = recipeBtn.parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
    var state;

    // Toggle button status and calculate new %'s
    if(recipeBtn.classList.contains('add')){
        recCalc('add', recipeStats); // increase macro %'s based on recipe attributes
        mealCalc('add', recipeCard); // update relevant meal type %'s as a % of calories spent
        toggleRecipeBtn(recipeBtn, 'add', 'rem', 'Remove');
        state = 'add';
    }
    else if(recipeBtn.classList.contains('rem')){    
        recCalc('sub', recipeStats);
        mealCalc('sub', recipeCard); // update relevant meal type %'s as a % of calories spent
        toggleRecipeBtn(recipeBtn, 'rem', 'add', 'Add');
        state = 'rem';
    };

    addToPlan(recipeCard, state);
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

function manageMeal(button){
    var manageMeal = document.getElementsByClassName('recipeBtn');
    var recipeHeaders = document.getElementsByClassName('recipe-name');

    for (let i = 0; i < manageMeal.length; i++){
        manageMeal[i].addEventListener('click', function(e){
            mealAddRemove(e);
        });
    };

    for(let i = 0; i < recipeHeaders.length; i++){
        recipeHeaders[i].addEventListener('click', function(e){
            showDetail(e);
        });
    };
};

//Reset the plan and update the trackers % values back to zero
function resetAll(){
    var selMeals = document.querySelectorAll('.rem');
    var selMealStats = [];
    var planStatsAdjust = [0, 0, 0, 0];
    var remMealType = [];

    // Get the macro stats for each recipe added to the meal plan
    for (let i = 0; i < selMeals.length; i++){
        selMealStats[i] = selMeals[i].parentNode.parentNode.parentNode.getElementsByClassName('meal-stat');
        mealCalc('sub', selMeals[i].parentNode.parentNode.parentNode);
    };

    // Get total macros of all selected recipes
    for(let x = 0; x < 4; x++){
        for (let y = 0; y < selMealStats.length; y++){
            planStatsAdjust[x] += parseInt(selMealStats[y][x].textContent, 10);
        };
    };
    
    // Reset recipe button states back to Add
    for (let i = 0; i < selMeals.length; i++){
        toggleRecipeBtn(selMeals[i], 'rem', 'add', 'Add');
        mealPlan.pop();
    };

    recCalc('sub', planStatsAdjust);
};

function showDetail(e){
    var rName = e.target;
    var rCard = rName.parentNode.parentNode.parentNode;
    var rDetails = rCard.getElementsByClassName('details');
    
    for (let i = 0; i < rDetails.length; i++){
        rDetails[i].classList.toggle('d-none');
    };   
};

if (window.location.pathname === "/planner.html" || window.location.pathname === "/placro/planner.html"){
    var resetCat = document.getElementById('resetBtn');
    resetCat.addEventListener('click', resetAll, false);
};

if(window.location.pathname === "/planner.html" || window.location.pathname === "/placro/planner.html"){
    window.addEventListener('load', readRecipeFile("data/recipes.JSON", function(text){
        var data = (JSON.parse(text));
        retrieveData(); //function in statsSummary.js that retrieves sessionStorage data
        pcCalc(); // function in statsSummary.js that calculates % of macros allocated
        mealPcCalc();
        loadRecipeData(data);
        manageMeal();
    }));
};