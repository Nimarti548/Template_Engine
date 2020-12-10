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
    employeeArr.push(newManager);
    addNewMember()
    })
}

function renderMain () {
    const HTML = render(employees);
    fs.writeFile(outputPath, HTML, (err) => {
        if (err) throw err;
    })
}

getEmployeeClass()