// TODO: Write code to define and export the Intern class. This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email); // Calls the parent class (Employee) constructor
    this.school = school; // Additional property specific to Intern
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern"; // Overridden to return 'Intern'
  }
}

module.exports = Intern;
