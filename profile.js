
  document.addEventListener("DOMContentLoaded", () => {
  // Fetch signCredentials from localStorage
  const credentials = JSON.parse(localStorage.getItem("signCredentials"));

  console.log("User:", credentials?.username);
  // console.log("Resume:", credentials?.resume);

  // Show username somewhere on page
  const sellerNameElement = document.getElementById("sellerName");
  if (sellerNameElement && credentials?.username) {
    sellerNameElement.textContent = `👤 ${credentials.username}`;
  }

  // Render resume data if available
  const resumeData = credentials?.resume || null;
  if (!resumeData) {
    console.warn("No resume data found.");
    return;
  }

  const container = document.getElementById("resumeSection");
  if (!container) return;

  let html = `<h2>Resume Details</h2>`;

  // Render Header
  if (resumeData.Header) {
    html += `<h3>Header</h3><ul>`;
    for (const [key, value] of Object.entries(resumeData.Header)) {
      html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += `</ul>`;
  }

  // Render Summary
  if (resumeData.Summary && resumeData.Summary.Summary) {
    html += `<h3>Summary</h3><p>${resumeData.Summary.Summary}</p>`;
  }

  // Render Skills
  if (resumeData.Skills) {
    html += `<h3>Skills</h3><ul>`;
    for (const skill of Object.values(resumeData.Skills)) {
      html += `<li>${skill}</li>`;
    }
    html += `</ul>`;
  }

  // Render Experience
  if (resumeData.Experience && Object.keys(resumeData.Experience).length > 0) {
    html += `<h3>Experience</h3><ul>`;
    for (const [key, value] of Object.entries(resumeData.Experience)) {
      html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += `</ul>`;
  } else {
    html += `<h3>Experience</h3><p>No experience data available.</p>`;
  }

  // Render Education
  if (resumeData.Education && Object.keys(resumeData.Education).length > 0) {
    html += `<h3>Education</h3><ul>`;
    for (const [key, value] of Object.entries(resumeData.Education)) {
      html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += `</ul>`;
  } else {
    html += `<h3>Education</h3><p>No education data available.</p>`;
  }

  // Render Internships
  if (resumeData.Internships && Object.keys(resumeData.Internships).length > 0) {
    html += `<h3>Internships</h3><ul>`;
    for (const [key, value] of Object.entries(resumeData.Internships)) {
      html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += `</ul>`;
  } else {
    html += `<h3>Internships</h3><p>No internship data available.</p>`;
  }

  container.innerHTML = html;
});
