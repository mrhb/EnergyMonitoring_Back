// var moment = require('../../../../node_modules/jalali-moment/jalali-moment');
var PieceCost = require('../PieceCost')




module.exports =  function(kwh,demandM,demandG,start,end,param) {
    //jomiee,low,middle,higth,var


    
// start = moment.from(startDate, 'fa', 'YYYY/MM/DD');
// end = moment.from(endDate, 'fa', 'YYYY/MM/DD');
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
    

    return [energy,avg_energy,pf,zian,demandC,DemandFactor,
        demandCost,energyCost,varrCost,faslCost,totalCost,kwhCost];
}
    

// let xx=[0]
// taarif.x.map(function(num) {
// xx.push(num);
// xx.push(num+Number.MIN_VALUE);
// })

// // xx[xx.length - 1]=Number.MAX_VALUE;
// xx[xx.length ]=Number.MAX_VALUE;

// console.log("this is xx:   "+xx);



// let yy=[]
// taarif.y.map(function(num) {
//     yy.push(num);
//     yy.push(num);
// })
// // console.log("this is y:   "+taarif.y);
// console.log("this is yy:   "+yy);

// relu = Piecewise(xx, yy)