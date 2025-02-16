function renderVentures(ventures) {
  const container = document.querySelector('#ventures .content');
  container.innerHTML = ventures.map(venture => `
      <div class="venture">
        ${renderBackground(venture.images)}
        <h3>
          ${venture.links?.primary ?
      `<a href="${venture.links.primary}" target="_blank">${venture.name}</a>` :
      venture.name}
        </h3>
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
        ${renderSectionMetadata(venture.links, venture.images)}
      </div>
    `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => renderVentures(portfolioData.ventures),
);
