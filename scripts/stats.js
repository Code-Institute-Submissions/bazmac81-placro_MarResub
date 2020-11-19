// Calculate Calories

function macrosCalc(cals, goal) {
    var protMulti, carbMulti, fatMulti = 0;
    
    var protein = Math.round((cals * 0.3) / 4);
    var carbs = Math.round((cals * 0.45) / 4);
    var fat = Math.round((cals * 0.25) / 9);

    if (goal === "build"){
        protMutli = 0.25;
        carbMulti = 0.25;
        fatMulti = 0.25;
    } 
    else if(goal === "cut"){
        protMutli = 0.25;
        carbMulti = 0.25;
        fatMulti = 0.25;
    } 
    else {
        protMutli = 0.25;
        carbMulti = 0.25;
        fatMulti = 0.25;
    }

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

var goal = "build";
var calories = tdeeCalc(bmrCalc(39, 80, 170));
var macros = macrosCalc(calories, goal);

console.log(macros);
