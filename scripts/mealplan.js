/*jshint esversion: 6 */
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
                '<p>If you want to make any changes, skip back to the relevant meal page. You can also save your plan for when you next come back to <span class="brand">Placro</span> or if you change your mind you can clear it from memory.</p>'+
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
        for (let i = 0; i < meals.length; i++){
            section += 
                '<div class="meal-section">'+
                    '<h3 class="heading page-section"">'+meals[i]+'</h3>';
            for(let j = 0; j < mealPlan.length; j++){
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
                                    mealPlan[j].ing+
                                '</div>'+
                            '</div>'+
                        '</div>';
                }
            }
            section+= 
                '</div>';
        }
    }
    planList.innerHTML = section;
}

function removeMeal(e){   
    var remMeal = document.getElementsByClassName('remove');
    for (let i = 0; i < remMeal.length; i++){
        remMeal[i].addEventListener('click', function(e){
            delFromPlan(e);
        });
    }
}

function delFromPlan(e){
    var selected = e.target;
    var mealToRem = selected.parentNode.parentNode.nextSibling.textContent;
    var rowToRem = selected.parentNode.parentNode.parentNode;
    var mealType = rowToRem.parentNode.firstChild.textContent;
    var m = ['cals', 'prot', 'carb', 'fat'];

    for(let i = 0; i < mealPlan.length; i++){
        if(mealPlan[i].name === mealToRem){
            mealStats[mealType.toLowerCase()] -= mealPlan[i].cals;
            for(let j = 0; j < m.length; j++){
                planStats[j] -= mealPlan[i][m[j]];
            }
            mealPlan.splice(i, 1);
        }
    }

    rowToRem.classList.add('d-none');
    storeStats();
    pcCalc();
    mealPcCalc();
    if(mealPlan.length === 0){
        postPlan();
    }
}

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
}

// Create shopping list items using meal plan ingredients
function shoppingList(){
    let listItems = [];
    let list = document.getElementById('list-items');
    let listHTML, item = '';

    for(let i = 0; i < mealPlan.length; i++){
        for(let j = 0; j < mealPlan[i].ing.length; j++){
            item = mealPlan[i].ing[j].substring(mealPlan[i].ing[j].indexOf('-')+2, mealPlan[i].ing[j].length);
            if(item.length != 0){
                let check = 0;
                for(let k = 0; k <= listItems.length; k++){
                    //Remove duplicates and water from shopping list
                    if (item === listItems[k] || item === 'Water'){
                        check += 1;
                    }
                }
                if (check === 0){
                    listItems.push(item);
                }
            }
        }
    }
    
    listHTML = 
            '<ul>';

    for(let i = 0; i < listItems.length; i++){
        listHTML += 
            '<li>'+listItems[i]+'</li>';
    }
    
    listHTML += 
        '</ul>'; 
        
    list.innerHTML = listHTML;
}

window.addEventListener('load', function(){
    postPlan();
    removeMeal();
});

var shopList = document.getElementById('shopping-list');
shopList.addEventListener('focus', shoppingList, false);

var savePlan = document.getElementsByClassName('save');
for (let i = 0; i < savePlan.length; i++){
    savePlan[i].addEventListener('click', function(e){
        saveData(e);
    });
}
