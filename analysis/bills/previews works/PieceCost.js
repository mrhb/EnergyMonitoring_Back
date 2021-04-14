module.exports = function (xs, ys,kwh_low,kwh_high,kwh_middle,kwh_friday) {
    pieceCost= function(x) {
      // bisect
      var lo = 0, hi = xs.length - 1;
      while (hi - lo > 1) {
        var mid = (lo + hi) >> 1;
        if (x < xs[mid]) hi = mid;
        else lo = mid;
      }
      // project
      return ys[lo] + (ys[hi] - ys[lo]) / (xs[hi] - xs[lo]) * (x - xs[lo]);
    };

    return [pieceCost(kwh_middle),0.5*pieceCost(kwh_low),2*pieceCost(kwh_high),pieceCost(kwh_friday)]
  };