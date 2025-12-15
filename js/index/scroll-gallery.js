// ========================================
// 무한 스크롤 갤러리
// ========================================
// 메인 페이지의 작품 미리보기 스크롤 갤러리
// artworks 배열을 두 번 복제하여 끊김 없는 무한 스크롤 구현
// ========================================

// DOM 요소 선택
const scrollTrack = document.getElementById('scrollTrack');

// 작품 배열을 두 번 복제하여 무한 스크롤 구현
const duplicatedArtworks = [...artworks, ...artworks];

// 각 작품을 이미지 요소로 생성하여 스크롤 트랙에 추가
duplicatedArtworks.forEach(artwork => {
    const imgElement = document.createElement('img');
    imgElement.src = artwork.src;
    imgElement.alt = artwork.alt;
    imgElement.className = 'scroll-item';
    
    scrollTrack.appendChild(imgElement);
});

// ========================================
// 애니메이션 설정
// ========================================

let scrollPosition = 0;
const scrollSpeed = 0.5; // 픽셀/프레임

// 애니메이션 함수 - 끊김 없이 계속 스크롤
function animate() {
    scrollPosition += scrollSpeed;
    
    // 첫 번째 세트가 완전히 지나가면 위치 리셋
    const firstSetWidth = scrollTrack.scrollWidth / 2;
    if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0;
    }
    
    scrollTrack.style.transform = `translateX(-${scrollPosition}px)`;
    requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();
