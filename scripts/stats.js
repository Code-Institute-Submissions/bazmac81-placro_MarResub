// Calculate Calories and macros using user stats and goal choice
function macrosCalc(cals, g) {
    var protMulti, carbMulti, fatMulti, protein, carbs, fat = 0;

    if (g === "build"){
        protMulti = 0.25;
        carbMulti = 0.55;
        fatMulti = 0.2;
        cals = Math.round(cals * 1.1);
    } 
    else if(g === "cut"){
        protMulti = 0.4;
        carbMulti = 0.4;
        fatMulti = 0.2;
        cals = Math.round(cals * 0.75);
    } 
    else {
        protMulti = 0.3;
        carbMulti = 0.45;
        fatMulti = 0.25;
    }

    protein = Math.round((cals * protMulti) / 4);
    carbs = Math.round((cals * carbMulti) / 4);
    fat = Math.round((cals * fatMulti) / 9);

    var stats = [cals, protein, carbs, fat];
    return stats;
};

// Using user stats calculate Base Metabolic Rate
function bmrCalc(a, w, h) {
    if(typeof(a) == "number" && typeof(w) == "number" && typeof(h) == "number") {
        if(a > 0 && h > 0 && w > 0){
            bmr = Math.ceil(((w * 10) + (h * 6.25) - (a * 5)) + 5);
            return bmr;
        }
        else{
            return "Please make sure you are not using negative numbers";    
        }
    }
    else {
        return "Please provide all of your stats as numbers.";
    }
};

// Take BMR and return with daily calorie amount
function tdeeCalc(bmr){
    tdee = Math.ceil(bmr * 1.5);

    return tdee;
};

// Submit initial form. Hide seciton and reveal goals section.
function statsCapture(e){
    e.preventDefault();
    name = document.getElementById('name').value;
    age = document.getElementById('age').value;
};

// Capture goal selection. Store user data locally and proceed to next page
function getGoal(e){
    e.preventDefault();
    
    var goalOptions = document.getElementsByName('goals');
    var goalChoice = "maintain";

    for (i = 0; i < goalOptions.length; i++) {
        if (goalOptions[i].checked == true){
            goalChoice = goalOptions[i].value;
        }
    };
    return goalChoice;
};

// Manage user choice for measurement and update any inputs to reflect.
function getMeasure(e){
    var m = e.target;
    var h = document.getElementById('height');
    var w = document.getElementById('weight');
    var measure = m.getAttribute('id');

    if(measure == "measure-met"){
        if(w.value != "") {
            w.value = Math.round(w.value / lbsmulti);
        };
        if(h.value != "") {
            h.value = Math.round(h.value * inchmulti); 
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight kg');
        document.getElementById('height').setAttribute('placeholder', 'Height cm');
    }
    else {
        // Keep metric versions of weight and height for calculation but display imperial values in form
        if(w.value != "") {
            weight = w.value;
            w.value = Math.round(w.value * lbsmulti);
        };
        if (h.value != "") {
            height = h.value;
            h.value = Math.round(h.value / inchmulti);
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight lbs');
        document.getElementById('height').setAttribute('placeholder', 'Height ins');
    };
}

const lbsmulti = 2.20462;
const inchmulti = 2.54;
var height, weight, name, age;

// Capture form and listen for submit action
var statsForm = document.getElementById('stats');
statsForm.addEventListener('submit', statsCapture, false);

// Capture measurement options in form and listen for and react to changes in choice
var measureType = document.getElementsByName("measures");
for (i = 0; i < measureType.length; i++){
    measureType[i].addEventListener('click', function(e){
        getMeasure(e);
    });        
};

var calories = tdeeCalc(bmrCalc(age, weight, height));


// Capture goals form and listen for submit action. Load new page after submit
var goalForm = document.getElementById('goals');
var goal = goalForm.addEventListener('submit', getGoal, false);

var stats = macrosCalc(calories, goal);