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
            '<div>'+
                '<h3 class="heading">Your meal plan is empty</h3>'+
                '<p>Choose a meal option from the menu or click the meal icon above and start selecting recipes to add to your plan.</p>'+
            '</div>';
    }
    else {
        for (i = 0; i < meals.length; i++){
            section += 
                '<div>'+
                    '<h3 class="heading">'+meals[i]+'</h3>'+
                    '<ul class="mealplan-list">';
            
            for(j = 0; j < mealPlan.length; j++){
                if(mealPlan[j].type === meals[i].toLowerCase()){  
                    section+=
                        '<li class="mealplan-item">'+
                            '<button class="remove"><i class="fa fa-times-circle"></i></button><span class="recipe-name">'+ mealPlan[j].name +'</span>'+
                        '</li>';
                };
            };
            section+= 
                    '</ul>'+
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
