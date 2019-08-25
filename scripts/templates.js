/*
basic templates for the 3 views
the rest of the content within the templates is generated via functions in functions.js
*/

const welcome_template =
    '<main>' +
    '<h1>Welcome to my Quiz!</h1>' +
    '<section id="error_messages"></section>' +
    '<form action="">' +
    '<label for="player_name">Your name:</label>' +
    '<input type="text" id="player_name" name="player_name" placeholder="Enter your name" autocomplete="off" spellcheck="false" maxlength="10">' +
    '<label for="tests_ajax">Choose your test:</label>' +
    '<select name="" id="tests_ajax"></select>' +
    '<button type="button" id="submit" onclick="validateForm();">NEXT</button>' +
    '</form>' +
    '</main>' +
    '<section id="cream"></section>'
    ;

const test_template =
    '<main id="questions">' +
    '<h2 id="question_container"></h2>' +
    '<section id="answers"></section>' +
    '<section id="progress"></section>' +
    '<button id="submit_button" type="button" onclick="answerListener();increaseCount();generateNextTestView();">NEXT</button>' +
    '</main>'
    ;

const score_template =
    '<main>' +
    '<h2 id="player"></h2>' +
    '<h3 id="score"></h3>' +
    '<button type="button" onclick="window.location.reload();">START OVER</button>' +
    '</main>'
    ;
