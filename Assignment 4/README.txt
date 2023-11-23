Name: Ryan Stutz
Student ID: 101137893

------------------------Setting Up The Database------------------------

Prerequisite - pgAdmin 4 is already installed

- Open pgAdmin 4
- Click on "Servers" in the Object Explorer section on the left
- Enter a password if you have one
- Right click on "Databases" and click Create -> Databases
- Name the database "A4" and click save
- In the A4 drop down, find "Schemas", right click it, and choose "Query Tool"
- In the Query section, copy and paste the following SQL code separately:

CREATE TABLE Students (
	student_id SERIAL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	enrollment_date DATE,
	PRIMARY KEY(student_id)
)


INSERT INTO Students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

------------------------Compiling the program------------------------

Prerequisite - you have node installed

- Open terminal and navigate to thie file where the program is being stored
- type "npm init -y" and hit enter
- type "npm install pg" and hit enter
- node ".\index.js" to run program 

------------------------Function Explanations------------------------

All functions are found in the "index.js" file

startServer() - Basically the "main" function. Connection to the database is attempted. If it fails, an error is thrown. If it succeeds, the user enters into a while loop, a menu is printed to the screeen, and the user must enter in a number as their choice. From there, the program checks the number and acts accordingly

getAllStudents() - Function that handles the SQL commands for getting all the students in the database, executes the query, and displays the results in a table to the user 

addStudent(first_name, last_name, email, enrollment_date) - Function that constructs a query based on the arguments passed to it and executes the query.

updateStudentEmail(student_id, new_email) - Function that updates a students email based on the student_id passed to it. *Note* a check is made in the "startServer()" function to ensure the student_id exsits, otherwise this function does not execute

deleteStudent(student_id) - Function that handles deleting a student from the database based on the student_id that is passed to it. *Note* a check is made in the "startServer()" function to ensure the student_id exsits, otherwise this function does not execute

checkId(student_id) - Function used to check if an id exists in the database

printMenu() - Helper function that prints the menu to the terminal

getUserInput(promptText) - Function that takes a promptText as an argument and creates a readline interface. From there a promise is returned with the users choice

------------------------Video URL------------------------

https://youtu.be/1uL9FldAbQQ
