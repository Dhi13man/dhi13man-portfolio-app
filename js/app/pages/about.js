console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║     You have entered the realm of the legendary              ║
    ║                  DHIMAN SEAL                                 ║
    ║    Digital Architect • Code Mystic • Entrepreneur            ║
    ║                                                              ║
    ║   "Where technology meets divine craftsmanship"              ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`);

function renderAbout(about) {
    const section = document.getElementById('about');
    section.querySelector('h2').innerText = about.tagline;
    const container = section.querySelector('.content');
    let p = container.querySelector('p');
    if (!p) {
        p = document.createElement('p');
        container.appendChild(p);
    }
    p.innerHTML = about.description.replace(/\n/g, '<br>');
}

function renderCurrentInitiatives(ventures, projects) {
    const container = document.querySelector('#about .current-initiatives .content');
    if (!container) return;

    // Get current ventures with images
    const currentVentures = ventures
        .filter(v => v.roles.some(r => isDatePresent(r.endDate)))
        .map(
            venture => ({
                name: venture.name,
                description: venture.about,
                links: venture.links,
                images: venture.images,
                type: 'Venture'
            })
        );

    // Get current projects with images
    const currentProjects = projects.filter(p => isDatePresent(p.endDate))
        .map(
            project => ({
                name: project.name,
                description: project.description,
                links: project.links,
                images: project.images,
                type: 'Project'
            })
        );

    const currentInitiatives = [...currentVentures, ...currentProjects];
    if (currentInitiatives.length === 0) {
        container.innerHTML = '<p>No current initiatives to display.</p>';
        return;
    }

    container.innerHTML = currentInitiatives
        .map(initiative => `
        <div class="initiative">
          ${renderBackground(initiative.images)}
          <div class="initiative-header">
              ${initiative.links?.primary ?
                `<a href="${initiative.links.primary}" target="_blank">${initiative.name}</a>` :
                initiative.name
            }
            <span class="type-badge ${initiative.type.toLowerCase()}" role="button" tabindex="0">${initiative.type}</span>
          </div>
          ${initiative.description ? `<p class="description">${initiative.description}</p>` : ''}
          ${renderSectionMetadata(initiative.links, initiative.images)}
        </div>
      `)
        .join('');

    // Add click handlers to type badges
    container.querySelectorAll('.type-badge').forEach(badge => {
        badge.addEventListener('click', (e) => {
            e.preventDefault();
            const type = badge.textContent.toLowerCase();
            const sections = document.querySelectorAll('main section');
            const targetId = type === 'venture' ? 'ventures' : 'projects';

            // Hide all sections
            sections.forEach(sec => sec.classList.add('hidden'));

            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Add keyboard accessibility
        badge.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                badge.click();
            }
        });
    });
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        renderAbout(portfolioData.about);
        renderCurrentInitiatives(
            portfolioData.ventures, 
            portfolioData.projects
        );
    }
);
