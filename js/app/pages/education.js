function renderEducation(education) {
  const container = document.querySelector('#education .content');
  container.innerHTML = education.map(school => `
    <div class="school">
      ${renderBackground(school.images)}
      <h3>${school.links?.primary ?
      `<a href="${school.links.primary}" target="_blank" rel="noopener noreferrer">${school.name}</a>` :
      school.name}</h3>
      ${school.about ? `<p class="about-org">${school.about}</p>` : ''}
      <div class="courses">
        ${school.courses.map(course => `
          <div class="course">
            <p class="degree">${course.degree || ''} ${course.field ? `in ${course.field}` : ''}, <em>${formatDateRange(course.startDate, course.endDate)}</em></p>
            <p class="grade"><strong>${course.gpa ? `GPA: ${course.gpa}` : course.percent ? `Grade: ${course.percent}` : ''}</strong></p>
            ${course.description ? `<p class="description">${course.description}</p>` : ''}
            ${course.details ? `<ul class="details">${course.details.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
          </div>
        `).join('')}
      </div>
      ${renderSectionMetadata(school.links, school.images)}
    </div>
  `).join('');
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const education = getEducationData();
    renderEducation(education);
  },
);
