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
      <p><strong>${score.score}</strong> ${score.startDate ? `<em>(${score.startDate})</em>` : ''}</p>
      ${score.description ? `<p class="description">${score.description}</p>` : ''}
      ${score.details ? `<ul class="details">${score.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    renderAwards(portfolioData.honorsAndAwards);
    renderCerts(portfolioData.licensesAndCertifications);
    renderTestScores(portfolioData.testScores);
  }
);
