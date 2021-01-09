function retrieveData(){
    userStats = JSON.parse(window.sessionStorage.getItem('userStats'));
    modifiers = JSON.parse(window.sessionStorage.getItem('modifiers'));
    macros = JSON.parse(window.sessionStorage.getItem('macros'));
    
    if(JSON.parse(window.sessionStorage.getItem('planStats')) !== null){
        if(window.location.pathname === "/planner.html" || window.location.pathname === "/mealplan.html" || window.location.pathname === "/placro/planner.html" || window.location.pathname === "/placro/mealplan.html"){
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
    for(i = 0; i < mealOpts.length; i++){
        mealOpts[i].addEventListener('click', function(e){
            getOption(e);
        });
    }; 
};

window.addEventListener('load', retrieveData, false);
mOpts();