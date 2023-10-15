// Function to clear student data from local storage on homepage (student-registration.html) load
function clearStudentData() {
    localStorage.removeItem("students");
}
// Function to save student data to local storage (student-registration.html)
function saveStudentData() {
    const rollNo = document.getElementById("rollNo").value;
    const name = document.getElementById("name").value;
    const cgpa = document.getElementById("cgpa").value;
    const backlogs = document.getElementById("backlogs").value;
    const branch = document.getElementById("branch").value;
    const languages = document.getElementById("languages").value;
    const student = {
        rollNo: rollNo,
        name: name,
        cgpa: cgpa,
        backlogs: backlogs,
        branch: branch,
        languages: languages
    };
    let students = JSON.parse(localStorage.getItem("students")) || [];   
    students.push(student);  
    localStorage.setItem("students",JSON.stringify(students));
    alert("Student data saved successfully!");
    return false;
}
// Function to retrieve and display students on view-students.html
function displayStudents() {
    const studentsTableBody = document.getElementById("studentsTableBody");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    studentsTableBody.innerHTML = ""; // Clear the existing table content
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.cgpa}</td>
            <td>${student.backlogs}</td>
            <td>${student.branch}</td>
            <td>${student.languages}</td>
            <td>
                <button onclick="editStudent('${student.rollNo}')">Edit</button>
                <button onclick="deleteStudent('${student.rollNo}')">Delete</button>
            </td>`;
        studentsTableBody.appendChild(row);
    });
}
// Function to delete student data (updated to use rollNo as a string)
function deleteStudent(rollNo) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentIndex = students.findIndex(student => student.rollNo === rollNo);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    } else {
        alert("Student not found.");
    }
}
// Call the displayStudents function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    displayStudents();
});
function editStudent(rollNo) {
    window.location.href = `edit-student.html?rollNo=${rollNo}`;
}
// Function to load and pre-fill student details for editing
function loadStudentForEditing() {
    const urlParams = new URLSearchParams(window.location.search);
    const rollNo = urlParams.get("rollNo");
    const isDirect = urlParams.get("direct");
    if (isDirect === 'true') {
        alert("Access denied. Please use the 'Edit' button from 'view-students.html'.");
        window.location.href = 'view-students.html'; // Redirect back to view-students.html
        return;
    }
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(student => student.rollNo === rollNo);
    if (student) {
        document.getElementById("editName").value = student.name;
        document.getElementById("editCgpa").value = student.cgpa;
        document.getElementById("editBacklogs").value = student.backlogs;
        document.getElementById("editBranch").value = student.branch;
        document.getElementById("editLanguages").value = student.languages;
    } else {
        alert("Student not found.");
    }
}
// Function to update student data and redirect back to view-students.html
function updateStudentData() {
    const urlParams = new URLSearchParams(window.location.search);
    const rollNo = urlParams.get("rollNo");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentIndex = students.findIndex(student => student.rollNo === rollNo);
    if (studentIndex !== -1) {
        students[studentIndex].name = document.getElementById("editName").value;
        students[studentIndex].cgpa = document.getElementById("editCgpa").value;
        students[studentIndex].backlogs = document.getElementById("editBacklogs").value;
        students[studentIndex].branch = document.getElementById("editBranch").value;
        students[studentIndex].languages = document.getElementById("editLanguages").value;
        localStorage.setItem("students", JSON.stringify(students));
        window.location.href = "view-students.html";
    } else {
        alert("Student not found.");
    }
}
// Call the loadStudentForEditing function when the edit-student.html page loads
document.addEventListener("DOMContentLoaded", function () {
    loadStudentForEditing();
});
// Function to handle student search
function searchStudent() {
    const rollNumber = document.getElementById("rollNumber").value;
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const foundStudent = students.find(student => student.rollNo === rollNumber);
    const searchResults = document.getElementById("searchResults");
    if (foundStudent) {
        searchResults.innerHTML = `
            <h2>Search Results</h2>
            <p><strong>Roll Number:</strong> ${foundStudent.rollNo}</p>
            <p><strong>Name:</strong> ${foundStudent.name}</p>
            <p><strong>CGPA:</strong> ${foundStudent.cgpa}</p>
            <p><strong>Backlogs:</strong> ${foundStudent.backlogs}</p>
            <p><strong>Branch:</strong> ${foundStudent.branch}</p>
            <p><strong>Programming Languages:</strong> ${foundStudent.languages}</p>`;
    } else {
        searchResults.innerHTML = "Student not found.";
    }
}
// Add event listener for form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchStudent();
});
// Function to load student data from local storage
function loadStudentData() {
    return JSON.parse(localStorage.getItem("students")) || [];
}
function checkEligibility() {
    const minimumCgpa = parseFloat(document.getElementById("minimumCgpa").value);
    const students = loadStudentData(); // Load student data
    const eligibleStudents = students.filter(student => {
        return parseFloat(student.cgpa) >= minimumCgpa;
    });
    displayEligibleStudents(eligibleStudents);
}
function displayEligibleStudents(eligibleStudents) {
    const eligibleStudentsContainer = document.getElementById("eligibleStudentsContainer");
    eligibleStudentsContainer.innerHTML = ""; // Clear previous data
    if (eligibleStudents.length > 0) {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>CGPA</th>
                    <th>Backlogs</th>
                    <th>Branch</th>
                    <th>Programming Languages</th>
                </tr>
            </thead>
            <tbody>
            </tbody>`;
        eligibleStudents.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.cgpa}</td>
                <td>${student.backlogs}</td>
                <td>${student.branch}</td>
                <td>${student.languages}</td>`;
            table.querySelector("tbody").appendChild(row);
        });
        eligibleStudentsContainer.appendChild(table);
    } else {
        eligibleStudentsContainer.textContent = "No eligible students found.";
    }
}