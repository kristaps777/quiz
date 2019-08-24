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
