// ========================================
// 갤러리 렌더링
// ========================================
// artworks 배열의 데이터를 기반으로 갤러리 전시품 생성
// 각 작품의 이미지, 제목, 설명을 동적으로 렌더링
// ========================================

// ========================================
// 갤러리 렌더링 함수
// ========================================
function renderGallery() {
    const gallery = document.querySelector('.gallery');
    
    // 현재 페이지의 경로를 기준으로 이미지 경로 결정
    const basePath = window.location.pathname.includes('/gallery/') ? '../' : '';
    
    // 각 작품을 순회하며 전시품 요소 생성
    artworks.forEach(artwork => {
        const exhibitDiv = document.createElement('div');
        exhibitDiv.className = 'exhibit';
        
        // 작품 정보를 HTML로 구성
        exhibitDiv.innerHTML = `
            <img src="${basePath}${artwork.image}" alt="${artwork.alt}">
            <div class="exhibit-info">
                <h3>${artwork.title}</h3>
                <p>${artwork.description}</p>
            </div>
        `;
        
        // 갤러리에 전시품 추가
        gallery.appendChild(exhibitDiv);
    });
}

// ========================================
// 페이지 로드 시 갤러리 렌더링
// ========================================
document.addEventListener('DOMContentLoaded', renderGallery);
