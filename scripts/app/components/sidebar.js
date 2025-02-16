function renderSidebar() {
  return `
      <link rel="stylesheet" href="styles/components/sidebar.css" />
      <div class="sidebar">
        <div class="sidebar-header">
          <h1>Dhiman Seal</h1>
        </div>
        <nav>
          <a href="index.html">About</a>
          <a href="ventures.html">Ventures</a>
          <a href="projects.html">Projects</a>
          <a href="experiences.html">Work Experience</a>
          <a href="achievements.html">Achievements</a>
          <a href="recommendations.html">Recommendations</a>
          <a href="education.html">Education</a>
        </nav>
        <div class="social-buttons">
          <a href="https://linkedin.com/in/dhi13man/" class="btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="assets/logos/linkedin.svg" alt="LinkedIn" loading="lazy"/>
          </a>
          <a href="https://github.com/Dhi13man" class="btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="assets/logos/github.svg" alt="GitHub" loading="lazy"/>
          </a>
          <a href="https://medium.com/@dhi13man" class="btn" target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <img src="assets/logos/medium.svg" alt="Medium" loading="lazy"/>
          </a>
        </div>
        <footer class="sidebar-footer">
          <p>&copy; Dhiman Seal 2024</p>
        </footer>
      </div>
      <button class="sidebar-toggle" title="Toggle Sidebar" type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>
    `;
}

// After DOM is ready, inject sidebar into the container
document.addEventListener('DOMContentLoaded', () => {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderSidebar();
  }
  // Sidebar toggle functionality
  const toggleButton = document.querySelector('.sidebar-toggle');
  const body = document.body;

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('sidebar-collapsed');
    });
  }
  // Close sidebar when clicking nav links (especially on mobile)
  document.querySelectorAll('.sidebar nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        body.classList.remove('sidebar-collapsed');
      }
    });
  });
});
