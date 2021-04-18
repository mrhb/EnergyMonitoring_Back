// var moment = require('../../../../node_modules/jalali-moment/jalali-moment');
var PieceCost = require('./PieceCost')




module.exports =  function(kwh,demandM,demandG,start,end,param) {
days=end.diff(start,'day');

    energy=kwh[0]+kwh[1]+kwh[2]+kwh[3];
    avg_energy=energy/days;
    
    varr=kwh[4];
    pf=Math.cos(Math.atan(varr/energy));

    zian=0
    if(pf<0.9)
    zian=(0.9/pf)-1;

    demandC=demandM;//دیماند محاسباتی
    if(demandM<0.9*demandG)
    demandC=0.9*demandG;


    DemandFactor=demandM*24*days;
    demandCost=demandC*param.demandPrice*days/30;

console.log(
    PieceCost(param.x,param.y,kwh[0],kwh[1],kwh[2],kwh[3])

);
    energyCost=kwh[0]+kwh[1]+kwh[2];
    varrCost=zian*(demandCost+energyCost);
    faslCost=0.2*(varrCost+demandCost+energyCost)/(29*days);
    totalCost=faslCost+varrCost+demandCost+energyCost;
    kwhCost=0;
    if(energyCost=0)
    kwhCost=totalCost/energyCost;
    kwhlowNorm=kwh[0]/(days*12);
    kwhmeanNorm=kwh[1]/(days*12);
    kwhhighNorm=kwh[2]/(days*12);
    

    return [energyCost,energy,avg_energy,pf,zian,demandC,DemandFactor,
        demandCost,varrCost,faslCost,totalCost,kwhCost];
}