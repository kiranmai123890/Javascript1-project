import { authentication, db } from "./fb.js";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// ----------------------------
// 🔁 Save resumeData to localStorage whenever input changes
// ----------------------------
function saveResumeToLocalStorage() {
  const resumeData = {
    Header: {
      FirstName: document.getElementById("firstName")?.value || "",
      Surname: document.getElementById("surname")?.value || "",
      City: document.getElementById("cityInput")?.value || "",
      Email: document.getElementById("emailInput")?.value || "",
      Phone: document.getElementById("phoneInput")?.value || "",
    },
    Summary: document.getElementById("summaryInput")?.value || "",
    Skills: {
      Skill1: document.getElementById("skill1")?.value || "",
      Skill2: document.getElementById("skill2")?.value || "",
    },
    Experience: {
      Role: document.getElementById("role")?.value || "",
      Company: document.getElementById("company")?.value || "",
      Year: document.getElementById("expYear")?.value || "",
    },
    Education: {
      Institution: document.getElementById("institution")?.value || "",
      Qualification: document.getElementById("qualification")?.value || "",
      Year: document.getElementById("eduYear")?.value || "",
    }
  };

  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  console.log("🔄 Updated localStorage resumeData:", resumeData);
}

// Attach listeners after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", saveResumeToLocalStorage);
  });

  // ----------------------------
  // 🔐 SIGNUP
  // ----------------------------
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const username = document.getElementById('signup-username').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;

      try {
        const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });

        const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");

        await setDoc(doc(db, "users", username), {
          username,
          email,
          resume: resumeData
        });

        alert("Signed up successfully!");

        document.getElementById('toggle').checked = false;
        document.getElementById('login-email').value = email;
        this.reset();
      } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed: " + error.message);
      }
    });
  }

  // ----------------------------
  // 🔓 LOGIN
  // ----------------------------
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const userCredential = await signInWithEmailAndPassword(authentication, email, password);
        const user = userCredential.user;
        const username = user.displayName;

        if (!username) throw new Error("No displayName set on user.");

        // 🔁 Optional safety net: grab live values in case localStorage isn't up to date
        saveResumeToLocalStorage();

        const latestResume = JSON.parse(localStorage.getItem("resumeData") || "{}");

        // 🔥 Push resume to Firestore with merge
        await setDoc(doc(db, "users", username), {
          resume: latestResume
        }, { merge: true });

        console.log("✅ Firestore updated with resume:", latestResume);

        const signCredentials = {
          email,
          username,
          resume: latestResume
        };
        localStorage.setItem("signCredentials", JSON.stringify(signCredentials));

        alert(`${username} logged in successfully.`);
        location.href = "dashing.html";
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
      }
    });
  }
});
