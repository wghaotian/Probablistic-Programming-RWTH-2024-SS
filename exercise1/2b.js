// 2b
var days = 30;
// p: P(enjoys vegetarian)
// q: P(enjoys traditional)
// meal=true means traditional
// meal=false means vegetarian
var enjoyPrevious = function(meal,p,q){
  return flip(meal ? q : p);
}
var mealToday = function(enjoyPrevious2, previousMeal){
  return enjoyPrevious2 ? previousMeal : flip(0.5);
}
var f1 = function (p, q, meal, day) {
  if (day == days) {return 0;}
  else {
    var mealTomorrow = mealToday(enjoyPrevious(meal, p, q), meal);
    return mealTomorrow ? f1(p, q, mealTomorrow, day+1) + 1 : f1(p, q, mealTomorrow, day+1);}
}
var result = function (p, q, meal){
  var res = f1(0.5, 0.8, 0, 1);
  condition (res <= 15);
  return res;
} 

var dist = Infer({method: 'rejection', samples: 1000, model: result});
viz.auto(dist);
