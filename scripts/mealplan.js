function postPlan(){
    var meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    var planList = document.getElementById('complete-plan');
    var section = '';
 
    retrieveData();
    pcCalc();
    mealPcCalc();

    document.getElementById('planHeader').textContent = userStats.name + "'s Meal Plan";

    for (i = 0; i < meals.length; i++){
        section += 
            '<div>'+
                '<h3 class="heading">'+meals[i]+'</h3>'+
                '<ul class="mealplan-list">';
        
        for(j = 0; j < mealPlan.length; j++){
            if(mealPlan[j].type === meals[i].toLowerCase()){  
                section+=
                    '<li class="mealplan-item">'+
                        '<button class="btn remove"><i class="fa fa-times-circle remove"></i></button><span class="recipe-name">'+ mealPlan[j].name +'</span>'+
                    '</li>';
            };
        };
        section+= 
                '</ul>'+
            '</div>';
    };

    planList.innerHTML = section;
};

window.addEventListener('load', postPlan, false);