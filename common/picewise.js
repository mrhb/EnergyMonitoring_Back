// var Piecewise = require('./')

// relu = Piecewise([-1, 0, 6], [0, 0, 1])
// console.log(relu(3))


module.exports = function (xs, ys) {
    return function(x) {
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
  };