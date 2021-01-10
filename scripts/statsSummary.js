function retrieveData(){
    userStats = JSON.parse(window.sessionStorage.getItem('userStats'));
    modifiers = JSON.parse(window.sessionStorage.getItem('modifiers'));
    macros = JSON.parse(window.sessionStorage.getItem('macros'));
    
    if(JSON.parse(window.sessionStorage.getItem('planStats')) !== null){
        if(window.location.pathname === "/planner.html" || window.location.pathname === "/mealplan.html" || window.location.pathname === "/placro/planner.html" || window.location.pathname === "/placro/mealplan.html"){
            retrievePlan();
        };
    };
    writeStats();
};

function retrievePlan(){
    mealPlan = JSON.parse(window.sessionStorage.getItem('mealPlan'));
    planStats = JSON.parse(window.sessionStorage.getItem('planStats'));
    mealStats = JSON.parse(window.sessionStorage.getItem('mealStats'));
};

function writeStats(){
    macrosHTML = document.getElementsByClassName('stat');
    let keys = Object.values(macros);
    for (i = 0; i < macrosHTML.length; i++){
        macrosHTML[i].firstChild.textContent = keys[i];
    };
};

function pcCalc(){
    var statsPc = document.getElementsByClassName('stat_pc');
    
    let pcValues = Object.values(macros);

    if(planStats[0] > 0){
        for (let i = 0; i < statsPc.length; i++){
            planPc[i] = Math.round((planStats[i] / pcValues[i]) * 100);
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        }
    }
    else {
       for (let i = 0; i < statsPc.length; i++){
            planPc[i] = 0;
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        } 
    }
};

function getOption(e){
    var opt = e.target;
    var o = '';

    //if has class 'meal' send textContent
    if(opt.parentNode.classList.contains('meal')){
        opt = opt.textContent;
    }//else manipulate the id 
    else {
        o = e.target.getAttribute('id');
        opt = o.charAt(0).toUpperCase() + o.substring(1, o.indexOf('_'));
    };

    console.log(opt);
    menuOption(opt);
};

function mOpts(){
    var mealOpts = document.getElementsByClassName('meal');
    for(let i = 0; i < mealOpts.length; i++){
        mealOpts[i].addEventListener('click', function(e){
            getOption(e);
        });
    }; 
};

function welcomMsg(){
    let header = document.getElementById('header');
    let message = document.getElementById('message');

    header.textContent = "Welcome back to Placro!"
    message.textContent = "Placro is ready with your meal plan that you saved last time you visited. Update your plan either by adjusting your stats or goals, or by changing the meals in your plan. Remember to save the full plan so your changes are here for next time you come back."
};

function getPrevData(){
    userStats = JSON.parse(window.localStorage.getItem('userStats'));
    modifiers = JSON.parse(window.localStorage.getItem('modifiers'));
    macros = JSON.parse(window.localStorage.getItem('macros'));
    mealPlan = JSON.parse(window.localStorage.getItem('mealPlan'));
    planStats = JSON.parse(window.localStorage.getItem('planStats'));
    mealStats = JSON.parse(window.localStorage.getItem('mealStats'));
    storeStats();
    storePlan();
    retrievePlan();
};

function checkReturn(){
    let check = JSON.parse(window.localStorage.getItem('mealPlan')) || [];
    if(check.length !== 0){
        getPrevData();
        if(window.location.pathname === "/stats.html" || window.location.pathname === "/placro/stats.html"){
            welcomMsg();
        };
    };
};

window.addEventListener('load', function(){ 
    if(window.location.pathname === "/stats.html" || window.location.pathname === "/placro/stats.html"){
        checkReturn();
    };
    retrieveData();
});
mOpts();