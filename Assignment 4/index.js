const { Pool } = require('pg');     // To connect to the database
const readline = require('readline');       // used for asynchronous user input

// connecting to the postgres database
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database:"A4"
});

// Basically the "main" function that starts the "server" and runs the program
async function startServer() {

    // try to connect
    try {
        let choice = -1;

        // while-loop that creates the menu and executes behavior based on the users input
        while (choice !=5) {

            await printMenu();  
            choice = await getUserInput("\nPlease select an option...\n");  // Gets user input

            if(choice == 1) {

                await getAllStudents();

            } else if (choice == 2) {

                console.log();
                let fn = await getUserInput("Please state the first name of the student you would like to add\n");
                let ln = await getUserInput("Please state the last name of the student you would like to add\n");
                let e = await getUserInput("Please state the email of the student you would like to add\n");
                let d = await getUserInput("Please state the enrollment date of the student in a YYYY-MM-DD format\n");
                console.log();
                await addStudent(fn, ln, e, d);

            } else if (choice == 3) {

                console.log();
                let sid = await getUserInput("Please state the ID of the student whose email you would like to change\n");
                // Checking to see if the student_id exists in the database or not. If not, the user is informed, and brought back to the menu
                if (await checkId(sid) === 0) {
                    console.log(`\nStudent #${sid} does not exist`);
                    continue;
                }
                let newEmail = await getUserInput("Please state the new email to be changed to\n");
                console.log();
                await updateStudentEmail(sid, newEmail);

            } else if (choice == 4) {

                console.log();
                let sid = await getUserInput("Please state the ID of the student you would like to remove from the database\n");
                if (await checkId(sid) === 0) {
                    console.log(`\nStudent #${sid} does not exist`);
                    continue;
                }
                console.log();
                await deleteStudent(sid);

            } else if (choice == 5){

                console.log("\nGoodbye\n");
                process.exit(0);

            } else {

                console.log("\nThat was not an acceptable choice. Please try again.\n");

            }
    
            
        }
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
}

startServer();


// Function that prints all the students to the terminal
async function getAllStudents() {

    try {
        const results = await pool.query("SELECT * FROM Students");
        console.table(results.rows);
    } catch (error) {
        console.error("Error executing query: ", error);
    }

}

// Adds the student with the given parameters to the database
async function addStudent(first_name, last_name, email, enrollment_date) {

    try {
        const query = {
            text: 'INSERT INTO STUDENTS(first_name, last_name, email, enrollment_date) VALUES($1, $2, $3, $4)',
            values: [first_name, last_name, email, enrollment_date]
        };

        await pool.query(query);
        console.log("Values added");
    } catch (error) {
        console.error("Error executing query: ", error);
    }

}

// updates the email of the student with an id of "student_id" to "new_email"
async function updateStudentEmail(student_id, new_email) {

    try {

        const query = {
            text: 'UPDATE Students SET email=$1 WHERE student_id=$2',
            values: [new_email, student_id]
        };

        await pool.query(query);
        console.log(`Student #${student_id}'s email has been updated to ${new_email}`);

    } catch (error) {
        console.error("Error executing query: ", error);
    }

}

// Function that handles deleting the student from the database based on the provided student_id parameter
async function deleteStudent(student_id) {
    
    try {
        
         // Query used to delete the student_id now that we know it exists in the database
         const deleteQuery = {
            text: 'DELETE FROM Students WHERE student_id=$1',
            values: [student_id]
         };

         await pool.query(deleteQuery); // Query execution
         console.log(`Student #${student_id} has been deleted from the database`);


    } catch (error) {
        console.error("Error executing query: ", error);
    }
    
}

// Helper function used to make sure the student_id parameter exists in the database
async function checkId(student_id) {
    
            // Query used to check if the student_id exists in the database
            const checkQuery = {
                text: 'SELECT 1 FROM Students WHERE student_id = $1',
                values: [student_id]
            };
            
            let results = await pool.query(checkQuery);   // Query execution
            return results.rowCount;
}

// Helper function that prints out the menu
async function printMenu() {
    console.log("\n1. Print out all students from the data base");
    console.log("2. Add a student to the database");
    console.log("3. Update the email of a student who is already in the database");
    console.log("4. Delete a student who is within the database");
    console.log("5. Quit Program");
}

// Helper function that takes a promptText as an argument and creates a readline interface. From there a promise is returned with what the user chooses
async function getUserInput(promptText) {

    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        r1.question(promptText + ' ', (answer) => {
            r1.close();
            resolve(answer);
        })
    })
} 
