function postPlan(){
    var meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    var planList = document.getElementById('complete-plan');
    var section = '';
 
    retrieveData();
    pcCalc();
    mealPcCalc();

    document.getElementById('planHeader').textContent = userStats.name + "'s Meal Plan";
    if(mealPlan.length === 0){
        section += 
            '<div class="page-section">'+
                '<h3 class="heading">Your meal plan is empty</h3>'+
                '<p>Choose a meal option from the menu or click the meal icon above and start selecting recipes to add to your plan.</p>'+
            '</div>';
    }
    else {
        section += 
            '<div class="page-section">'+
                '<h3 class="heading">Here\'s your meal plan</h3>'+
                '<p>If you want to make any changes, skip back to the relevant meal page. You can also save your plan for when you next come back to Placro or if you change your mind you can clear it from memory.</p>'+
            '</div>'+
            '<div class="row no-gutters d-none d-sm-flex">'+
                '<div class="col-8"></div>'+
                '<div class="d-none d-sm-inline col-sm-4">'+
                    '<div class="row no-gutters">'+
                        '<div class="col-3"><h3 class="heading">Cals</h3></div>'+
                        '<div class="col-3"><h3 class="heading">Prot</h3></div>'+
                        '<div class="col-3"><h3 class="heading">Carbs</h3></div>'+
                        '<div class="col-3"><h3 class="heading">Fat</h3></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
        for (i = 0; i < meals.length; i++){
            section += 
                '<div>'+
                    '<h3 class="heading page-section"">'+meals[i]+'</h3>';
            for(j = 0; j < mealPlan.length; j++){
                if(mealPlan[j].type === meals[i].toLowerCase()){  
                    section+=
                        '<div class="row no-gutters">'+
                            '<div class="col-1"><button class="remove"><i class="fa fa-times-circle"></i></button></div>'+
                            '<div class="col-10 col-sm-7 recipe-name">'+ mealPlan[j].name +'</div>'+
                            '<div class="d-none d-sm-inline col-sm-4">'+
                                '<div class="row no-gutters">'+
                                    '<div class="col-3">'+ mealPlan[j].cals +'</div>'+
                                    '<div class="col-3">'+ mealPlan[j].prot +'g</div>'+
                                    '<div class="col-3">'+ mealPlan[j].carb +'g</div>'+
                                    '<div class="col-3">'+ mealPlan[j].fat +'g</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row no-gutters details">'+
                                '<div class="col-11 d-none">'+
                                    +mealPlan[j].desc+
                                '</div>'+
                                '<div class="col-11 d-none">'+
                                    +mealPlan[j].ing+
                                '</div>'+
                            '</div>'+
                        '</div>';
                };
            };
            section+= 
                '</div>';
        };
    };
    planList.innerHTML = section;
};

function removeMeal(e){   
    var remMeal = document.getElementsByClassName('remove');
    for (i = 0; i < remMeal.length; i++){
        remMeal[i].addEventListener('click', function(e){
            delFromPlan(e);
        });
    };
};

function delFromPlan(){
    console.log("this will delete the recipe");
};

function saveData(e){
    let sd = e.target;

    if(!sd.classList.contains('rem')){
        window.localStorage.setItem('userStats', JSON.stringify(userStats));
        window.localStorage.setItem('modifiers', JSON.stringify(modifiers));
        window.localStorage.setItem('macros', JSON.stringify(macros));
        window.localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        window.localStorage.setItem('planStats', JSON.stringify(planStats));
        window.localStorage.setItem('mealStats', JSON.stringify(mealStats));
        sd.classList.toggle('rem');
        sd.textContent = 'Clear';
    }
    else {
        window.localStorage.clear();
        sd.classList.toggle('rem');
        sd.textContent = 'Save';
    }
};

window.addEventListener('load', function(){
    postPlan();
    removeMeal();
});

var savePlan = document.getElementById('save');
savePlan.addEventListener('click', function(e){
    saveData(e);
});
