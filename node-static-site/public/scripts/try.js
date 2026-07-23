//Global Variables
let date = null;
let time = null;
let initialActivity = null;
let initialTime = null;
let targetActivity = null;
let targetDate = null;
let targetTime = null;
let targetDateTime = null;
let isotopeSelected = null;
let newTime = null;
let currentTime = null;
let progressTimer = null;
let startTime = null;
let mode = null;
let progress = 0;

//Query Selectors for all buttons and inputs
    //buttons
let isotopeButton = document.getElementById('isotopeButton');
let calculateButton = document.getElementById('calculate');
let calculateTargetActivityButton = document.getElementById('calculateTargetActivity');
let calculateTargetTimeButton = document.getElementById('calculateTargetTime');
let resetButton = document.getElementById('resetButton');
    //inputs
let initialDateInput = document.getElementById('initialDateInput');
let initialTimeInput = document.getElementById('initialTimeInput');
let initialActivityInput = document.getElementById('initialActivityInput');
let targetDateInput = document.getElementById('targetDateInput');
let targetTimeInput = document.getElementById('targetTimeInput');
let targetActivityInput = document.getElementById('targetActivityInput');
    //containers
let inputContainer = document.getElementById('inputContainer');
let initialActivitySelect = document.getElementById('initialActivitySelect');
let targetActivitySelect = document.getElementById('targetActivitySelect');
let initialTimeSelect = document.getElementById('initialTimeSelect');
let targetTimeSelect = document.getElementById('targetTimeSelect');
    //display values and texts from inputs and calculations in these selected spans
let initialTimeValue = document.getElementById('initialTimeValue');
let initialActivityValue = document.getElementById('initialActivityValue');
let targetTimeValue = document.getElementById('targetTimeValue');
let targetActivityValue = document.getElementById('targetActivityValue');
    //Progress bar and progress text spans
let progressBar = document.querySelector('.progressBar');
let progressStartText = document.getElementById('progressStartText');
let progressCalcText = document.getElementById('progressCalcText');
let targetAchievedSpan = document.getElementById('targetAchievedSpan');

//Set active state functions
    //set active button for calculation type selection
function setActiveButton(activeButton, selector) {
  document.querySelectorAll(selector).forEach(button => {
    button.classList.toggle('selected', button === activeButton);
  });
}
    //set state for Progress bar and text spans within
function setProgressState(state) {
    progressStartText.classList.toggle('hidden', state !== 'start');
    progressCalcText.classList.toggle('hidden', state !== 'calc');
    targetAchievedSpan.classList.toggle('hidden', state !== 'done');
}
    //set all inputs to hidden state within input container
function hideAllInputs() {
  Array.from(inputContainer.children).forEach(child => {
    child.classList.add("hidden");
});
  };

//Set app default states
//use button to select calulation type and hides the other input fields
  //first hide all of inputcontainer on page load
window.addEventListener('load', () => {
    hideAllInputs();
});
    //set progressBar state to start
setProgressState('start');

//decay equation and time calculation functions
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

//calculate Button state reset function//reset calculate state
  //reset the calculate button state to not calculated
function resetCalculateState() {
  calculateButton.classList.remove('calculated');
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

//Set global variables from inputs and buttons, isotopeselected from button, initial time and activity from inputs etc
//sets Isotope selection
document.querySelectorAll('.isotopeButton').forEach(button => {
    button.addEventListener('click', () => {
        setActiveButton(button, '.isotopeButton');
        isotopeSelected = button.textContent.trim();
        console.log(`Isotope selected: ${isotopeSelected}`);
    });
});

//sets initial time and activity from inputs
function setInitialValues() {
    initialDate = initialDateInput.value;
    initialTime = initialTimeInput.value;
    initialActivity = parseFloat(initialActivityInput.value);
    initialTime = new Date(`${initialDate}T${initialTime}`);
    initialTimeValue.textContent = initialTime;
    initialActivityValue.textContent = initialActivityInput.value;
    console.log(`Initial values set: Date: ${initialDate}, Time: ${initialTime}, Activity: ${initialActivity}`);
}
//set target values from inputs
function setTargetValues() {
    targetDate = targetDateInput.value;
    targetTime = targetTimeInput.value;
    targetActivity = parseFloat(targetActivityInput.value);
    console.log(`Target values set: Date: ${targetDate}, Time: ${targetTime}, Activity: ${targetActivity}`);
}
