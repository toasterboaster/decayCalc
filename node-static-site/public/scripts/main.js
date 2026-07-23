//Get Query Selectors and set them
let initialActivityInput = document.querySelector('#initialActivityInput');
let progressStartText = document.querySelector('#progressStartText');
let initialActivityValue = document.querySelector('#intialAcvtivityValue');
let initialTimeValue = document.querySelector('#initialTimeValue');
let targetActivityValue = document.querySelector('#targetActivityValue');
let targetActivityInput = document.querySelector('#targetActivityInput');
let targetTimeValue = document.querySelector('#targetTimeValue');

let initialTime;
let isotopeSelected;

//Set active state functions
function setActiveButton(activeButton, selector) {
  document.querySelectorAll(selector).forEach(button => {
    button.classList.toggle('selected', button === activeButton);
  });
}

function setProgressState(state) {
    progressStartText.classList.toggle('hidden', state !== 'start');
    progressCalcText.classList.toggle('hidden', state !== 'calc');
    targetAchievedSpan.classList.toggle('hidden', state !== 'done');
}

//sets Isotope selection
document.querySelectorAll('.isotopeButton').forEach(button => {
    button.addEventListener('click', () => {
        setActiveButton(button, '.isotopeButton');
        isotopeSelected = button.textContent.trim();
        console.log(`Isotope selected: ${isotopeSelected}`);
    });
});

//Global variables for progress bar
let progressTimer = null;
let startTime = null;

//decay equation
function decayExponential(N0, lambda, t) {
  console.log(`Calculating decay with N0: ${N0}, lambda: ${lambda}, t: ${t}, answer: ${N0 * Math.exp(-lambda * t)}`);
  return N0 * Math.exp(-lambda * t);
}

function solveForTime(N0, N, lambda) {
  if (lambda <= 0 || N0 <= 0) {
    throw new Error("Invalid input values for time calculation")
    alert("Invalid input values for time calculation. Please ensure that lambda and N0 are greater than 0." );
  }
  if (N <= 0) {
    N = Math.max(N, 1e-10);
  }
  console.log(`Calculating time with N0: ${N0}, N: ${N}, lambda: ${lambda}`);
  return Math.log(N0 / N) / lambda;
}

//decay constants in minutes
let decayConstantsMinutes = {
  Tc99m: 0.001922,      // half-life: 6.01 hours
  I131: 0.00006002,     // half-life: 8.02 days
  Cs137: 4.38e-8,       // half-life: 30.07 years
  F18: 0.006314,        // half-life: 109.77 minutes
  Ga68: 0.010237,       // half-life: 67.71 minutes
  I123: 0.0008737,      // half-life: 13.223 hours
  Cu64: 0.0009096,      // half-life: ~12.7 hours
  Lu177: 0.0000724,     // half-life: 6.647 days
  N13: 0.0696           // half-life: 9.965 minutes
};

//Now button functionality
function setNow(input) {
  const d = new Date();
  input.value = d.toISOString().slice(0,16);
}

//Set app default states
//use button to select calulation type and hides the other input fields
  //first hide all of inputcontainer
  function hideAllInputs() {
  let parent = document.getElementById('inputContainer');
  Array.from(parent.children).forEach(child => {
    child.classList.add("hidden");
});
  };

  window.addEventListener('load', () => {
    hideAllInputs();
  });

  setProgressState('start');


//set mode to nothing
let mode = null;

//reset calculate state
  //reset the calculate button state to not calculated
function resetCalculateState() {
  let calculateBtn = document.getElementById('calculate');
  calculateBtn.classList.remove('calculated');
}
  //all buttons will reset calculate state except the actual calculate button
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.id !== 'calculate') {
    resetCalculateState();
  }
});
  //all input changes will reset the calculate button state to not calculated
  document.addEventListener('input', resetCalculateState);
  //all dropdown checkboxes etc will reset the calculate button state to not calculated
  document.addEventListener('change', resetCalculateState)


//SET MODE TO CALCULATE TARGET ACTIVITY OR CALCULATE TARGET TIME
  //calculate the target activity at a given time selected; then make target activity input hidden 
    // and initial time, initial activity, and target time input visible 
document.getElementById('calculateTargetActivity').addEventListener('click', () => {
    hideAllInputs();
    document.getElementById('initialActivitySelect').classList.toggle('hidden');
    document.getElementById('initialTimeSelect').classList.toggle('hidden');
    document.getElementById('targetTimeSelect').classList.toggle('hidden');
    setActiveButton(document.getElementById('calculateTargetActivity'), '.calculateTypeButton');
    mode = 'calculateTargetActivity';
    targetActivityValue.textContent = 'Calculating...';
});
  
//calculate the target time for a given activity selected; then make target time input hidden 
  //and initial time, initial activity, and target activity input visible
document.getElementById('calculateTargetTime').addEventListener('click', () => {
  hideAllInputs();
  document.getElementById('initialActivitySelect').classList.toggle('hidden');
  document.getElementById('initialTimeSelect').classList.toggle('hidden');
  document.getElementById('targetActivitySelect').classList.toggle('hidden');
  setActiveButton(document.getElementById('calculateTargetTime'), '.calculateTypeButton');
  mode = 'calculateTargetTime';
  targetTimeValue.textContent = 'Calculating...';
});

//CALCULATE FUNCTION
document.getElementById('calculate').addEventListener('click', () => {
  document.getElementById('calculate').classList.add('calculated');
  //clear progress bar and timer if already running
  document.querySelector('.progressBar').style.width = "0%";
  if (progressTimer) {
  clearInterval(progressTimer);
}
  //Clear text span when calculate is running and show calculate in progress
  setProgressState('calc');

  //set initial time and initital activity from input
  let date = document.getElementById('initialDateInput').value;
  let time = document.getElementById('initialTimeInput').value;

  initialTime = new Date(`${date}T${time}`);
  initialTimeValue.textContent = initialTime;
  initialActivityValue.textContent = initialActivityInput.value;
  targetActivityValue.textContent = targetActivityInput.value;
 
  //decay equation variables
  let N0 = parseFloat(initialActivityInput.value);
  let lambda = decayConstantsMinutes[isotopeSelected];

  //set target activity or target time from input

  let N = parseFloat(targetActivityInput.value);

  if (!N0 || !lambda) {
    alert(`Missing initial activity or isotope. N0: ${N0}, lambda: ${lambda}, isotopeSelected: ${isotopeSelected}`);
    return;
  }

  let targetDateTime = null;
  let newTime = null;

  //if no target activity, use target date and time to calculate target activity
  if (mode == 'calculateTargetActivity') {
    targetActivityInput.value = '';
    let targetDate = document.getElementById('targetDateInput').value;
    let targetTime = document.getElementById('targetTimeInput').value;
    targetDateTime = new Date(`${targetDate}T${targetTime}`);
    let timeDiffMinutes = (targetDateTime - initialTime) / 60000;
    targetTimeValue.textContent = targetDateTime;

    let targetActivity = decayExponential(N0, lambda, timeDiffMinutes);
    targetActivityValue.textContent = targetActivity.toFixed(2);
  }
  //calculate time needed to reach target activity
  if (mode == 'calculateTargetTime') {
  let timeNeeded = solveForTime(N0, N, lambda);
  newTime = new Date(initialTime.getTime() + timeNeeded * 60000);
  targetTimeValue.textContent = newTime
  }

// Progress Bar
let progress = 0;

function render(percent) {
  document.querySelector('.progressBar').style.width = percent + "%";
}

const start = initialTime.getTime();
const end = (mode === 'calculateTargetActivity')
  ? targetDateTime.getTime()
  : newTime.getTime();

progressTimer = setInterval(() => {
  const now = Date.now();
  const percent = ((now - start) / (end - start)) * 100;

  render(percent);

  if (percent >= 100) {
    clearInterval(progressTimer);
    setProgressState('done');
  }
}, 50);


return;
});

//RESET ALL INPUTS FUNCTION
function resetAllInputs() {
  initialDateInput.value = '';
  initialTimeInput.value = '';
  initialActivityInput.value = '';
  targetActivityInput.value = '';
  targetDateInput.value = '';
  targetTimeInput.value = '';

  // Also clear displayed results
  initialTimeValue.textContent = '';
  initialActivityValue.textContent = '';
  targetActivityValue.textContent = '';
  targetTimeValue.textContent = '';

  setActiveButton(null, '.isotopeButton');
  setActiveButton(null, '.calculateTypeButton');
  isotopeSelected = null;

  //And reset progress bar
  document.querySelector('.progressBar').style.width = "0%";
  clearInterval(progressTimer);
  setProgressState('start');


}
//run reset function on reset button click
document.getElementById('reset').addEventListener('click', resetAllInputs);




function formatTime(d) {
    return d.toLocaleString();
}

 