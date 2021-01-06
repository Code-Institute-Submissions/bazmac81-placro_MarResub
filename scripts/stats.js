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

// Captures user input from first submission and amendments via navmenu forms
function statsCapture(e){
    if(window.location.pathname === '/'){
        e.preventDefault();
    }

    //Get user entered data from form
    n = document.getElementById('name');
    a = document.getElementById('age'); 
    h = document.getElementById('height');
    w = document.getElementById('weight');

    //Assign data to variables and convert to numbers
    if (n.value != ""){
        inputs[0] = n.value;
    };
    if (a.value != "") {
        inputs[1] = parseInt(a.value);
    };
    if (h.value != "") {
        inputs[2] = parseInt(w.value);
    };
    if (w.value != "") {
        inputs[3] = parseInt(h.value);
    };

    //Make sure any imperial measures are converted back to metric to manage macro calculations
    if(modifiers[0] === "imperial"){
        inputs[2] = Math.round(inputs[2] / lbsMulti);
        inputs[3] = Math.round(inputs[3] * inchMulti);
    }
    
    //Calculate the calories based on the user input
    stats[0] = tdeeCalc(bmrCalc(inputs[1], inputs[2], inputs[3]));

    if (window.location.pathname === '/'){
        document.getElementById('statSection').classList.toggle('d-none');
        document.getElementById('goalSection').classList.toggle('d-none');  
    };
};

// Manage user choice for measurement and update any inputs to reflect.
function getMeasure(e){
    var m = e.target;
    var h = document.getElementById('height');
    var w = document.getElementById('weight');

    modifiers[0] = m.getAttribute('value');

    if(modifiers[0] === "metric"){
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
    // Only prevent default submit action when on the index page
    if (window.location.pathname === "/"){
        e.preventDefault();    
    }

    // Capture the selected goals option
    for (i = 0; i < goalForm.length; i++) {
        if (goalForm[i].checked === true) {
            modifiers[1] = goalForm[i].value;
        }
    };

    // Capture the selected measures option
    for (i = 0; i < measureType.length; i++) {
        if (measureType[i].checked === true) {
            modifiers[0] = measureType[i].value;
        }
    }
    
    // Calculate the macros and store them to memory for the next page
    stats = macrosCalc(stats[0], modifiers[1]);
    storeStats(inputs, modifiers, stats);

    // Load the stats.html page only if currently on the index page
    if (window.location.pathname === "/"){
        window.location.assign("../stats.html");
    };
};

// Store all stats into session storage for site pages to access
function storeStats(i, m, s){
    sessionStorage.setItem('name', i[0]);
    sessionStorage.setItem('age', i[1]);
    sessionStorage.setItem('weight', i[2]);
    sessionStorage.setItem('height', i[3]);
    sessionStorage.setItem('measure', m[0]);
    sessionStorage.setItem('goal', m[1]);
    sessionStorage.setItem('calories', s[0]);
    sessionStorage.setItem('protein', s[1]);
    sessionStorage.setItem('carbs', s[2]);
    sessionStorage.setItem('fat', s[3]);
};

const lbsMulti = 2.20462;
const inchMulti = 2.54;
var inputs = [], modifiers = [], stats = [];
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