const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


let employees = [];

function getEmployeeClass(){
    inquirer.prompt([
    {
      type: "list",
      message: "Choose employee's job classification.",
      name: "classInput",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ])
    .then((res) => {
    if(res.classInput === "Manager") {
        addManager()
    } else if(res.classInput === "Engineer") {
        addEngineer()
    } else {
        addIntern()
    }
    })
}


function addNewMember() {
    inquirer.prompt([
    {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "addMember",
        default: true,
    },
    ]).then(addRes => {
    if (addRes.addMember) {
        getEmployeeClass();
    } else {
        renderMain();
    };
    });
};

function addManager () {
    inquirer.prompt([
    {
        type: "input",
        message: "Enter Manager name.",
        name: "managerName",
    },
    {
        type: "input",
        message: "Enter Manager employee ID.",
        name: "managerID",
    },
    {
        type: "input",
        message: "Enter Manager email.",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "Enter Manager office number.",
        name: "managerOfficeNum",
    },
  ])
  .then((managerRes) => {
    const newManager = new Manager(managerRes.managerName, managerRes.managerID, managerRes.managerEmail, managerRes.managerOfficeNum);
    employeeArr.push(newManager);
    addNewMember()
 })
}

function renderMain () {
    const HTML = render(employees);
    fs.writeFile(outputPath, HTML, (err) => {
        if (err) throw err
    })
}

getEmployeeClass()