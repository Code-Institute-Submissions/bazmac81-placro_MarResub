function retrieveData(){
    userStats = JSON.parse(window.sessionStorage.getItem('userStats'));
    modifiers = JSON.parse(window.sessionStorage.getItem('modifiers'));
    macros = JSON.parse(window.sessionStorage.getItem('macros'));
    
    if(JSON.parse(window.sessionStorage.getItem('planStats')) !== null){
        if(window.location.pathname === "/planner.html" || window.location.pathname === "/mealplan.html"){
            mealPlan = JSON.parse(window.sessionStorage.getItem('mealPlan'));
            planStats = JSON.parse(window.sessionStorage.getItem('planStats'));
            mealStats = JSON.parse(window.sessionStorage.getItem('mealStats'));
        };
    };
    writeStats();
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
        for (i = 0; i < statsPc.length; i++){
            planPc[i] = Math.round((planStats[i] / pcValues[i]) * 100);
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        }
    }
    else {
       for (i = 0; i < statsPc.length; i++){
            planPc[i] = 0;
            statsPc[i].firstChild.textContent = planPc[i] + '%';
        } 
    }
};

window.addEventListener('load', retrieveData, false);