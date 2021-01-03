function pcCalc(){
    var statsPc = document.getElementsByClassName('stat_pc');

    for (i = 0; i < stats.length; i++){
        allocPc[i] = Math.round((allocNum[i] / stats[i]) * 100);
        statsPc[i].firstChild.textContent = allocPc[i] + '%';
    }
};

var allocNum = [100, 5, 15, 10];
var allocPc = [0, 0, 0, 0];

window.addEventListener('load', pcCalc, false);