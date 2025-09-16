// ====== ES6 Classes ======
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

// ====== Fetch with Promises (.then) ======
function fetchWithPromises() {
  fetch('data/students.json')
    .then(res => res.json())
    .then(data => {
      console.log('Using Promises:', data);
    })
    .catch(err => console.error(err));
}

// ====== Fetch with Async/Await ======
async function fetchWithAsync() {
  try {
    const res = await fetch('data/students.json');
    const data = await res.json();
    console.log('Using Async/Await:', data);
    processData(data);
  } catch (err) {
    console.error(err);
  }
}

// ====== Process & Display Data ======
function processData(data) {
  const output = document.getElementById('output');

  // Create Student and Instructor objects
  const studentObjs = data.students.map(
    s => new Student(s.id, s.name, s.age, s.course)
  );

  const instructorObjs = data.instructors.map(
    i => new Instructor(i.id, i.name, i.subject)
  );

  // Display Students
  const studentList = document.createElement('div');
  studentList.innerHTML = `<h2>Students</h2>`;
  studentObjs.forEach(student => {
    const p = document.createElement('p');
    p.innerHTML = student.introduce();
    if (student.age > 21) p.classList.add('bold');
    studentList.appendChild(p);
  });
  output.appendChild(studentList);

  // Display Courses
  const courseList = document.createElement('div');
  courseList.innerHTML = `<h2>Courses</h2>`;
  data.courses.forEach(course => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${course.title}</strong>: ${course.description}`;
    courseList.appendChild(p);
  });
  output.appendChild(courseList);

  // Display Instructors
  const instructorList = document.createElement('div');
  instructorList.innerHTML = `<h2>Instructors</h2>`;
  instructorObjs.forEach(inst => {
    const p = document.createElement('p');
    p.innerHTML = inst.teach();
    instructorList.appendChild(p);
  });
  output.appendChild(instructorList);

  // Data Relationships
  const relationDiv = document.createElement('div');
  relationDiv.innerHTML = `<h2>Data Relationships</h2>`;

  studentObjs.forEach(student => {
    const course = data.courses.find(c => c.title === student.course);
    const p = document.createElement('p');
    p.textContent = `${student.name} → ${student.course} → ${course.description}`;
    relationDiv.appendChild(p);
  });

  data.courses.forEach(course => {
    if (course.instructor !== 'N/A') {
      const p = document.createElement('p');
      p.textContent = `${course.title} → Taught by ${course.instructor}`;
      relationDiv.appendChild(p);
    }
  });

  output.appendChild(relationDiv);
}

// ====== Run Code ======
fetchWithPromises();
fetchWithAsync();
