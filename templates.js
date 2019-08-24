const welcome_template =
    '<main>' +
    '<h1> The Quiz</h1>' +
    '<form action="">' +
    '<label for="player_name">Your name:</label>' +
    '<input type="text" id="player_name" name="player_name" placeholder="Enter your name" autocomplete="off">' +
    ' <label for="tests_ajax">Choose your test:</label>' +
    '<select name="" id="tests_ajax"></select>' +
    '<button type="button" id="submit" onclick="validateForm();">NEXT</button>' +
    '</form>' +
    '</main>'
    ;

const test_template =
    '<h1>TEST</h1>' +
    '<p>' + player_name_value + '</p>' +
    '<p>' + test_index + '</p>'
    ;
