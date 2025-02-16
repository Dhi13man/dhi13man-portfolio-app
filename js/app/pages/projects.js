function renderProjects(projects) {
  const container = document.querySelector('#projects .content');
  container.innerHTML = projects.map(proj => `
    <div class="project">
      ${renderBackground(proj.images)}
      ${proj.links?.primary ?
      `<h3><a href="${proj.links.primary}" target="_blank">${proj.name}</a></h3>` :
      `<h3>${proj.name}</h3>`}
      <p><em>${formatDateRange(proj.startDate, proj.endDate)}</em></p>
      ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
      ${proj.details ? `<ul class="details">${proj.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
      ${proj.skills ? `<p class="skills"><strong>Skills:</strong> ${proj.skills.join(', ')}</p>` : ''}
      ${renderSectionMetadata(proj.links, proj.images)}
    </div>
  `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => renderProjects(portfolioData.projects),
);
