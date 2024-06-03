const readlineSync = require('readline-sync');
var studentDetails = [
    {
        Roll_no: 501,
        Name: "Liam Garcia",
        Class: 5,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 502,
        Name: "Ava Robinson",
        Class: 5,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 503,
        Name: "Lucas Cooper",
        Class: 5,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 504,
        Name: "Emma Reed",
        Class: 5,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 505,
        Name: "Mia Hughes",
        Class: 5,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 601,
        Name: "Sophia Smith",
        Class: 6,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 602,
        Name: "Ethan Johnson",
        Class: 6,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 603,
        Name: "Ava Williams",
        Class: 6,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 604,
        Name: "Noah Brown",
        Class: 6,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 605,
        Name: "Olivia Jones",
        Class: 6,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 701,
        Name: "Liam Davis",
        Class: 7,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 702,
        Name: "Emma Martinez",
        Class: 7,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 703,
        Name: "Mia Wilson",
        Class: 7,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 704,
        Name: "Lucas Taylor",
        Class: 7,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 705,
        Name: "Aiden Anderson",
        Class: 7,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 801,
        Name: "Isabella Thomas",
        Class: 8,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 802,
        Name: "James White",
        Class: 8,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 803,
        Name: "Avery Clark",
        Class: 8,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 804,
        Name: "Mason Turner",
        Class: 8,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 805,
        Name: "Charlotte Harris",
        Class: 8,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 801,
        Name: "Evelyn Scott",
        Class: 9,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 802,
        Name: "Logan King",
        Class: 9,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 803,
        Name: "Harper Turner",
        Class: 9,
        Gender: "Female",
        test_score: []
    },
    {
        Roll_no: 804,
        Name: "Jackson Lee",
        Class: 9,
        Gender: "Male",
        test_score: []
    },
    {
        Roll_no: 805,
        Name: "Abigail Baker",
        Class: 9,
        Gender: "Female",
        test_score: []
    }
]
let testTaken = false
let resultGenerated = false
function mainMenu() {
    console.log("1 Take Test")
    console.log("2 Generate Result")
    console.log("3 View Students Result")
    console.log("4 View Classwise result ")
    console.log("5 Exit from the choice")

    const choice = readlineSync.question('Please select an option : ')

    switch (choice) {
        case '1':
            takeTest();
            break;
        case '2':
            if (!testTaken) {
                console.log("Please take the test first");
                mainMenu()
            }
            else {
                GenerateResult();
            }
            break;
        case '3':
            if (!resultGenerated) {
                console.log("Please Calculate the total marks and percentage first");
                mainMenu()
            }
            viewStudentsResult();
            break;
        case '4' :
            viewClassWiseResult()
           break
        case '5':
            return
        default:
            console.log('Invalid choice. Please select again');
            mainMenu();
            break;
    }
}
mainMenu();

function generateRandomNum() {
    return Math.floor(Math.random() * 51) + 50;
}

function takeTest() {
    const subjects = ["Java", "Python", "ReactJs"];
    for (let test of studentDetails) {
        test.test_score = subjects.map(subject => ({
            sub_name: subject,
            marks: generateRandomNum()
        }))
    }
    testTaken = true
    console.log("Test scores have been generated for all students.");
    mainMenu()
}
function GenerateResult() {
    studentDetails.forEach(student => {
        if (student.test_score.length === 0) {
            console.log(`No test scores available for ${student.Name}`);
        }
        else {
            let totalMarks = 0;
            student.test_score.forEach(score => {
                totalMarks += score.marks;
            });
            const numSubjects = student.test_score.length;
            student.totalMarks = totalMarks;
            student.percentage = (totalMarks / (numSubjects * 100)) * 100;
        }
    });
    resultGenerated = true
    console.log("Generated the result along with total marks and percentage");
    mainMenu()
}

function viewStudentsResult() {
    const roll_no = parseInt(readlineSync.question("Enter Roll number: "));
    const student = studentDetails.find(s => s.Roll_no === roll_no);
    if (student) {
        if (!student.totalMarks || !student.percentage) {
            console.log(`Results for ${student.Name} are not generated. Please generate the result.`);
        } else {
            console.log(`Results for ${student.Name}:`);
            student.test_score.forEach(score => {
                console.log(`${score.sub_name}: ${score.marks}`);
            });
            console.log(`Total Marks: ${student.totalMarks}`);
            console.log(`Percentage: ${student.percentage.toFixed(2)}%`);
        }
    } else {
        console.log("Student not found");
    }
    mainMenu();
}
function viewClassWiseResult() {
    const classes = studentDetails.map(student => student.Class); 
    const uniqueClassesSet = new Set(classes)
    const uniqueClassesArray = [...uniqueClassesSet]
    uniqueClassesArray.forEach(classNum => {
        console.log(`Class ${classNum} Results:`);
        const classStudents = studentDetails.filter(student => student.Class === classNum);
        classStudents.forEach(student => {
            console.log(`Name: ${student.Name}`);
            if (!student.totalMarks || !student.percentage) {
                console.log(`Results for ${student.Name} are not generated. Please generate the result.`);
            } else {
                student.test_score.forEach(score => {
                    console.log(`${score.sub_name}: ${score.marks}`);
                });
                console.log(`Total Marks: ${student.totalMarks}`);
                console.log(`Percentage: ${student.percentage.toFixed(2)}%`);
            }
            console.log('-------------------');
        });
    });
    mainMenu();
}


