function retrieveData(){
    name = sessionStorage.getItem('name');
    age = sessionStorage.getItem('age');
    height = sessionStorage.getItem('height');
    weight = sessionStorage.getItem('weight');
    stats[0] = sessionStorage.getItem('calories');
    stats[1] = sessionStorage.getItem('protein');
    stats[2] = sessionStorage.getItem('carbs');
    stats[3] = sessionStorage.getItem('fat');
    measure = sessionStorage.getItem('measure');
    goal = sessionStorage.getItem('goal');
    
    writeStats();
};

function writeStats(){
    macros = document.getElementsByClassName('stat');

    for (i = 0; i < macros.length; i++){
        macros[i].firstChild.textContent = stats[i];
        console.log(stats[i]);
    };
};

var stats = [];
window.addEventListener('load', retrieveData, false);
