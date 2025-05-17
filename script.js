const firebaseConfig = {
  apiKey: "AIzaSyA4tRujpv7Luo2RCvXVQ_hDAecOYGZEggk",
  authDomain: "studentdatabase-aeec1.firebaseapp.com",
  databaseURL: "https://studentdatabase-aeec1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentdatabase-aeec1",
  storageBucket: "studentdatabase-aeec1.appspot.com",
  messagingSenderId: "799192113244",
  appId: "1:799192113244:web:ee65258b304839cbbc0699",
  measurementId: "G-YN6QPQJSLJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    studentId: form.studentId.value,
    fullName: form.fullName.value,
    idCard: form.idCard.value,
    grade: form.grade.value,
    fatherName: form.fatherName.value,
    fatherPhone: form.fatherPhone.value,
    motherName: form.motherName.value,
    motherPhone: form.motherPhone.value,
    guardian: form.guardian.value,
    guardianPhone: form.guardianPhone.value,
    address: form.address.value
  };

  db.ref("students/" + data.studentId).set(data).then(() => {
    form.reset();
    alert("บันทึกแล้ว!");
    loadStudents();
  });
});

function loadStudents() {
  studentList.innerHTML = "";
  db.ref("students").once("value", snapshot => {
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.textContent = child.val().fullName + " (" + child.val().grade + ")";
      studentList.appendChild(li);
    });
  });
}

function exportToExcel() {
  db.ref("students").once("value", snapshot => {
    const data = [];
    snapshot.forEach(child => data.push(child.val()));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_data.xlsx");
  });
}

loadStudents();
