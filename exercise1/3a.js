// exercise 3a

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
}

// Define a recursive function to sample from the Bayesian network that all person's blood pressure is high
var sampleBN = function(numSamples, samplesSoFar) {
  // Base case: if numSamples is 0, return the samples collected so far
  if (numSamples === 0) {
    return samplesSoFar;
  } else {
    // Sample from the Bayesian network
    var smokeSample = sample(smoke);
    var exerciseSample = sample(exercise(smokeSample));
    var bloodPressureSample = sample(bloodPressure(smokeSample, exerciseSample));
    // if the sample's blood pressure is low, we should regenerate this sample
    if (bloodPressureSample === 'low') {
      return sampleBN(numSamples, samplesSoFar)
    }
    // Recursively call sampleBN with numSamples decremented and updated samplesSoFar
    return sampleBN(numSamples - 1, samplesSoFar.concat({smoke: smokeSample, exercise: exerciseSample, bloodPressure: bloodPressureSample}));
  }
};

// Define a recursive function to count smokers with high blood pressure
var countSmokersWithHighBP = function(samples) {
  // Base case: if samples array is empty, return 0
  if (samples.length === 0) {
    return 0;
  } else {
    // If current sample is a smoker with high blood pressure, add 1 to the count
    var currentSample = samples[0];
    var restSamples = samples.slice(1);
    if (currentSample.smoke === 'yes') {
      return 1 + countSmokersWithHighBP(restSamples);
    } else {
      return countSmokersWithHighBP(restSamples);
    }
  }
};

// Number of samples
var numSamples = 10000;
// Perform sampling
var samples = sampleBN(numSamples, []);
// Count the number of smokers with high blood pressure
var smokerWithHighBPCount = countSmokersWithHighBP(samples);
// Calculate the probability of a person being a smoker when we know that their blood pressure is high

var probability = smokerWithHighBPCount / numSamples;
console.log("the probability of a person being a smoker when we know that their blood pressure is high:", probability)
