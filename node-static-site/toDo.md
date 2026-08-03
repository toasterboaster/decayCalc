~~Refactor the time formats so that it can be worked into functions etc. Right now its a mess of different formats and multiple units and variables ie a date value and a time value but i need to work with the data to add to it etc.~~
~~do an example function where all the vaariables will be set with one button and will output the answer in new time the activity will be at the target activity~~
~~add functionality of given the time and the target time how much activity will be left over~~
~~fix buttons not staying highlighted after clicked until another isotope button is clicked~~
make a seperate window/menu pop up with selections of the inputs depending on wehter you want to find target activity or target time
    ~~-plan and figure out how hidden feature works in CSS and javascript html etc.~~
        ~~-make all the inputs for target time and activity and initial time and activity hidden~~
        ~~-make buttons funtional so that they remove hidden class of target activity input when trying to find the target time and remove hidden class of target time input when trying to find target activity.~~
    ~~-make buttons so that when buttons either target time or target activity are selected the irrelevant input selectors are hidden leaving only the relevant inputs and a calculate button~~
    ~~-make window popup for find target activy~~
        ~~-add inputs and calculate button~~
        ~~-make the calculate function work when button pressed~~
    ~~-make window popup for target time~~
        ~~-add inputs and calculate button~~
        ~~-make calculate functoin work when button pressed~~
~~-how is another page added to my site. just another html file under public?~~
~~-use backend to make my test page visible so I can see button color mockups~~
~~-understand the server.js page in its current form~~
~~-style calculate selection buttons~~
~~-have the calculate selection button that is selected either time or activity stay highlighted until calculate button is clicked~~
~~-multiple calculations in a row arent working especially target activity~~
    ~~-reset inputs to zero or null after calculate button hit~~
    ~~-reset opposite vaues to zero so if target acvtivity looking for have target time be seet to null but if target time then clicked set target activity set back to null~~
~~-calculate selection buttons to stay highlighted when other buttons are clicked only change when other selection type is clicked or reset button clicked~~
~~-calculate button stay highlighted when clicked until new button is clicked~~
~~-change appeareance of activity input field, its too large and calculate buttons~~
~~-make favicon for browser tab~~
-plan functionality of progress bar
    ~~-~timer driven rendering, using setInterval and CSS~~
    ~~-create the progress bar~~
    ~~-have progress bar reset when calulate is pressed and when reset button is pressed~~
    ~~-need to have it set so you have the initial activity, and the target activity is when the progress bar completes.~~
    -alternatively you have the bar complete for when the activity will hit below background or ten times its half life
    -should the bar decrease, as in hit zero, for activity running out? Opposite of a progress bar filling up loading etc?
    ~~-set the css to animate the transitions~~
    ~~-set the javascrpt to set the state using Setinterval~~
    ~~-call render to increment using setInverval~~
    ~~-have text in progressBar that dissapears when calculate is selected~~
    ~~-when progress bar reaches 100 have text in span change to "reached target activity"~~
    ~~-functionality of a progress bar with both target activity vs target time??~~
    ~~-set all querey selectors in the try.js where building global variables and global functons to make main.js cleaner~~
    ~~-troubleshoot try.js as it wont work because of null values i think...~~
    ~~-check to see if setinitalValuesfunction will work when called in calulate function even if all those values arent used?~~
    ~~-set function to grab values from inputs for targets and set them as globl variables~~
    ~~-set now button functionality for current time date set up~~
    ~~-set the current activity set so its a functoin that can be called every 5 seconds using set interval and then it updates the span with its new value.~~
    -make the progressBar function into a generic function set all the variables into it as parameters, that way i can reuse that function for the progressToBackgroundBarS
    -progressToBackgroundBar currently not functioning maybe because of css rendering?
    -make the live activity display be optional with a button as i fear it requires a lot of time and computage from the javascript having to update so much, slows down website
    -plan to use local datetime as a seperate ux
    -set progress bar to hit zero when isotope decays away to zero?
        -add second small progress bar that shows until isotope hits zero or background and the time that will happen
        -use time to target as the duration and then can use similar function from progress bar
            -use solveForTime equation that gives you time needed to hit zero, whichever is chosen for zero. which will give the const end variable from the progress bar function. which is used in the percent variable to show the progress. The progressBar function itself could probably be rewritten to be outside the Calculate function and just used inside of it.
                -write this function as a global function and call it inside the calculate function. Then eventually could implement it with the progress bar function as well.
                -set global variables, intitalTime, isotopeSelected, initialActivity, targetAcvitivity, targetTime, calculation mode, etc. That way when calculate function is pressed it will lock those variables into place. When now button is pressed the global values are locked in and show that current time. Then the calculate function can pull those global variables.
        -have text in timeToBackgroundProgressBar switch to saying time to background and it has a countdown
-have the alert show if target activity isnt selected or add it to current alert--- as in have the alert tell you axactly what is missing.
-set the alert to show what variable or input is 
-cant use zero as target activity. fix this.
    -add edge case. 0.0001 0.5 0.00000002 all work. Only 0.0 exact wont work. Add to function that if 0 exact is chosen then solve for when activity reaches less than 0.02 will be considered as 0.
    -set what you want zero or background to be. Right now it is set for 1e-10 but the user could set it to 0.02 or whatver.
        -make an input, that can only accept numbers from 1e-10 up to 0.1, then set the variable in the solveForTime function to replace N with the selected value. Or could have it be 10 half lives?
        -keep this value until it is changed. 
        -Would this work with different units? right now mCi is sued but would CPM be able to work?
-add a button to the time selector that will set the time to now as in the current time and date
-set the main.js file so that all the variables and document.getelement etc etc are defined at top of page
-catch errors in regards to the intial time set after the target time
-keep the calcualte type selection buttons highlighted until the other is clicked to see which type of calculation you are doing
-keep the whole app set to show on the whole page without scrolling
-have input container children reset to hidden when calculate button is selected...maybe
    -work out if this is a good design or flaw. ie if you want to do multiple time calculations you only have to change the input fields and not press the button every time etc.
-have a span of light grey text show up next to activity inputs when proper select calculate button is selected
-have a current activity span with pop up next to calculated displayed values at the top. This shows the current acticity of the isotope.
-work on this side of the site that can be used for htmx. Especially for sites that not as app heavey and demand heavy as the backened for something like a full app.
Some ex - react, flask and astro can be used for the development of front facing apps
can also use just vanilla javascript, html and css, look into other options for the css end like SASS or CASS,
SEo and web tool vitals important for respoveniss and the load time of the page. This effects wether it shows up further up on the page or if it shows up on lower pages of a browser search. Sone examples would include google usdes ad
~~-upload to github~~
-add a now time and date button. so it puts todays date and time in the inputs
-add a other button with drop down menu to select other isotopes and add those to db
-play around with text span centered in the progress bar. Does it move with the bar or stay. Have it overflow the container etc?
-Add hours to the input and calculator. Instead of having to choose a time you could say after 60 hours how much activity is there? Add this to target Activity
-make progress bar functoin a global function and add variables that are needed to moved outside the calculate function if possible. Some variables are only stored from when the calculate button is pushed tho...
-change date time as seperate into one input which is an html input type called datetime-local
- add another page to use another path on the backend using the server papge.
-play with disabling inputs from that are needed for certain calculate modes
-is current date and time format for the inputs only set for Central time?
-Remove top banner saying welcome to node static site
-set current isotope span and value to appear in the current values div in the top display contianer
-change the current value displays or live displays to be better designed. Larger current activity maybe centered with the smaller time underneath