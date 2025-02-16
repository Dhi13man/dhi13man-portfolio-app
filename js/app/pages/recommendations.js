function renderRecommendations(recommendations) {
    const container = document.querySelector('#recommendations .content');
    container.innerHTML = recommendations.map(rec => `
      <div class="recommendation">
        <p>"${rec.text}"</p><br>
        <p><strong>— ${rec.from}</strong></p>
        ${renderSectionMetadata(rec.links)}
      </div>
    `).join('');
}

document.addEventListener(
    'DOMContentLoaded',
    () => renderRecommendations(portfolioData.recommendations),
);