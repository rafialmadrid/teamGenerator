const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeesArray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function init() {

    inquirer 
  .prompt([
    
    {
      type: 'input',
      message: 'What is your managers name?',
      name: 'managerName',
    },
    {
      type: 'input',
      message: 'What is your managers id?',
      name: 'managerID',
    },
    {
      type: 'input',
      message: 'What is your managers email?',
      name: 'managerEmail',
    },
    {
      type: 'input',
      message: 'What is your managers office number?',
      name: 'managerOffice',
    }
])
  .then((response) => {

    const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOffice);

    employeesArray.push(newManager);

    askTypeMember();
 
});


}

init();

function addEngineer(){ 
inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is your engineers name?',
                        name: 'engineerName',
                      },
                      {
                        type: 'input',
                        message: 'What is your engineers id?',
                        name: 'engineerID',
                      },
                      {
                        type: 'input',
                        message: 'What is your engineers email?',
                        name: 'engineerEmail',
                      },
                      {
                        type: 'input',
                        message: 'What is your engineers gitHub username?',
                        name: 'engineerGit',
                      },
                      {
                        type: 'list',
                        message: 'Which type of team member would you like to add?',
                        name: 'typeMember',
                        choices: ["Engineer", "Intern", "I dont want to add any more team members"]
                      }
                ]).then((response) => {
                    const newEngineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
                    employeesArray.push(newEngineer);
                    askTypeMember();
                });
            }

function addIntern(){
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is your interns name?',
                        name: 'internName',
                      },
                      {
                        type: 'input',
                        message: 'What is your interns id?',
                        name: 'internID',
                      },
                      {
                        type: 'input',
                        message: 'What is your interns email?',
                        name: 'internEmail',
                      },
                      {
                        type: 'input',
                        message: 'What is your interns school?',
                        name: 'internSchool',
                      },
                      {
                        type: 'list',
                        message: 'Which type of team member would you like to add?',
                        name: 'typeMember',
                        choices: ["Engineer", "Intern", "I dont want to add any more team members"]
                      }
                ]).then((response) => {
                    const newIntern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
                    employeesArray.push(newIntern);
                    askTypeMember();
                });
              }

  function askTypeMember(){
    inquirer 
    .prompt([
        {
            type: 'list',
            message: 'Which type of team member would you like to add?',
            name: 'typeMember',
            choices: ["Engineer", "Intern", "I dont want to add any more team members"]
          }
    ])
    .then((response) => {

      if (response.typeMember==="Engineer") {

        addEngineer();
        
      }
      else if(response.typeMember==="Intern"){

        addIntern();

      }   
      else{

        var html = render(employeesArray);

        fs.writeFile('./output/team.html', html, (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
        });

      } 

    });
  }
