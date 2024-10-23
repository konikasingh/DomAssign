
    document.addEventListener('DOMContentLoaded', () => {
        // Get form and table body elements
        const form = document.getElementById('studentForm');
        const tableBody = document.querySelector('#studentTable tbody');

        // Load data from local storage
        loadStudentData();

        // Form submit event listener
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const studentName = document.getElementById('studentName').value.trim();
            const studentID = document.getElementById('studentID').value.trim();
            const email = document.getElementById('email').value.trim();
            const contactNo = document.getElementById('contactNo').value.trim();

            // Input validation
            if (!validateInput(studentName, studentID, email, contactNo)) {
                return;
            }

            // Add student record
            const studentData = { studentName, studentID, email, contactNo };
            addStudentRecord(studentData);

            // Clear form after submission
            form.reset();
        });

        // Validate input fields
        function validateInput(name, id, email, contactNo) {
            const nameRegex = /^[A-Za-z\s]+$/;
            const idRegex = /^[0-9]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const contactNoRegex = /^[0-9]{10}$/;

            if (!name || !nameRegex.test(name)) {
                alert('Please enter a valid name (letters only).');
                return false;
            }

            if (!id || !idRegex.test(id)) {
                alert('Please enter a valid Student ID (numbers only).');
                return false;
            }

            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email.');
                return false;
            }

            if (!contactNo || !contactNoRegex.test(contactNo)) {
                alert('Please enter a valid 10-digit contact number.');
                return false;
            }

            return true;
        }

        // Add student record to the table and local storage
        function addStudentRecord(studentData) {
            // Add the student data to local storage
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students.push(studentData);
            localStorage.setItem('students', JSON.stringify(students));

            // Update table display
            displayStudentRecords();
        }

        // Display student records from local storage
        function displayStudentRecords() {
            tableBody.innerHTML = ''; // Clear table

            const students = JSON.parse(localStorage.getItem('students')) || [];
            students.forEach((student, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${student.studentName}</td>
                    <td>${student.studentID}</td>
                    <td>${student.email}</td>
                    <td>${student.contactNo}</td>
                    <td>
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });

            // Add scrollbar dynamically
            if (students.length > 5) {
                document.getElementById('studentTable').style.overflowY = 'scroll';
                document.getElementById('studentTable').style.maxHeight = '200px';
            }
        }

        // Edit student record
        window.editStudent = function (index) {
            const students = JSON.parse(localStorage.getItem('students')) || [];
            const student = students[index];

            // Fill form with the selected student's data
            document.getElementById('studentName').value = student.studentName;
            document.getElementById('studentID').value = student.studentID;
            document.getElementById('email').value = student.email;
            document.getElementById('contactNo').value = student.contactNo;

            // Remove the old student data
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));

            // Refresh the table
            displayStudentRecords();
        };

        // Delete student record
        window.deleteStudent = function (index) {
            const students = JSON.parse(localStorage.getItem('students')) || [];
            students.splice(index, 1); // Remove the selected student
            localStorage.setItem('students', JSON.stringify(students));

            // Refresh the table
            displayStudentRecords();
        };

        // Load student data from local storage
        function loadStudentData() {
            displayStudentRecords();
        }
    });

