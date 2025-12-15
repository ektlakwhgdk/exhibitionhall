function renderGallery() {
    const gallery = document.querySelector('.gallery');
    const BASE_PATH = '/exhibitionhall/'; 

    artworks.forEach(artwork => {
        const exhibitDiv = document.createElement('div');
        exhibitDiv.className = 'exhibit';

        exhibitDiv.innerHTML = `
            <img src="${BASE_PATH}${artwork.image}" alt="${artwork.alt}">
            <div class="exhibit-info">
                <h3>${artwork.title}</h3>
                <p>${artwork.description}</p>
            </div>
        `;

        gallery.appendChild(exhibitDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderGallery);
