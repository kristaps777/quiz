const myArr = [];

generateWelcome();

function validateForm() {
    const select_tag_value = document.getElementById("tests_ajax").selectedIndex;
    const player_name = document.getElementById("player_name").value

    if (player_name == "") {
        alert("Please enter a name!");
    } else if (select_tag_value == 0) {
        alert("Please choose a test!");
    } else {
        const player_name_value = document.getElementById("player_name").value;
        const test_index = document.getElementById("tests_ajax").value
        generateTest(player_name_value, test_index);
    }




    // myArr.push(player_name_value, test_index);

    // console.log(myArr);


}

localStorage.setItem("myArray", myArr);
