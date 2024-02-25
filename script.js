// para gumana ung subject
document.getElementById('addSubject').addEventListener('click', function() {
    // Retrieve input values
    var subjectName = document.getElementById('subject').value;
    var units = parseFloat(document.getElementById('units').value);
    var subjectGrade = parseFloat(document.getElementById('grade').value);

    // vlidation if may kinabit na iba ung user maliban sa nakalagay lalbas to
    if (subjectName && !isNaN(units) && !isNaN(subjectGrade) && subjectGrade >= 0 && subjectGrade <= 100 && units >= 0 && units <= 15) {

        var subjectList = document.getElementById('subjectList');
        var subjectItem = document.createElement('div');
        subjectItem.textContent = subjectName + ' (' + units + ' units): ' + subjectGrade.toFixed(2);

        // remove button para sa subject dito un gagana
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Subject';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            subjectList.removeChild(subjectItem);
        });

        
        subjectItem.appendChild(removeButton);
        subjectList.appendChild(subjectItem);

        // Clear button ey
        document.getElementById('subject').value = '';
        document.getElementById('units').value = '';
        document.getElementById('grade').value = '';
    } else if (subjectGrade < 0 || units < 0) {
        // validation ulit para sa negative na valuse ng user
        alert('Grade and units cannot be negative.');
    } else {
        // validation ulit boi dat 15 lang max ng unit and ung grade is 0 to 100 lang with decimals
        alert('Please enter both subject name, units (maximum 15 units), and grade within the range of 0 to 100.');
    }
});

// dito na icaccalulate ung gwa 
document.getElementById('gwaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateGWA(); 
});

// reset buton para umulit
document.getElementById('gwaForm').addEventListener('reset', function() {
    // tangalin ung mga subject na nasa baba ng container
    document.getElementById('subjectList').innerHTML = '';
    document.getElementById('result').innerHTML = '';
});

function calculateGWA() {  
    var subjectGrades = document.querySelectorAll('#subjectList div');
    var totalGrades = 0;
    var totalUnits = 0;

    subjectGrades.forEach(function(subject) {
        var subjectInfo = subject.textContent.split(': ')[0];
        var subjectGrade = parseFloat(subject.textContent.split(': ')[1]);
        var subjectUnits = parseFloat(subjectInfo.split('(')[1].split(' ')[0]); 
        totalGrades += subjectGrade * subjectUnits;
        totalUnits += subjectUnits;
    });

  
    if(totalUnits > 0) {
        var gwa = totalGrades / totalUnits;
        document.getElementById('result').innerHTML = "<p>Your Grade Weighted Average (GWA) is: " + gwa.toFixed(2) + "</p>";

        // validation ulit if asok ka sa pl or dl
        if (gwa >= 1.00 && gwa <= 1.25) {
            document.getElementById('result').innerHTML += "<p>Congratulations! You are eligible for the President's List!</p>";
        } else if (gwa >= 1.26 && gwa <= 1.75) {
            document.getElementById('result').innerHTML += "<p>Congratulations! You are eligible for the Dean's List!</p>";
        }
    } else {
        // validation ulit if nakapaglagay ba ng subject ung user sa input dapat meron
        alert('Please add subjects to calculate GWA.');
    }
}
