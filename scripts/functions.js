// validates the form in 'welcome' view
function validateForm() {
    const select_tag_value = document.getElementById("tests_ajax").selectedIndex;
    const player_name = document.getElementById("player_name").value;
    const all_options = document.querySelectorAll("option");
    const errorMsg = document.getElementById('error_messages');

    // checks if player name is given and if a test is selected
    if (player_name == "") {
        errorMsg.innerText = '';
        return errorMsg.innerText += "-- please enter a name --";
    } else if (select_tag_value == 0) {
        errorMsg.innerText = '';
        return errorMsg.innerText += "-- please select a test --";
    } else {
        // if the form is ok, store player name and test name, and get the unique ID of the selected test
        player_name_global = player_name;
        quiz_name_global = document.getElementById("tests_ajax").value;

        for (let i = 0; i < all_options.length; i++) {
            if (quiz_name_global == all_options[i].innerHTML) {
                quiz_id_global = all_options[i].id;
            }
        }

        // 'switch' to the 2nd view
        generateTestView();
    }

}

// generates the 1st 'welcome' view using a template from templates.js
function generateWelcomeView() {
    document.querySelector("body").innerHTML = welcome_template;
}

// generates the 2nd 'questions' view using a template from templates.js
function generateTestView() {
    document.querySelector("body").innerHTML = test_template;
    getTestQuestions();
    setTimeout(function () { getQuestionAnswers(); }, 800);
    setTimeout(function () { setProgress(); }, 800);
}

function generateNextTestView() {
    if (question_counter_global == questions_array_global[0].length) {
        generateResultsView();
    } else {
        document.querySelector("body").innerHTML = test_template;
        getTestQuestions();
        setTimeout(function () { getQuestionAnswers(); }, 800);
        setTimeout(function () { setProgress(); }, 800);
    }
}

// generates the 3nd 'results' view using a template from templates.js
function generateResultsView() {
    document.querySelector("body").innerHTML = score_template;

    const greeting = document.getElementById("player");
    const score = document.getElementById("score");

    greeting.innerHTML = "WELL DONE, " + player_name_global + "!";
    score.innerHTML = "You answered ?? of " + question_counter_global + " questions correctly!";
}

// increase the question counter global variable
function increaseCount() {
    if (question_counter_global !== questions_array_global[0].length) {
        return question_counter_global++;
    }
}

// get all available tests for the 'welcome' view
function getTestNames() {
    // new request object
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // create the first, default option tag for the tests list
            const test_item_default = document.createElement('option');
            // reference the tests list select tag already present in HTML
            const test_items = document.getElementById("tests_ajax");
            // parse the xhr request response; this creates an array of objects
            let tests_list = JSON.parse(xhr.responseText);

            // add attributes to the first, default option tag
            test_item_default.setAttribute("selected", "");
            test_item_default.setAttribute("disabled", "");
            test_item_default.setAttribute("hidden", "");
            test_item_default.innerHTML = "Choose test";

            // append the option tag to the tests list
            test_items.appendChild(test_item_default);

            // loop through the parsed response, grab the test titles and put them into generated option tags
            for (let i = 0; i < tests_list.length; i++) {

                let option_tag = document.createElement('option');
                option_tag.innerHTML = tests_list[i]["title"];
                option_tag.id = tests_list[i]["id"];

                // append each option tag to the tests list
                test_items.appendChild(option_tag);
            }

        } else {
            // fallback action needed here 
        }

    }

    // open & send request
    xhr.open('GET', quiz_names_link_global);
    xhr.send();
}

function getTestQuestions() {
    // new request object
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const question_target = document.getElementById('question_container');

            // parse the xhr request response; this creates an array of objects
            let questions_list = JSON.parse(xhr.responseText);
            questions_array_global.push(questions_list);

            question_id_global = questions_array_global[0][question_counter_global]["id"];
            question_target.innerHTML = questions_array_global[0][question_counter_global]["title"];

        } else {
            // fallback action needed here 
        }

    }

    // open & send request
    xhr.open('GET', 'https://printful.com/test-quiz.php?action=questions&quizId=' + quiz_id_global);
    xhr.send();

}

function getQuestionAnswers() {
    // new request object
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const answer_target = document.getElementById('answers');

            // parse the xhr request response; this creates an array of objects
            let answers_list = JSON.parse(xhr.responseText);

            for (let i = 0; i < answers_list.length; i++) {

                let div_tag = document.createElement('div');
                let label_tag = document.createElement('label');
                let radio_tag = document.createElement('input');

                div_tag.setAttribute("class", "answer");

                label_tag.setAttribute("for", answers_list[i]["id"]);
                label_tag.innerHTML = answers_list[i]["title"];

                radio_tag.id = answers_list[i]["id"];
                radio_tag.setAttribute("type", "radio");
                radio_tag.setAttribute("name", "quiz_answer");
                radio_tag.setAttribute("class", "quiz_radio");

                // append each option tag to the tests list
                div_tag.appendChild(radio_tag);
                div_tag.appendChild(label_tag);
                answer_target.appendChild(div_tag);

            }


        } else {
            // fallback action needed here 
        }

    }

    // open & send request
    xhr.open('GET', 'https://printful.com/test-quiz.php?action=answers&quizId=' + quiz_id_global + '&questionId=' + question_id_global);
    xhr.send();

}

function setProgress() {
    const progress_bar = document.getElementById("progress");

    for (let i = 0; i < questions_array_global[0].length; i++) {
        const progress_div = document.createElement("div");
        progress_div.setAttribute("class", "empty_progress");
        progress_bar.appendChild(progress_div);
    }

    const all_progress = document.getElementsByClassName("empty_progress");
    all_progress[question_counter_global].classList.add("in_progress");
}

function getCorrectAnswers() {
    // new request object
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const target = document.getElementById('cream');

            // parse the xhr request response; this creates an array of objects
            let answers_list = JSON.parse(xhr.responseText);
            console.log(answers_list);


        } else {
            // fallback action needed here 
        }

    }

    // open & send request
    xhr.open('GET', 'https://printful.com/test-quiz.php?action=submit&quizId=141&answers[]=57737&answers[]=262891');
    xhr.send();

}

function answerListener() {
    let all_radios = document.querySelectorAll(".quiz_radio");
    for (let i = 0; i < all_radios.length; i++) {
        if (all_radios[i].checked == true) {
            user_answers_global.push(all_radios[i].getAttribute("id"));
        }
    }
}
