// Calculate Calories

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

function tdeeCalc(bmr){
    tdee = Math.ceil(bmr * 1.5);

    return tdee;
};

function statsCapture(e){
    console.log("Click captured");
    e.preventDefault();
};

function getGoal(){
    return "build";
};

function getMeasure(e){
    var m = e.target;
    var measure = m.getAttribute('id');
    var height = document.getElementById('height');
    var weight = document.getElementById('weight');

    if(measure == "measure-met"){
        if(weight.value != "") {
            weight.value = Math.round(weight.value / lbsmulti);
        };
        if(height.value != "") {
            height.value = Math.round(height.value * inchmulti); 
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight kg');
        document.getElementById('height').setAttribute('placeholder', 'Height cm');
    }
    else {
        if(weight.value != "") {
            weight.value = Math.round(weight.value * lbsmulti);
        };
        if (height.value != "") {
            height.value = Math.round(height.value / inchmulti);
        };
        document.getElementById('weight').setAttribute('placeholder', 'Weight lbs');
        document.getElementById('height').setAttribute('placeholder', 'Height ins'); 
    };
}

const lbsmulti = 2.20462;
const inchmulti = 2.54;

var statsForm = document.getElementById('stats');
statsForm.addEventListener('submit', statsCapture, false);

var goal = getGoal();
var measureType = document.getElementsByName("measures");

for (i = 0; i < measureType.length; i++){
    measureType[i].addEventListener('click', function(e){
        getMeasure(e);
    });        
};

var calories = tdeeCalc(bmrCalc(39, 80, 170));
var macros = macrosCalc(calories, goal);