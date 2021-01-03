function retrieveData(){
    inputs[0] = sessionStorage.getItem('name');
    inputs[1] = sessionStorage.getItem('age');
    inputs[2] = sessionStorage.getItem('weight');
    inputs[3] = sessionStorage.getItem('height');
    stats[0] = sessionStorage.getItem('calories');
    stats[1] = sessionStorage.getItem('protein');
    stats[2] = sessionStorage.getItem('carbs');
    stats[3] = sessionStorage.getItem('fat');
    modifiers[0] = sessionStorage.getItem('measure');
    modifiers[1] = sessionStorage.getItem('goal');
    
    console.log(inputs);
    console.log(modifiers);
    console.log(stats);
    
    writeStats();
};

function writeStats(){
    macros = document.getElementsByClassName('stat');
    
    console.log(macros);

    for (i = 0; i < macros.length; i++){
        macros[i].firstChild.textContent = stats[i];
        console.log(stats[i]);
    };
};

var inputs = [];
var modifiers = [];
var stats = [];

window.addEventListener('load', retrieveData, false);

console.log(document.getElementById('height').value);
