function renderSectionMetadata(links, images) {
    const photosHtml = renderPhotos(images);
    const linksHtml = renderSourceLinks(links);

    if (!linksHtml && !photosHtml) return '';

    return `<div class="section-footer">
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
