// exercise 3b

// Define the Bayesian network structure
var smoke = Categorical({vs: ['yes', 'no'], ps: [0.3, 0.7]});
var exercise = function(smoke) {
  if (smoke === 'yes') {
    return Categorical({vs: ['yes', 'no'], ps: [0.6, 0.4]});
  } else {
    return Categorical({vs: ['yes', 'no'], ps: [0.7, 0.3]});
  }
};
var bloodPressure = function(smoke, exercise) {
  if (smoke === 'yes' && exercise === 'yes') {
    return Categorical({vs: ['high', 'low'], ps: [0.3, 0.7]});
  } 
  else if (smoke === 'no' && exercise === 'yes') {
    return Categorical({vs: ['high', 'low'], ps: [0.1, 0.9]});
  }
  else if (smoke === 'yes' && exercise === 'no') {
    return Categorical({vs: ['high', 'low'], ps: [0.6, 0.4]});
  }
  else {
    return Categorical({vs: ['high', 'low'], ps: [0.25, 0.75]});
  }
};

var f = function(){
  var sampleSmoke = sample(smoke);
  var sampleExercise = sample(exercise(sampleSmoke));
  var samplebloodPressure = sample(bloodPressure(sampleSmoke, sampleExercise));
  return samplebloodPressure === 'high' ? sampleSmoke : f()
}
var rejection = Infer({method: 'rejection', samples: 1000, model: f});
// var enumeration = Infer({method: 'enumerate', model: f});
var mcmc = Infer({method: 'MCMC', samples: 10000, model: f});
viz.auto(rejection);