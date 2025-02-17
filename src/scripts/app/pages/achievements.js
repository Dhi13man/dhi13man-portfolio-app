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

function renderCerts(certs) {
  const certsContainer = document.querySelector('#certifications .certifications-content');
  let certsHtml = certs.map(cert => `
    <div class="cert">
      <h4>${cert.title}</h4>
      <p><em>${cert.issuer}, ${formatDateRange(cert.startDate, cert.endDate)}</em></p>
      ${cert.description ? `<p class="description">${cert.description}</p>` : ''}
      ${cert.details ? `<ul class="details">${cert.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
  certsContainer.innerHTML = certsHtml;
}

function renderTestScores(scores) {
  const container = document.querySelector('#testScores .test-scores-content');
  container.innerHTML = scores.map(score => `
    <div class="score">
      <h4>${score.name}</h4>
      <p><strong>${score.score}</strong>, ${formatDateRange(score.startDate, score.endDate)}</p>
      ${score.description ? `<p class="description">${score.description}</p>` : ''}
      ${score.details ? `<ul class="details">${score.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const achievements = getAchievementsData();
    renderAwards(achievements.honorsAndAwards);
    renderCerts(achievements.licensesAndCertifications);
    renderTestScores(achievements.testScores);
  }
);
