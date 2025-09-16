const fs = require('fs');

// Part 1: ES6 Classes
class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

// Read JSON and process data
fs.readFile('students.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error("Failed to read file:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);

    // Create objects
    const studentObjects = data.students.map(
      s => new Student(s.id, s.name, s.age, s.course)
    );
    const instructorObjects = data.instructors.map(
      i => new Instructor(i.id, i.name, i.subject)
    );

    // Display Students
    console.log("Students:");
    studentObjects.forEach(s => {
      const star = s.age > 21 ? " *" : "";
      console.log(`- ${s.name} (${s.age}) - ${s.course}${star}`);
    });

    // Display Courses
    console.log("\nCourses:");
    data.courses.forEach(course => {
      console.log(`- ${course.title}: ${course.description}`);
    });

    // Display Instructors
    console.log("\nInstructors:");
    instructorObjects.forEach(instr => {
      console.log(`- ${instr.name} - ${instr.subject}`);
    });

  } catch (parseErr) {
    console.error("Failed to parse JSON:", parseErr);
  }
});
