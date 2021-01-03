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
    };
    protein = Math.round((cals * protMulti) / 4);
    carbs = Math.round((cals * carbMulti) / 4);
    fat = Math.round((cals * fatMulti) / 9);

    return [cals, protein, carbs, fat];
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
    };
};

// Take BMR and return with daily calorie amount
function tdeeCalc(bmr){
    tdee = Math.ceil(bmr * 1.5);
    return tdee;
};

// Submit initial form. Hide seciton and reveal goals section.
function statsCapture(e){
    e.preventDefault();
    n = document.getElementById('name');
    a = document.getElementById('age'); 
    h = document.getElementById('height');
    w = document.getElementById('weight');

    if (n.value != ""){
        name = n.value;
    };
    if (a.value != "") {
        age = parseInt(a.value);
    };
    if (h.value != "") {
        height = parseInt(h.value);
    };
    if (w.value != "") {
        weight = parseInt(w.value);
    };

    if(measure ==="imperial"){
        height = Math.round(height * inchMulti);
        weight = Math.round(weight / lbsMulti);
    }
    
    calories = tdeeCalc(bmrCalc(age, weight, height));
};

// Manage user choice for measurement and update any inputs to reflect.
function getMeasure(e){
    var m = e.target;
    var h = document.getElementById('height');
    var w = document.getElementById('weight');

    measure = m.getAttribute('value');

    if(measure === "metric"){
        if(w.value != "") {
            w.value = Math.round(w.value / lbsMulti);
        };
        if(h.value != "") {
            h.value = Math.round(h.value * inchMulti); 
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight kg');
        document.getElementById('height').setAttribute('placeholder', 'Height cm');
    }
    else {
        // Display imperial values in form
        if(w.value != "") {
            w.value = Math.round(w.value * lbsMulti);
        };
        if (h.value != "") {
            h.value = Math.round(h.value / inchMulti);
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight lbs');
        document.getElementById('height').setAttribute('placeholder', 'Height ins');
    };
};

function submitStats(e){
    e.preventDefault();

    for (i = 0; i < goalForm.length; i++) {
        if (goalForm[i].checked === true) {
            goal = goalForm[i].value;
        }
    };

    for (i = 0; i < measureType.length; i++) {
        if (measureType[i].checked === true) {
            measure = measureType[i].value;
        }
    }
    
    stats = macrosCalc(calories, goal);
    storeStats();
    window.location.assign("../stats.html");
};

function storeStats(){
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('age', age);
    sessionStorage.setItem('weight', weight);
    sessionStorage.setItem('height', height);
    sessionStorage.setItem('measure', measure);
    sessionStorage.setItem('goal', goal);
    sessionStorage.setItem('calories', stats[0]);
    sessionStorage.setItem('protein', stats[1]);
    sessionStorage.setItem('carbs', stats[2]);
    sessionStorage.setItem('fat', stats[3]);
};

const lbsMulti = 2.20462;
const inchMulti = 2.54;
var height, weight, name, age, goal, stats, measure;
var calories = 0;

// Capture form and listen for submit action
var statsForm = document.getElementById('stats');
statsForm.addEventListener('submit', statsCapture, false);

// Capture measurement options in form and listen for and react to changes in choice
var measureType = document.getElementsByName("measures");
for (i = 0; i < measureType.length; i++){
    measureType[i].addEventListener('change', function(e){
        getMeasure(e);
    });        
};

// Capture Goal form and submit all stats and load Stats Summary Page
var goalForm = document.getElementById('goals');
goalForm.addEventListener('submit', function(e){
    submitStats(e);
});