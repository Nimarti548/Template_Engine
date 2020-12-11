const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
    employees.push(newManager);
    addNewMember()
    })
}

function addEngineer () {
    inquirer.prompt([
    {
        type: "input",
        message: "Enter Engineer's name.",
        name: "engineerName",
    },
    {
        type: "input",
        message: "Enter Engineer employee ID.",
        name: "engineerID",
    },
    {
        type: "input",
        message: "Enter Engineer email.",
        name: "engineerEmail",
    },
    {
        type: "input",
        message: "Enter Engineer office number.",
        name: "engineerOfficeNum",
    },
    ])
    .then((engineerRes) => {
    const newEngineer = new Engineer(engineerRes.engineerName, engineerRes.managerID, engineerRes.engineerEmail, engineerRes.engineerOfficeNum);
    employees.push(newEngineer);
    addNewMember()
    })
}

function addIntern () {
    inquirer.prompt([
    {
        type: "input",
        message: "Enter Intern name.",
        name: "internName",
    },
    {
        type: "input",
        message: "Enter Intern employee ID.",
        name: "internID",
    },
    {
        type: "input",
        message: "Enter Intern email.",
        name: "internEmail",
    },
    {
        type: "input",
        message: "Enter Intern office number.",
        name: "internOfficeNum",
    },
    ])
    .then((internRes) => {
    const newIntern = new Intern(internRes.internName, internRes.internID, internRes.internEmail, internRes.internOfficeNum);
    employees.push(newIntern);
    addNewMember()
    })
}

function renderMain () {
    const mainHTML = render(employees);
    fs.writeFile(outputPath, mainHTML, (err) => {
        if (err) throw err;
    })
}

getEmployeeClass()