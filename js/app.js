console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     You have entered the realm of the legendary              ║
║                  DHIMAN SEAL                                 ║
║    Digital Architect • Code Mystic • Entrepreneur            ║
║                                                              ║
║   "Where technology meets divine craftsmanship"              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle functionality
  const toggleButton = document.querySelector('.sidebar-toggle');
  const body = document.body;
  
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('sidebar-collapsed');
  });

  // Close sidebar when clicking nav links (especially on mobile)
  document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        body.classList.remove('sidebar-collapsed');
      }
    });
  });

  // Use the global portfolioData variable instead of fetching
  const data = portfolioData;
  renderAbout(data.about);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderCerts(data.licensesAndCertifications);
  renderAwards(data.honorsAndAwards);
  renderTestScores(data.testScores);
  renderProjects(data.projects);
  renderRecommendations(data.recommendations);
});

function renderAbout(about) {
  const section = document.getElementById('about');
  section.querySelector('h2').innerText = about.tagline;
  const container = section.querySelector('.content');
  let p = container.querySelector('p');
  if (!p) {
    p = document.createElement('p');
    container.appendChild(p);
  }
  p.innerHTML = about.description.replace(/\n/g, '<br>');
}

function renderExperience(experiences) {
  const container = document.querySelector('#experience .content');
  container.innerHTML = experiences.map(exp => `
    <div class="company">
      <h3>${exp.links?.primary ? 
        `<a href="${exp.links.primary}" target="_blank">${exp.company}</a>` : 
        exp.company}</h3>
      ${exp.about ? `<p class="about-org">${exp.about}</p>` : ''}
      <div class="roles">
        ${exp.roles.map(role => `
          <div class="role">
            <h4>${role.title}</h4>
            <p><em>${role.dates} &ndash; ${role.location}</em></p>
            ${role.description ? `<p class="description">${role.description}</p>` : ''}
            <ul class="details">
              ${role.details.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      ${renderLinks(exp.links)}
    </div>
  `).join('');
}

function renderEducation(education) {
  const container = document.querySelector('#education .content');
  container.innerHTML = education.map(school => `
    <div class="school">
      <h3>${school.links?.primary ? 
        `<a href="${school.links.primary}" target="_blank" rel="noopener noreferrer">${school.institution}</a>` : 
        school.institution}</h3>
      ${school.about ? `<p class="about-org">${school.about}</p>` : ''}
      <div class="school-info">
        <p class="degree">${school.degree || ''} ${school.field ? `in ${school.field}` : ''}; <em>${school.yearRange}</em></p>
        <p class="grade"><strong>${school.gpa ? `GPA: ${school.gpa}` : school.percent ? `Grade: ${school.percent}` : ''}</strong></p>
        ${school.description ? `<p class="description">${school.description}</p>` : ''}
        ${school.details ? `<ul class="details">${school.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        ${renderLinks(school.links)}
      </div>
    </div>
  `).join('');
}

function renderCerts(certs) {
  const certsContainer = document.querySelector('#certifications .certifications-content');
  let certsHtml = certs.map(cert => `
    <div class="cert">
      <h4>${cert.title}</h4>
      <p><em>${cert.issuer} ${cert.issuedDate ? ' - ' + cert.issuedDate : ''}</em></p>
      ${cert.credentialId ? `<p class="credential">Credential: ${cert.credentialId}</p>` : ''}
      ${cert.description ? `<p class="description">${cert.description}</p>` : ''}
      ${cert.details ? `<ul class="details">${cert.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
  certsContainer.innerHTML = certsHtml;
}

function renderProjects(projects) {
  const container = document.querySelector('#projects .content');
  container.innerHTML = projects.map(proj => `
    <div class="project">
      ${proj.links?.primary ? 
        `<h3><a href="${proj.links.primary}" target="_blank">${proj.name}</a></h3>` :
        `<h3>${proj.name}</h3>`
      }
      <p><em>${proj.date}</em></p>
      ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
      ${proj.details ? `<ul class="details">${proj.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
      ${proj.skills ? `<p class="skills"><strong>Skills:</strong> ${proj.skills.join(', ')}</p>` : ''}
      ${renderLinks(proj.links)}
    </div>
  `).join('');
}

function renderTestScores(scores) {
  const container = document.querySelector('#testScores .test-scores-content');
  container.innerHTML = scores.map(score => `
    <div class="score">
      <h4>${score.name}</h4>
      <p><strong>${score.score}</strong> ${score.date ? `<em>(${score.date})</em>` : ''}</p>
      ${score.description ? `<p class="description">${score.description}</p>` : ''}
      ${score.details ? `<ul class="details">${score.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
}

function renderRecommendations(recommendations) {
  const container = document.querySelector('#recommendations .content');
  container.innerHTML = recommendations.map(rec => `
    <div class="recommendation">
      <p>"${rec.text}"</p>
      <p><strong>— ${rec.from}</strong></p>
      ${renderLinks(rec.links)}
    </div>
  `).join('');
}

function renderAwards(awards) {
  const awardsContainer = document.querySelector('#awards .awards-content');
  let awardsHtml = awards.map(award => `
    <div class="award">
      <h4>${award.title}</h4>
      <p><em>${award.issuer} ${award.date ? ' - ' + award.date : ''}</em></p>
      ${award.description ? `<p class="description">${award.description}</p>` : ''}
      ${award.details ? `<ul class="details">${award.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
  awardsContainer.innerHTML = awardsHtml;
}

function renderLinks(links) {
  if (!links) return '';
  
  const allLinks = [];
  if (links.primary) allLinks.push(links.primary);
  if (links.others?.length) allLinks.push(...links.others);
  
  if (!allLinks.length) return '';
  
  const allLinksHtml = allLinks
    .filter(url => url && typeof url === 'string')
    .map(url => {
      try {
        const urlObj = new URL(url);
        const displayText = urlObj.hostname.replace(/^www\./, '');
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
      } catch {
        console.warn(`Invalid URL: ${url}`);
        return '';
      }
    })
    .filter(html => html);

  return allLinksHtml.length ? 
    `<p class="links">See source: ${allLinksHtml.join(' | ')}</p>` : 
    '';
}
