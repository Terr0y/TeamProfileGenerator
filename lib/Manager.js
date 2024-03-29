// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email); // Calls the parent class (Employee) constructor
    this.officeNumber = officeNumber; // Additional property specific to Manager
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager"; // Overridden to return 'Manager'
  }
}

module.exports = Manager;
