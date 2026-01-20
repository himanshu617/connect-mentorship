/* ============================
   SIMPLE ADMIN PASSWORD PROTECTION
============================ */

const ADMIN_PASSWORD = "admin123";

const enteredPassword = prompt("Enter Admin Password:");

if (enteredPassword !== ADMIN_PASSWORD) {
  alert("Access Denied!");
  window.location.href = "index.html";
}





/* ============================
   ADMIN PANEL LOGIC
============================ */

document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();
  loadMentors();
  loadContacts();
});

/* ---------- QUESTIONS ---------- */
function loadQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const container = document.getElementById("questionsList");

  if (questions.length === 0) {
    container.innerHTML = "<p class='empty'>No questions found.</p>";
    return;
  }

  container.innerHTML = "";

  questions.forEach((q, index) => {
    container.innerHTML += `
      <div class="data-card">
        <h4>Question ${index + 1}</h4>

        <p><strong>Name:</strong> ${q.name}</p>
        <p><strong>Category:</strong> ${q.category}</p>
        <p><strong>Question:</strong> ${q.question}</p>
        <p><strong>Date:</strong> ${q.date}</p>

        <label><strong>Answer:</strong></label>
        <textarea id="answer-${index}" rows="3" style="width:100%; margin-top:5px;"
          placeholder="Write answer here...">${q.answer || ""}</textarea>

        <br><br>
        <button onclick="saveAnswer(${index})">Save Answer</button>

        ${
          q.answeredAt
            ? `<p style="color:green;">Answered on: ${q.answeredAt}</p>`
            : `<p style="color:red;">Not answered yet</p>`
        }
      </div>
    `;
  });
}

function saveAnswer(index) {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const answerText = document.getElementById(`answer-${index}`).value.trim();

  if (!answerText) {
    alert("Answer cannot be empty!");
    return;
  }

  questions[index].answer = answerText;
  questions[index].answeredAt = new Date().toLocaleString();

  localStorage.setItem("questions", JSON.stringify(questions));

  alert("Answer saved successfully!");
  loadQuestions(); // refresh UI
}


/* ---------- MENTORS ---------- */
function loadMentors() {
  const mentors = JSON.parse(localStorage.getItem("mentors")) || [];
  const container = document.getElementById("mentorsList");

  if (mentors.length === 0) {
    container.innerHTML = "<p class='empty'>No mentor applications found.</p>";
    return;
  }

  container.innerHTML = "";
  mentors.forEach((m, index) => {
    container.innerHTML += `
      <div class="data-card">
        <h4>Mentor ${index + 1}</h4>
        <p><strong>Name:</strong> ${m.name}</p>
        <p><strong>Email:</strong> ${m.email}</p>
        <p><strong>Level:</strong> ${m.level}</p>
        <p><strong>Expertise:</strong> ${m.expertise}</p>
        <p><strong>Reason:</strong> ${m.reason}</p>
        <p><strong>Date:</strong> ${m.appliedAt}</p>
      </div>
    `;
  });
}

/* ---------- CONTACTS ---------- */
function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const container = document.getElementById("contactsList");

  if (contacts.length === 0) {
    container.innerHTML = "<p class='empty'>No contact messages found.</p>";
    return;
  }

  container.innerHTML = "";
  contacts.forEach((c, index) => {
    container.innerHTML += `
      <div class="data-card">
        <h4>Message ${index + 1}</h4>
        <p><strong>Name:</strong> ${c.name}</p>
        <p><strong>Email:</strong> ${c.email}</p>
        <p><strong>Message:</strong> ${c.message}</p>
        <p><strong>Date:</strong> ${c.date}</p>
      </div>
    `;
  });
}

/* ---------- CLEAR DATA ---------- */
function clearAllData() {
  if (confirm("Are you sure you want to delete ALL stored data?")) {
    localStorage.clear();
    location.reload();
  }
}




/* ============================
   EXPORT TO EXCEL (CSV)
============================ */

function downloadCSV(filename, rows) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const csvContent =
    "data:text/csv;charset=utf-8," +
    rows.map(row =>
      row.map(item =>
        `"${String(item).replace(/"/g, '""')}"`
      ).join(",")
    ).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ---------- QUESTIONS ---------- */
function exportQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];

  const rows = [
    ["Name", "Category", "Question", "Date"]
  ];

  questions.forEach(q => {
    rows.push([
      q.name,
      q.category,
      q.question,
      q.date
    ]);
  });

  downloadCSV("questions.xlsx.csv", rows);
}

/* ---------- MENTORS ---------- */
function exportMentors() {
  const mentors = JSON.parse(localStorage.getItem("mentors")) || [];

  const rows = [
    ["Name", "Email", "Level", "Expertise", "Reason", "Date"]
  ];

  mentors.forEach(m => {
    rows.push([
      m.name,
      m.email,
      m.level,
      m.expertise,
      m.reason,
      m.appliedAt
    ]);
  });

  downloadCSV("mentors.xlsx.csv", rows);
}

/* ---------- CONTACTS ---------- */
function exportContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const rows = [
    ["Name", "Email", "Message", "Date"]
  ];

  contacts.forEach(c => {
    rows.push([
      c.name,
      c.email,
      c.message,
      c.date
    ]);
  });

  downloadCSV("contacts.xlsx.csv", rows);
}
