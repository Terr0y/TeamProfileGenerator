// TODO: Write code to define and export the Engineer class. This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email); // Calls the parent class (Employee) constructor
    this.github = github; // Additional property specific to Engineer
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer"; // Overridden to return 'Engineer'
  }
}

module.exports = Engineer;
