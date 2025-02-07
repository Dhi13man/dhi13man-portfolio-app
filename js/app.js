document.addEventListener('DOMContentLoaded', () => {
  // Use the global portfolioData variable instead of fetching
  const data = portfolioData;
  renderAbout(data.about);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderCertsAndAwards(data.licensesAndCertifications);
  renderAwards(data.honorsAndAwards);
  renderProjects(data.projects);
  renderTestScores(data.testScores);
  renderRecommendations(data.recommendationsReceived);
});

function renderAbout(about) {
  const container = document.querySelector('#about .content');
  container.innerHTML = `<p>${about.description.replace(/\n/g, '<br>')}</p>`;
}

function renderExperience(experiences) {
  const container = document.querySelector('#experience .content');
  container.innerHTML = experiences.map(exp => {
    let roles = exp.roles ? exp.roles.map(role => {
      return `<div class="role">
                <h3>${role.title}</h3>
                <p><em>${role.dates} &ndash; ${role.location}</em></p>
                <ul>${role.details.map(item => `<li>${item}</li>`).join('')}</ul>
              </div>`;
    }).join('') : `<div class="role">
        <h3>${exp.title}</h3>
        <p><em>${exp.dates} &ndash; ${exp.location}</em></p>
        <ul>${exp.details.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>`;
    return `<div class="company">
              <h2>${exp.company}</h2>
              ${roles}
            </div>`;
  }).join('');
}

function renderEducation(education) {
  const container = document.querySelector('#education .content');
  container.innerHTML = education.map(school => `
    <div class="school">
      <h3>${school.institution}</h3>
      <p>${school.degree || ''} ${school.field || ''} ${school.gpa ? '- GPA: ' + school.gpa : ''}</p>
      <p><em>${school.yearRange}</em></p>
    </div>
  `).join('');
}

function renderCertsAndAwards(certs) {
  const certsContainer = document.querySelector('#certifications .certifications-content');
  let certsHtml = certs.map(cert => `
    <div class="cert">
      <h4>${cert.title}</h4>
      <p>${cert.issuer} ${cert.issuedDate ? ' - ' + cert.issuedDate : ''}</p>
      ${cert.credentialId ? `<p>Credential: ${cert.credentialId}</p>` : ''}
    </div>
  `).join('');
  certsContainer.innerHTML = certsHtml;
}

function renderProjects(projects) {
  const container = document.querySelector('#projects .content');
  container.innerHTML = projects.map(proj => `
    <div class="project">
      <h3>${proj.name}</h3>
      <p><em>${proj.date}</em></p>
      <p>${proj.description}</p>
      ${proj.links ? `<p>Links: ${proj.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(', ')}</p>` : ''}
    </div>
  `).join('');
}

function renderTestScores(scores) {
  const container = document.querySelector('#testScores .test-scores-content');
  container.innerHTML = scores.map(score => `
    <div class="score">
      <h4>${score.name}</h4>
      <p><strong>${score.score}</strong> ${score.date ? `<em>(${score.date})</em>` : ''}</p>
      <p>${score.details || ''}</p>
    </div>
  `).join('');
}

function renderRecommendations(recommendations) {
  const container = document.querySelector('#recommendations .content');
  container.innerHTML = recommendations.map(rec => `
    <div class="recommendation">
      <p>"${rec.text}"</p>
      <p><strong>— ${rec.from}</strong></p>
    </div>
  `).join('');
}

function renderAwards(awards) {
  const awardsContainer = document.querySelector('#awards .awards-content');
  let awardsHtml = awards.map(award => `
    <div class="award">
      <h4>${award.title}</h4>
      <p>${award.issuer} ${award.date ? ' - ' + award.date : ''}</p>
      <p>${award.details || ''}</p>
    </div>
  `).join('');
  awardsContainer.innerHTML = awardsHtml;
}
