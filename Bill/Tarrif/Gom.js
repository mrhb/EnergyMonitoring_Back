var moment = require('jalali-moment');
var PieceCost = require('../PieceCost')


module.exports =  function(kwh,demandM,demandG,startDate,endDate) {
    //jomiee,low,middle,higth,var
const params=[
    {
        "Eblagh":"1397/02/09",
        "garmsMonth":[0,0,1,1,1,1,0,0,0,0,0,0],
        "x":[100,200,300,400,500,600],
        "y":[490,571,1224,2203,2531,3184,3511],
        "x_garm":[1000,2000,3000,3500,4500,6000],
        "y_garm":[360,816,1388,1714,2042,2203,2368],
        "coeff":2,
        "demandPrice":57175
    }]

param=params[0];
    
start = moment.from(startDate, 'fa', 'YYYY/MM/DD');
end = moment.from(endDate, 'fa', 'YYYY/MM/DD');
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

    return [energy,avg_energy,pf,zian,demandC,DemandFactor,demandCost];
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