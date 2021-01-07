function retrieveData(){
    userStats = JSON.parse(window.sessionStorage.getItem('userStats'));
    modifiers = JSON.parse(window.sessionStorage.getItem('modifiers'));
    macros = JSON.parse(window.sessionStorage.getItem('macros'));
    mealPlan = JSON.parse(window.sessionStorage.getItem('mealPlan'));

    console.log(userStats, modifiers, macros);
    console.log(mealPlan);
    writeStats();
};

function writeStats(){
    macrosHTML = document.getElementsByClassName('stat');

    let keys = Object.values(macros);
    console.log(keys);
    for (i = 0; i < macrosHTML.length; i++){
        macrosHTML[i].firstChild.textContent = keys[i];
    };
};

window.addEventListener('load', retrieveData, false);