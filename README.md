# quiz

Hi!
In this readme.md file I will describe the structure of the Quiz page.

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
  functions.js
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
