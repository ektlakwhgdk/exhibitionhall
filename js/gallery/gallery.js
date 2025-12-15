// ========================================
// DOM 요소 선택
// ========================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');
const exhibits = document.querySelectorAll('.exhibit');
const bgm = document.getElementById('bgm');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

// ========================================
// 모달 열기 함수
// ========================================
function openModal(imgSrc, title, description) {
    modal.classList.add('active');
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
}

// ========================================
// 모달 닫기 함수
// ========================================
function closeModal() {
    modal.classList.remove('active');
}

// ========================================
// 이벤트 리스너 등록
// ========================================

// 전시품 클릭 이벤트
exhibits.forEach(exhibit => {
    exhibit.addEventListener('click', function() {
        const img = this.querySelector('img');
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        
        openModal(img.src, title, description);
    });
});

// 닫기 버튼 클릭 이벤트
closeBtn.addEventListener('click', closeModal);

// 모달 배경 클릭 시 닫기
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// ========================================
// 볼륨 컨트롤
// ========================================

// 초기 볼륨 설정
bgm.volume = 0.1;

// 볼륨 슬라이더 이벤트
volumeSlider.addEventListener('input', function() {
    bgm.volume = this.value / 100;
    updateVolumeIcon();
});

// 볼륨 버튼 클릭 (음소거/해제)
volumeBtn.addEventListener('click', function() {
    if (bgm.muted) {
        bgm.muted = false;
        volumeSlider.value = bgm.volume * 100;
    } else {
        bgm.muted = true;
    }
    updateVolumeIcon();
});

// 볼륨 아이콘 업데이트
function updateVolumeIcon() {
    if (bgm.muted || bgm.volume === 0) {
        volumeBtn.textContent = '🔇';
    } else if (bgm.volume < 0.5) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
}