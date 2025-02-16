function formatDateRange(startDate, endDate) {
    if (startDate && endDate) {
        return `${startDate} - ${endDate}`;
    }
    return startDate || endDate || '';
}

function isDatePresent(date) {
    return date === 'Present';
}
