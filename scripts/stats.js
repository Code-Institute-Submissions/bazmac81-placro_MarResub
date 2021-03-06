/*jshint esversion: 6 */
//Declare global key variables
const lbsMulti = 2.20462;
const inchMulti = 2.54;
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
var mealPlan = [];
var mealStats = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0,
};
var planStats = [0, 0, 0, 0];

// Calculate Calories and macros using user stats and goal choice
function macrosCalc(cals, g) {
    let protMulti, carbMulti, fatMulti = 0;
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
    macros.calories = cals;
    macros.protein = Math.round((cals * protMulti) / 4);
    macros.carbs = Math.round((cals * carbMulti) / 4);
    macros.fat = Math.round((cals * fatMulti) / 9);
}

// Using user stats calculate Base Metabolic Rate
function bmrCalc(a, w, h) {
    let bmr = 0;

    if(a > 0 && h > 0 && w > 0){
        bmr = Math.ceil(((w * 10) + (h * 6.25) - (a * 5)) + 5);
        return bmr;
    }
}

// Take BMR and return with daily calorie amount
function tdeeCalc(bmr){
    var tdee = Math.ceil(bmr * 1.5);
    return tdee;
}

// Captures user input from first submission and amendments via navmenu forms
function statsCapture(e){
    if(window.location.pathname === '/' || window.location.pathname === "/placro/"){
        e.preventDefault();
    }

    let error = 0;

    //Get user entered data from form
    let n = document.getElementById('name');
    let a = document.getElementById('age'); 
    let h = document.getElementById('height');
    let w = document.getElementById('weight');

    //Assign data to variables and convert to numbers
    //check name value
    if (n.value != ""){
        userStats.name = n.value;
    }
    else{
        n.setAttribute('placeholder', 'Please enter your name');
        error += 1;
    }
    //check age value
    if (a.value != ""){
        if(typeof(parseInt(a.value)) == "number" && parseInt(a.value) > 0) {
            userStats.age = a.value;
        }
        else {
            a.value = null;
            console.log("Age is negative");
            a.setAttribute('placeholder', 'Please enter an age greater than 0');
            error += 1;
        }
    }
    else {
        a.setAttribute('placeholder', 'Please enter your age');
        error += 1;
    }

    //check weight value
    if (w.value != ""){
        if(typeof(parseInt(w.value)) == "number" && parseInt(w.value) > 0) {
            userStats.weight = w.value;
        }
        else {
            w.value = null;
            console.log("Weight is negative");
            w.setAttribute('placeholder', 'Please enter a weight greater than 0');
            error += 1;
        }
    }
    else {
        w.setAttribute('placeholder', 'Please enter your weight');
        error += 1;
    }

    //check height value
    if (h.value != ""){
        if(typeof(parseInt(h.value)) == "number" && parseInt(h.value) > 0) {
            userStats.height = h.value;
        }
        else {
            h.value = null;
            console.log("height is negative");
            h.setAttribute('placeholder', 'Please enter a height greater than 0');
            error += 1;
        }
    }
    else{
        h.setAttribute('placeholder', 'Please enter your height');
        error += 1;
    }

    //Make sure any imperial measures are converted back to metric to manage macro calculations
    if(modifiers[0] === "imperial"){
        userStats.weight = Math.round(userStats.weight / lbsMulti);
        userStats.height = Math.round(userStats.height * inchMulti);
    }
    
    //Calculate the calories based on the user input
    macros.calories = tdeeCalc(bmrCalc(userStats.age, userStats.weight, userStats.height));
    if(error === 0){
        if (window.location.pathname === '/' || window.location.pathname === "/placro/"){
            document.getElementById('statSection').classList.toggle('d-none');
            document.getElementById('goalSection').classList.toggle('d-none');  
        }
        else{
            return(0);
        }
    }
    else{
        return(error);
    }
}

// Manage user choice for measurement and update any inputs to reflect.
function getMeasure(e){
    var m = e.target;
    var h = document.getElementById('height');
    var w = document.getElementById('weight');

    modifiers.measure = m.getAttribute('value');

    if(modifiers.measure === "metric"){
        if(w.value != "") {
            w.value = Math.round(w.value / lbsMulti);
        }
        if(h.value != "") {
            h.value = Math.round(h.value * inchMulti); 
        }
        document.getElementById('weight').setAttribute('placeholder', 'Weight kg');
        document.getElementById('height').setAttribute('placeholder', 'Height cm');
    }
    else {
        // Display imperial values in form
        if(w.value != "") {
            w.value = Math.round(w.value * lbsMulti);
        }
        if (h.value != "") {
            h.value = Math.round(h.value / inchMulti);
        }
        document.getElementById('weight').setAttribute('placeholder', 'Weight lbs');
        document.getElementById('height').setAttribute('placeholder', 'Height ins');
    }
}

function submitStats(e){
    // Only prevent default submit action when on the index page
    if (window.location.pathname === "/" || window.location.pathname === "/placro/"){
        e.preventDefault();    
    }

    // Capture the selected goals option
    for (let i = 0; i < goalForm.length; i++) {
        if (goalForm[i].checked === true) {
            modifiers.goal = goalForm[i].value;
        }
    }

    // Capture the selected measures option
    for (let i = 0; i < measureType.length; i++) {
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
    }
}

function goBack(){
    document.getElementById('statSection').classList.toggle('d-none');
    document.getElementById('goalSection').classList.toggle('d-none');
    window.location.assign('./#stats' || './placro/#stats');
}

// Store all stats into session storage for site pages to access
function storeStats(){
    window.sessionStorage.setItem('userStats', JSON.stringify(userStats));
    window.sessionStorage.setItem('modifiers', JSON.stringify(modifiers));
    window.sessionStorage.setItem('macros', JSON.stringify(macros));

    if(window.location.pathname === "/planner.html" || window.location.pathname === "/mealplan.html" || window.location.pathname === "/placro/planner.html" || window.location.pathname === "/placro/mealplan.html"){
        storePlan();
    }
}

function storePlan(){
    window.sessionStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    window.sessionStorage.setItem('planStats', JSON.stringify(planStats));
    window.sessionStorage.setItem('mealStats', JSON.stringify(mealStats));
}

function aboutToggle(){
    var getAbout = document.getElementById('about');

    getAbout.classList.toggle('d-none');
    window.location.assign('./#about' || './placro/#about');
}

function redirectReturn() {
    let check = JSON.parse(window.localStorage.getItem('mealPlan')) || [];
    if(check.length !== 0){
        window.location.assign('./stats.html');
    }
}

if(window.location.pathname === "/" || window.location.pathname === "/placro/"){
    window.addEventListener('load', function(){
        sessionStorage.clear();
        redirectReturn();
    });
}

// Capture form and listen for submit action
var statsForm = document.getElementById('stats');
statsForm.addEventListener('submit', statsCapture, false);

if(window.location.pathname === '/' || window.location.pathname === '/placro/'){
    // Capture form and listen for submit action
    var prev = document.getElementById('prev');
    prev.addEventListener('click', goBack, false);
}

var about = document.getElementsByClassName('aboutBtn');
for (let i = 0; i < about.length; i++){
    about[i].addEventListener('click', aboutToggle, false);
}

// Capture measurement options in form and listen for and react to changes in choice
var measureType = document.getElementsByName("measures");
for (let i = 0; i < measureType.length; i++){
    measureType[i].addEventListener('change', function(e){
        getMeasure(e);
    });        
}

// Capture Goal form and submit all stats and load Stats Summary Page
var goalForm = document.getElementById('goals');
goalForm.addEventListener('submit', function(e){
    submitStats(e);
});

if (window.location.pathname === "/404.html" || window.location.pathname === "/placro/404.html"){
    window.localStorage.clear();
    setTimeout('window.location.assign("/")', 5000);
}