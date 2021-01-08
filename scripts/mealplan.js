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
                        '<button class="btn remove"><i class="fa fa-times-circle"></i></button><span class="recipe-name">'+ mealPlan[j].name +'</span>'+
                    '</li>';
            };
        };
        section+= 
                '</ul>'+
            '</div>';
    };

    planList.innerHTML = section;
};

function removeMeal(e){   
    var remMeal = document.getElementsByClassName('remove');
    console.log(remMeal);
    for (i = 0; i < remMeal.length; i++){
        remMeal[i].addEventListener('click', function(e){
            delFromPlan(e);
        });
    };
};

function delFromPlan(){
    console.log("this will delete the recipe");
};

window.addEventListener('load', function(){
    postPlan();
    removeMeal();
});
