# quiz

Hello!
In this readme.txt file I will describe the structure of the Quiz page.

There are also comments throughout the script files, where I tried to explain what's being done and also wrote down
a few personal notes and problems I came accross.

PROJECT STRUCTURE

----------------------------------------------------------------------------------------------------------------
img
  background.jpg
 
This folder holds a single image used for the background of the page via the styles.css.

----------------------------------------------------------------------------------------------------------------

scripts
  config.js
  
The config.js file holds a few empty global variables for storing values like quizID, answerID, correct answerID, 
question progress and a couple of request links. Since I'm not using any BackEnd solutions, these global variables are 
essential to make everything work.
 
----------------------------------------------------------------------------------------------------------------

  functions.js
  
The function.js file is the 'armory', so to speak. All of the big guns are stored here.
 
generateWelcomeView() and getTestNames() are called first from main.js. More on this below in the description for main.js file.
 
When the 'next' button in index.html 'welcome' view is clicked, validateForm() fires to check, if a name is entered and 
if a quiz is selected. If one of these is true, an error message is displayed in the 'error messages' box. If everything is 
OK, it stores player name and selected quiz ID in global variables and calls upon generateTestView();
 
generateTestView() grabs one of the templates from templates.js and also fires getTestQuestions(), getQuestionAnswers() and 
setProgress().
 
getTestQuestions() sends a request with the unique quiz ID to the server and returns a list of questions for that particular quiz. 
All of the quiz questions get pushed into an array (which is also a global variable) and the first question from the array 
is displayed to the user.
getQuestionAnswers() sends another request with the unique quiz ID to the server and returns a list of answers for that particular 
quiz. The answers are then wrapped in <label> tags, coupled with an <input type="radio"> tag, which is not displayed, and put 
inside a <div> tag. All of the <div> tags are then appended to the corresponding cotainer for display.
setProgress() generates a number of <div> tags and places them in the correspoding container to be displayed as a progress bar. 
The number of the <div> tags corresponds to the number of questions currently in the questions_array_global variable.
  
When the 'next' button in the 'quiz' view is clicked answerListener(), increaseCount() and generateNextTestView() are fired. There 
is no check, if an answer has been selected or not, the user can skip any number of questions, if he chooses.
  
answerListener() checks, if a radio button on the page is checked. If so, the ID attribute of the radio button, which in this 
case corresponds to the unique ID of the answer, is pushed to user_answers_global, which is another global variable for storing 
user answers.
  
increaseCount() uses 2 global variables - question_counter_global and questions_array_global - and checks if the counter, which 
has a default value of 0, is not equal to the number of questions present in the global array variable. If so, the value of the 
counter is increased by 1, otherwise nothing happens. We use this counter to determine, which question the user is currently on, 
and modify the progress bar based on the value stored. Also, this counter is present in getTestQuestions() to advance through 
all questions.
  
generateNextTestView() does exactly what generateTestView() does, but with an added check, if the global question counter has 
reached the limit of the number of questions present in the global array. If so, generateResultsView() is fired.
  
generateResultsView() grabs the corresponding template from templates.js, and inserts a few dynamic values inside. Player name 
is pulled in from player_name_global variable, and the total number of questions is pulled from questions_counter_global variable. 
Since there is a local question counter present, there is no need for an additional server request to check, how many questions 
were in the quiz, the local number is sufficient. getCorrectAnswers() is also fired to get the value of correct answers from the 
server.
  
getCorrectAnswers() sends a request to the server to validate the unique answer ID's stored in the user_answers_global variable. To 
achieve this buildSubmitLink() is called as a parameter of xhr.open().
  
buildSubmitLink() uses a few of the global variables declared in config.js. aswers_link_global, holds the core of the link without 
any of the dynamic parts, like quizID for example. So, to start off, the unique quiz ID, stored previously in quiz_id_global, 
is added to the end of the link. The modified link is then put through a loop and unique answer ID's stored in user_aswers_global 
are also added to the end of the link. When the link is complete, the function returns it.
  
The 'results' view has no 'next' button. Instead, there is a 'start over' button with an onclick attribute and
"window.location.reload();" as the value. When the user clicks this button, the Quiz, or index.html page to be more precise, 
is refreshed and the user is free to start the whole thing over.
 
----------------------------------------------------------------------------------------------------------------

  main.js
  
A very small .js file with only 2 lines of executable code to get things going. generateWelcomView() is called to display
the first view of index.html and getTestNames() is also called to fill the <select> tag with a list of available quizzes.
The rest of the flow is carried on from within other functions, for example, the next function in line to be executed
is validateForm(), which checks if a name is entered and if a quiz is selected, and if they are, calls for generateTestView(),
which carries the flow further.
  
----------------------------------------------------------------------------------------------------------------

  templates.js
  
The templates.js file contains 3 variables with HTML code stored in them. Each of the variables corresponds to a 
different view of the page - Welcome view, Test (or quiz) view and Results view. The templates hold the core structure
of the view, they are static with no dynamic elements. The dynamic parts get added in using functions stored in functions.js
file. Every time a view needs to be generated, the corresponding function accesses the template in question and replaces 
the content of the <body> tag with the template. Dynamic content is added later.
  
----------------------------------------------------------------------------------------------------------------

styles
  style.css
  
The styles folder contains a single CSS file for the styles used in index.html. Since most of the styling is quite basic,
there are no additional comments in the file.
 
----------------------------------------------------------------------------------------------------------------

index.html

The index.html file contains only the core HTML structure - DOCTYPE, <html>, <head> and <body> tags. Inside the <head> tag
there are a few <meta> tags and <link> tags for a Google font, CSS stylesheet, jQuery and all of the local scripts, located in 
the scripts folder. The <body> tag is blank, it has no default content. All of the content is generated via scripts.
  
----------------------------------------------------------------------------------------------------------------

FINAL NOTICE

Since I've never used AJAX requests before, I wasn't able to handle any fallback actions, in case there is something 
wrong with the response from the server. It is possible that the Quiz will not work properly on some occasions, the questions 
might not be displayed, or the answers might not load correctly and lag 1 question behind. I tried to address this by adding 
timeouts to the requests and it did help, but unfortunately it's not a perfect solution. If you come accross any display errors,
please reload the page, and hopefully everything should run correctly.
