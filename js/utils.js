function renderImages(images) {
    if (!images?.primary) {
        return '';
    }
    return `<div class="background-image" style="background-image: url('${images.primary}')"></div>`;
}

function formatDateRange(startDate, endDate) {
    if (startDate && endDate) {
        return `${startDate} - ${endDate}`;
    }
    return startDate || endDate || '';
}
