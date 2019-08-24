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
    '</main>'
    ;

const test_template =
    '<main id="questions">' +
    '<button type="submit" onclick="increaseCount();generateTestView();">NEXT</button>' +
    '</main>'
    ;
