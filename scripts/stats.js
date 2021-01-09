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
    macros.calories = cals;
    macros.protein = Math.round((cals * protMulti) / 4);
    macros.carbs = Math.round((cals * carbMulti) / 4);
    macros.fat = Math.round((cals * fatMulti) / 9);
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
    if(window.location.pathname === '/' || window.location.pathname === "/placro/"){
        e.preventDefault();
    }

    //Get user entered data from form
    n = document.getElementById('name');
    a = document.getElementById('age'); 
    h = document.getElementById('height');
    w = document.getElementById('weight');

    //Assign data to variables and convert to numbers
    if (n.value != ""){
        userStats.name = n.value;
    };
    if (a.value != "") {
        userStats.age = parseInt(a.value);
    };
    if (h.value != "") {
        userStats.weight = parseInt(w.value);
    };
    if (w.value != "") {
        userStats.height = parseInt(h.value);
    };

    //Make sure any imperial measures are converted back to metric to manage macro calculations
    if(modifiers[0] === "imperial"){
        userStats.weight = Math.round(userStats.weight / lbsMulti);
        userStats.height = Math.round(userStats.height * inchMulti);
    }
    
    //Calculate the calories based on the user input
    macros.calories = tdeeCalc(bmrCalc(userStats.age, userStats.weight, userStats.height));
    if (window.location.pathname === '/' || window.location.pathname === "/placro/"){
        document.getElementById('statSection').classList.toggle('d-none');
        document.getElementById('goalSection').classList.toggle('d-none');  
    };
};

// Manage user choice for measurement and update any inputs to reflect.
function getMeasure(e){
    var m = e.target;
    var h = document.getElementById('height');
    var w = document.getElementById('weight');

    modifier.measure = m.getAttribute('value');

    if(modifier.measure === "metric"){
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
    if (window.location.pathname === "/" || window.location.pathname === "/placro/"){
        e.preventDefault();    
    }

    // Capture the selected goals option
    for (i = 0; i < goalForm.length; i++) {
        if (goalForm[i].checked === true) {
            modifiers.goal = goalForm[i].value;
        }
    };

    // Capture the selected measures option
    for (i = 0; i < measureType.length; i++) {
        if (measureType[i].checked === true) {
            modifiers.measure = measureType[i].value;
        }
    }
    // Calculate the macros and store them to memory for the next page
    macrosCalc(macros.calories, modifiers.goal);
    storeStats();

    // Load the stats.html page only if currently on the index page
    if (window.location.pathname === "/" || window.location.pathname === "/placro/"){
        window.location.assign("./stats.html");
    };
};

// Store all stats into session storage for site pages to access
function storeStats(){
    window.sessionStorage.setItem('userStats', JSON.stringify(userStats));
    window.sessionStorage.setItem('modifiers', JSON.stringify(modifiers));
    window.sessionStorage.setItem('macros', JSON.stringify(macros));

    if(window.location.pathname === "/planner.html" || window.location.pathname === "/mealplan.html" || window.location.pathname === "/placro/planner.html" || window.location.pathname === "/placro/mealplan.html"){
        window.sessionStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        window.sessionStorage.setItem('planStats', JSON.stringify(planStats));
        window.sessionStorage.setItem('mealStats', JSON.stringify(mealStats));
    };
};

function aboutToggle(){
    var getAbout = document.getElementById('about');

    getAbout.classList.toggle('d-none');
    window.location.assign('/#about' || '/placro/#about');
}

const lbsMulti = 2.20462;
const inchMulti = 2.54;
var calories = 0;
var userStats = {
    name:'',
    age:0,
    weight:0,
    height:0,
};
var modifiers = {
    measure:'',
    goal:'',
};
var macros = {
    calories:0,
    protein:0,
    carbs:0,
    fat:0,
};

if(window.location.pathname === "/" || window.location.pathname === "/placro/"){
    window.addEventListener('load', function(){
        sessionStorage.clear();
    });
};

// Capture form and listen for submit action
var statsForm = document.getElementById('stats');
statsForm.addEventListener('submit', statsCapture, false);

var about = document.getElementsByClassName('aboutBtn');
for (i = 0; i < about.length; i++){
    about[i].addEventListener('click', aboutToggle, false);
}

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

var mealPlan = [];