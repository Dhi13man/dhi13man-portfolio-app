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
  renderCurrentInitiatives(data);
  renderExperience(data.experience);
  renderVentures(data.ventures);
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
  const container = document.querySelector('#experiences .content');
  container.innerHTML = experiences.map(exp => `
    <div class="company">
      ${renderImages(exp.images)}
      <h3>${exp.links?.primary ? 
        `<a href="${exp.links.primary}" target="_blank">${exp.name}</a>` : 
        exp.name}</h3>
      ${exp.about ? `<p class="about-org">${exp.about}</p>` : ''}
      <div class="roles">
        ${exp.roles.map(role => `
          <div class="role">
            <h4>${role.title}</h4>
            <p><em>${formatDateRange(role.startDate, role.endDate)} &ndash; ${role.location}</em></p>
            ${role.description ? `<p class="description">${role.description}</p>` : ''}
            <ul class="details">
              ${role.details.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      ${renderLinks(exp.links, exp.images)}
    </div>
  `).join('');
}

function renderVentures(ventures) {
  const container = document.querySelector('#ventures .content');
  container.innerHTML = ventures.map(venture => `
    <div class="venture">
      ${renderImages(venture.images)}
      <h3>${venture.links?.primary ? 
        `<a href="${venture.links.primary}" target="_blank">${venture.name}</a>` : 
        venture.name}</h3>
      ${venture.about ? `<p class="about-org">${venture.about}</p>` : ''}
      <div class="roles">
        ${venture.roles.map(role => `
          <div class="role">
            <h4>${role.title}</h4>
            <p><em>${formatDateRange(role.startDate, role.endDate)} &ndash; ${role.location}</em></p>
            ${role.description ? `<p class="description">${role.description}</p>` : ''}
            <ul class="details">
              ${role.details.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      ${renderLinks(venture.links, venture.images)}
    </div>
  `).join('');
}

function renderEducation(education) {
  const container = document.querySelector('#education .content');
  container.innerHTML = education.map(school => `
    <div class="school">
      ${renderImages(school.images)}
      <h3>${school.links?.primary ? 
        `<a href="${school.links.primary}" target="_blank" rel="noopener noreferrer">${school.name}</a>` : 
        school.name}</h3>
      ${school.about ? `<p class="about-org">${school.about}</p>` : ''}
      <div class="courses">
        ${school.courses.map(course => `
          <div class="course">
            <p class="degree">${course.degree || ''} ${course.field ? `in ${course.field}` : ''}; <em>${course.yearRange}</em></p>
            <p class="grade"><strong>${course.gpa ? `GPA: ${course.gpa}` : course.percent ? `Grade: ${course.percent}` : ''}</strong></p>
            ${course.description ? `<p class="description">${course.description}</p>` : ''}
            ${course.details ? `<ul class="details">${course.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}
      </div>
      ${renderLinks(school.links, school.images)}
    </div>
  `).join('');
}

function renderCerts(certs) {
  const certsContainer = document.querySelector('#certifications .certifications-content');
  let certsHtml = certs.map(cert => `
    <div class="cert">
      <h4>${cert.title}</h4>
      ${cert.details ? `<ul class="details">${cert.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
  certsContainer.innerHTML = certsHtml;
}

function renderProjects(projects) {
  const container = document.querySelector('#projects .content');
  container.innerHTML = projects.map(proj => `
    <div class="project">
      ${renderImages(proj.images)}
      ${proj.links?.primary ? 
        `<h3><a href="${proj.links.primary}" target="_blank">${proj.name}</a></h3>` :
        `<h3>${proj.name}</h3>`
      }
      <p><em>${formatDateRange(proj.startDate, proj.endDate)}</em></p>
      ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
      ${proj.details ? `<ul class="details">${proj.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
      ${proj.skills ? `<p class="skills"><strong>Skills:</strong> ${proj.skills.join(', ')}</p>` : ''}
      ${renderLinks(proj.links, proj.images)}
    </div>
  `).join('');
}

function renderTestScores(scores) {
  const container = document.querySelector('#testScores .test-scores-content');
  container.innerHTML = scores.map(score => `
    <div class="score">
      <h4>${score.name}</h4>
      <p><strong>${score.score}</strong> ${score.startDate ? `<em>(${score.startDate})</em>` : ''}</p>
      ${score.description ? `<p class="description">${score.description}</p>` : ''}
      ${score.details ? `<ul class="details">${score.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
}

function renderRecommendations(recommendations) {
  const container = document.querySelector('#recommendations .content');
  container.innerHTML = recommendations.map(rec => `
    <div class="recommendation">
      <p>"${rec.text}"</p><br>
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
      <p><em>${award.issuer}, ${formatDateRange(award.startDate, award.endDate)}</em></p>
      ${award.description ? `<p class="description">${award.description}</p>` : ''}
      ${award.details ? `<ul class="details">${award.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
  awardsContainer.innerHTML = awardsHtml;
}

function renderLinks(links, images) {
  const photosHtml = renderPhotos(images);
  const linksHtml = renderSourceLinks(links);
  
  if (!linksHtml && !photosHtml) return '';
  
  return `<div class="metadata">
    ${linksHtml}
    ${photosHtml}
  </div>`;
}

function renderPhotos(images) {
  if (!images) return '';
  
  const allImages = [];
  if (images.primary) allImages.push(images.primary);
  if (images.others?.length) allImages.push(...images.others);
  
  if (!allImages.length) return '';

  const allLinksHtml = allImages
    .map(url => `<a href="${url}" target="_blank" rel="noopener noreferrer">
      <img src="${url}" alt="Project Photo" loading="lazy" />
    </a>`).join('');

  return `<div class="photos">${allLinksHtml}</div>`;
}

function renderSourceLinks(links) {
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
    `<div class="links">See sources: ${allLinksHtml.join(' | ')}</div>` : 
    '';
}

function formatDateRange(startDate, endDate) {
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }
  return startDate || endDate || '';
}

function renderCurrentInitiatives(data) {
  const container = document.querySelector('#about .current-initiatives .content');
  if (!container) return;
  
  // Get current ventures
  const currentVentures = data.ventures
    .filter(venture => venture.roles.some(role => role.endDate === 'Present'))
    .map(venture => ({
      name: venture.name,
      description: venture.about,
      links: venture.links,
      type: 'Venture'
    }));

  // Get current projects
  const currentProjects = data.projects
    .filter(project => project.endDate === 'Present')
    .map(project => ({
      name: project.name,
      description: project.description,
      links: project.links,
      type: 'Project'
    }));

  const currentInitiatives = [...currentVentures, ...currentProjects];
  if (currentInitiatives.length === 0) {
    container.innerHTML = '<p>No current initiatives to display.</p>';
    return;
  }

  container.innerHTML = currentInitiatives
    .map(initiative => `
      <div class="initiative">
        <div class="initiative-header">
            ${initiative.links?.primary ? 
              `<a href="${initiative.links.primary}" target="_blank">${initiative.name}</a>` :
              initiative.name
            }
          <span class="type-badge ${initiative.type.toLowerCase()}">${initiative.type}</span>
        </div>
        ${initiative.description ? `<p class="description">${initiative.description}</p>` : ''}
        ${renderLinks(initiative.links)}
      </div>
    `)
    .join('');
}

function renderImages(images) {
  if (!images) return '';
  
  if (images.primary) {
    return `<div class="background-image" style="background-image: url('${images.primary}')"></div>`;
  }
  return '';
}
