function retrieveData(){
    var storedPlan = window.sessionStorage.getItem('mealPlan');
    completePlan = JSON.parse(storedPlan);
    console.log(completePlan);
};

var ingredients = [];
var completePlan;

window.addEventListener('load', retrieveData, false);