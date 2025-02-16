function renderBackground(images) {
    if (!images?.primary) {
        return '';
    }
    return `<div class="background-image" style="background-image: url('${images.primary}')"></div>`;
}
