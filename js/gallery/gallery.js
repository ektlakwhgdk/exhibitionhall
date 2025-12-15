// ========================================
// DOM 요소 선택
// ========================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');
const bgm = document.getElementById('bgm');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

// ========================================
// 모달 열기 / 닫기
// ========================================
function openModal(imgSrc, title, description) {
    modal.classList.add('active');
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
}

function closeModal() {
    modal.classList.remove('active');
}

// ========================================
// 이벤트 위임 (⭐ 핵심)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener('click', function (e) {
        const exhibit = e.target.closest('.exhibit');
        if (!exhibit) return;

        const img = exhibit.querySelector('img');
        const title = exhibit.querySelector('h3').textContent;
        const description = exhibit.querySelector('p').textContent;

        openModal(img.src, title, description);
    });
});

// 닫기 버튼
closeBtn.addEventListener('click', closeModal);

// 모달 바깥 클릭
modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
});

// ========================================
// 볼륨 컨트롤
// ========================================
bgm.volume = 0.1;

volumeSlider.addEventListener('input', function () {
    bgm.volume = this.value / 100;
    updateVolumeIcon();
});

volumeBtn.addEventListener('click', function () {
    bgm.muted = !bgm.muted;
    updateVolumeIcon();
});

function updateVolumeIcon() {
    if (bgm.muted || bgm.volume === 0) {
        volumeBtn.textContent = '🔇';
    } else if (bgm.volume < 0.5) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
}
