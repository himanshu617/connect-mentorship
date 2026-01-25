/* ============================
   APP LOADED
============================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Connect Mentorship Platform Loaded");
  loadPublicQuestions();
});

/* ============================
   ASK QUESTION → LOCALSTORAGE
============================ */
const questionForm = document.getElementById("questionForm");
const questionMessage = document.getElementById("formMessage");

if (questionForm) {
  questionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const questionData = {
      name: document.getElementById("name").value || "Anonymous",
      email: document.getElementById("email").value || "Not Provided",
      category: document.getElementById("category").value,
      question: document.getElementById("question").value,
      answer: "",
      askedAt: new Date().toLocaleString(),
      answeredAt: ""
    };

    if (!questionData.category || !questionData.question) {
      questionMessage.style.color = "red";
      questionMessage.innerText = "Please fill required fields.";
      return;
    }

    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.push(questionData);
    localStorage.setItem("questions", JSON.stringify(questions));

    questionMessage.style.color = "green";
    questionMessage.innerText = "Your question has been submitted successfully!";
    questionForm.reset();
  });
}

/* ============================
   MENTOR FORM → LOCALSTORAGE
============================ */
const mentorForm = document.getElementById("mentorForm");
const mentorMessage = document.getElementById("mentorMessage");

if (mentorForm) {
  mentorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const mentorData = {
      name: document.getElementById("mentorName").value,
      email: document.getElementById("mentorEmail").value,
      level: document.getElementById("mentorLevel").value,
      expertise: document.getElementById("mentorExpertise").value,
      reason: document.getElementById("mentorReason").value,
      appliedAt: new Date().toLocaleString()
    };

    if (
      !mentorData.name ||
      !mentorData.email ||
      !mentorData.level ||
      !mentorData.expertise ||
      !mentorData.reason
    ) {
      mentorMessage.style.color = "red";
      mentorMessage.innerText = "Please fill all fields.";
      return;
    }

    let mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    mentors.push(mentorData);
    localStorage.setItem("mentors", JSON.stringify(mentors));

    mentorMessage.style.color = "green";
    mentorMessage.innerText = "Mentor application submitted successfully!";
    mentorForm.reset();
  });
}

/* ============================
   CONTACT FORM → LOCALSTORAGE
============================ */
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const contactData = {
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      message: document.getElementById("contactMessage").value,
      date: new Date().toLocaleString()
    };

    if (!contactData.name || !contactData.email || !contactData.message) {
      contactFormMessage.style.color = "red";
      contactFormMessage.innerText = "Please fill all fields.";
      return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push(contactData);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    contactFormMessage.style.color = "green";
    contactFormMessage.innerText = "Message sent successfully!";
    contactForm.reset();
  });
}

/* ============================
   SHOW ANSWERS TO USERS
============================ */
function loadPublicQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  const container = document.getElementById("publicQuestions");

  if (!container) return;

  if (questions.length === 0) {
    container.innerHTML = "<p>No questions yet.</p>";
    return;
  }

  container.innerHTML = "";

  questions.forEach(q => {
    container.innerHTML += `
      <div class="data-card">
        <p><strong>Question:</strong> ${q.question}</p>
        ${
          q.answer
            ? `<p><strong>Answer:</strong> ${q.answer}</p>`
            : `<p style="color:gray;">Awaiting answer...</p>`
        }
      </div>
    `;
  });
}
