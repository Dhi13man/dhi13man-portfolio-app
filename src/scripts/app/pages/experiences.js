function renderExperience(experiences) {
  const container = document.querySelector('#experiences .content');
  container.innerHTML = experiences.map(exp => `
    <div class="company">
      ${renderBackground(exp.images)}
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
      ${renderSectionMetadata(exp.links, exp.images)}
    </div>
  `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const experiences = getExperiencesData();
    renderExperience(experiences);
  },
);
