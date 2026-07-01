document.getElementById("bmiForm").addEventListener("submit", function (e) {
    e.preventDefault();

    //LOOP FOR CHECKING FIELDS
    const inputs = [
        document.getElementById("name"),
        document.getElementById("age"),
        document.getElementById("weight"),
        document.getElementById("height")
    ];

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            alert("Please fill out all fields.");
            return;
        }
    }
    

    //AGE VALIDATION
    const age = parseInt(document.getElementById("age").value);
    if (isNaN(age) || age < 1 || age > 120) {
        alert("Age should be a valid number between 1 and 120.");
        return;
    }


    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        alert("Please select your gender.");
        return;
    }

    //NAME VALIDATION
    const name = document.getElementById("name").value.trim();
    const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters.");
        return;
    }


    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    //NUMERICAL VALIDATION
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Please enter valid weight and height.");
        return;
    }

    // BMI COMPUTATION
    const heightM = height / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    //MESSAGE
    let category, message, color;

    switch (true) {
        case bmi < 18.5:
            category = "Underweight";
            color = "#5DADE2";
            message = "Consider a balanced, calorie-sufficient diet.";
            break;
        case bmi < 25:
            category = "Normal";
            color = "#58D68D";
            message = "Great! Keep up your healthy habits.";
            break;
        case bmi < 30:
            category = "Overweight";
            color = "#F5B041";
            message = "Consider more physical activity and mindful eating.";
            break;
        default:
            category = "Obese";
            color = "#EC7063";
            message = "We recommend consulting a healthcare provider.";
    }

    showResult(name, bmi, category, message, color);

    recordSubmission({ name, age: document.getElementById("age").value, weight, height, bmi, category });
});


//RESULT
function showResult(name, bmi, category, message, color) {
    const resultCard = document.getElementById("resultCard");

    resultCard.classList.remove("hidden");

    resultCard.innerHTML = `
        <h2 style="color:${color};">BMI Result</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>BMI:</strong> ${bmi}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p>${message}</p>
    `;
}


//RESET
document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("resultCard").classList.add("hidden");
});

function recordSubmission(record) {
    fetch('https://script.google.com/macros/s/AKfycbwvsugtGTalbu6gvYPElrl9AaIopcC51rNc03x1Y_PVNeqtWEa4GZNeFivB_lLXjoZMLg/exec', {
        method: 'POST',
        body: JSON.stringify(record)
    }).catch(err => console.error('Could not record submission:', err));
}