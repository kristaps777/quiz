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
        player_name_global = player_name
        test_name_global = document.getElementById("tests_ajax").value;

        for (let i = 0; i < all_options.length; i++) {
            if (test_name_global == all_options[i].innerHTML) {
                test_id_global = all_options[i].id;
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
}

// increase the question counter global variable
function increaseCount() {
    return question_counter_global++;
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
    xhr.open('GET', 'https://printful.com/test-quiz.php?action=quizzes');
    xhr.send();
}

function getTestQuestions() {
    // new request object
    let xhr = new XMLHttpRequest();

    // callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const question_target = document.getElementById('questions');
            const question_container = document.createElement("h2");

            // parse the xhr request response; this creates an array of objects
            let questions_list = JSON.parse(xhr.responseText);
            questions_array_global.push(questions_list);


            question_container.innerHTML = questions_array_global[0][question_counter_global]["title"];
            question_target.appendChild(question_container);

            // loop through the parsed response, grab the test titles and put them into generated option tags
            // for (let i = 0; i < questions_list.length; i++) {

            //     const placeholder = document.createElement("h2");
            //     const break_tag = document.createElement("br");
            //     placeholder.innerHTML = questions_list[i]["title"];

            //     question_target.appendChild(placeholder, break_tag);

            // }

        } else {
            // fallback action needed here 
        }

    }

    // open & send request
    xhr.open('GET', 'https://printful.com/test-quiz.php?action=questions&quizId=' + test_id_global);
    xhr.send();

}
