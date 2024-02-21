const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Function to gather information about team members
async function gatherTeamInformation() {
  const teamMembers = [];

  console.log("Welcome to the Team Profile Generator!");

  // Recursive function to gather information for each team member
  async function addTeamMember() {
    const { role } = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What is the team member's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ]);

    const questions = [
      {
        type: "input",
        name: "name",
        message: `Enter the ${role}'s name:`,
      },
      {
        type: "input",
        name: "id",
        message: `Enter the ${role}'s ID:`,
      },
      {
        type: "input",
        name: "email",
        message: `Enter the ${role}'s email:`,
      },
    ];

    if (role === "Manager") {
      questions.push({
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
      });
    } else if (role === "Engineer") {
      questions.push({
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
      });
    } else if (role === "Intern") {
      questions.push({
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      });
    }

    const { name, id, email, officeNumber, github, school } =
      await inquirer.prompt(questions);

    let teamMember;
    if (role === "Manager") {
      teamMember = new Manager(name, id, email, officeNumber);
    } else if (role === "Engineer") {
      teamMember = new Engineer(name, id, email, github);
    } else if (role === "Intern") {
      teamMember = new Intern(name, id, email, school);
    }

    teamMembers.push(teamMember);

    const { addMore } = await inquirer.prompt([
      {
        type: "confirm",
        name: "addMore",
        message: "Do you want to add another team member?",
        default: false,
      },
    ]);

    if (addMore) {
      await addTeamMember(); // Recursive call to add another team member
    }
  }

  await addTeamMember(); // Start gathering information

  return teamMembers;
}

// Function to write HTML content to file
// function writeHtmlToFile(htmlContent) {
//   fs.writeFile(outputPath, htmlContent, (err) => {
//     if (err) {
//       console.error("Error writing HTML to file:", err);
//     } else {
//       console.log("Team profile successfully generated!");
//     }
//   });
// }

function writeHtmlToFile(htmlContent) {
  // Check if the directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR); // Create the directory if it does not exist
  }

  // Now that the directory is ensured to exist, write the file
  fs.writeFile(outputPath, htmlContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing HTML to file:", err);
    } else {
      console.log("Team profile successfully generated!");
    }
  });
}

// Main function to orchestrate the process
async function main() {
  try {
    // Gather team member information
    const teamMembers = await gatherTeamInformation();

    // Generate HTML content using the team member information
    const htmlContent = render(teamMembers);

    // Write HTML content to file
    writeHtmlToFile(htmlContent);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call the main function to start the process
main();
