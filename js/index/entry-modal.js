// ========================================
// 입장 모달 처리
// ========================================
// 전시관 입장을 위한 방문자 정보 입력 모달
// 입력된 정보를 검증하고 localStorage에 저장
// ========================================

// DOM 요소 선택
const enterBtn = document.getElementById('enterBtn');
const entryModal = document.getElementById('entryModal');
const entryClose = document.querySelector('.entry-close');
const entryForm = document.getElementById('entryForm');
const errorOkBtn = document.getElementById('errorOkBtn');

// ========================================
// 로그인 시도 제한 설정
// ========================================
let failedAttempts = parseInt(localStorage.getItem('failedAttempts')) || 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5분 (밀리초)
let lockoutEndTime = parseInt(localStorage.getItem('lockoutEndTime')) || null;

// ========================================
// 에러 모달 표시 함수
// ========================================
function showErrorModal(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorModal.classList.add('active');
}

// 에러 모달 닫기 함수
function closeErrorModal() {
    const errorModal = document.getElementById('errorModal');
    errorModal.classList.remove('active');
}

// ========================================
// 잠금 상태 확인 및 관리
// ========================================

// 잠금 상태 확인 함수
function checkLockout() {
    if (lockoutEndTime && Date.now() < lockoutEndTime) {
        return true; // 잠금 상태
    }
    if (lockoutEndTime && Date.now() >= lockoutEndTime) {
        // 잠금 시간 만료
        lockoutEndTime = null;
        failedAttempts = 0;
        localStorage.removeItem('lockoutEndTime');
        localStorage.removeItem('failedAttempts');
        enableEnterButton();
    }
    return false; // 잠금 해제 상태
}

// 입장 버튼 비활성화
function disableEnterButton() {
    enterBtn.disabled = true;
    enterBtn.style.opacity = '0.5';
    enterBtn.style.cursor = 'not-allowed';
}

// 입장 버튼 활성화
function enableEnterButton() {
    enterBtn.disabled = false;
    enterBtn.style.opacity = '1';
    enterBtn.style.cursor = 'pointer';
    enterBtn.textContent = '전시관 입장하기';
}

// 남은 시간 표시 업데이트
function updateLockoutTimer() {
    if (!lockoutEndTime) return;
    
    const remainingTime = lockoutEndTime - Date.now();
    if (remainingTime <= 0) {
        checkLockout();
        return;
    }
    
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    enterBtn.textContent = `입장 제한 (${minutes}:${seconds.toString().padStart(2, '0')})`;
    
    setTimeout(updateLockoutTimer, 1000);
}

// 잠금 시작
function startLockout() {
    lockoutEndTime = Date.now() + LOCKOUT_TIME;
    localStorage.setItem('lockoutEndTime', lockoutEndTime);
    localStorage.setItem('failedAttempts', failedAttempts);
    disableEnterButton();
    updateLockoutTimer();
}

// ========================================
// 모달 이벤트 리스너
// ========================================

// 입장 버튼 클릭 시 모달 열기
enterBtn.addEventListener('click', function() {
    // 잠금 상태 확인
    if (checkLockout()) {
        const remainingTime = Math.ceil((lockoutEndTime - Date.now()) / 1000);
        showErrorModal(`너무 많은 시도로 인해 입장이 제한되었습니다. ${Math.floor(remainingTime / 60)}분 ${remainingTime % 60}초 후 다시 시도하세요.`);
        return;
    }
    entryModal.classList.add('active');
});

// 닫기 버튼 클릭 시 모달 닫기
entryClose.addEventListener('click', function() {
    entryModal.classList.remove('active');
});

// 모달 배경 클릭 시 닫기
entryModal.addEventListener('click', function(e) {
    if (e.target === entryModal) {
        entryModal.classList.remove('active');
    }
});

// 에러 모달 확인 버튼 클릭 시 닫기
errorOkBtn.addEventListener('click', closeErrorModal);

// ========================================
// 페이지 로드 시 잠금 상태 확인
// ========================================
// 페이지 로드 시 잠금 상태가 있으면 타이머 시작
if (checkLockout()) {
    disableEnterButton();
    updateLockoutTimer();
}

// ========================================
// 폼 제출 처리
// ========================================

entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 입력값 가져오기
    const name = document.getElementById('visitorName').value;
    const birthday = document.getElementById('visitorBirthday').value;
    const gender = document.getElementById('visitorGender').value;
    
    // 입력값 검증 - 배열에서 일치하는 유저 찾기
    // USER_VALID는 valid-users.js에서 로드됨
    const validUser = USER_VALID.find(user => 
        user.name === name && 
        user.birthday === birthday && 
        user.gender === gender
    );
    
    if (!validUser) {
        failedAttempts++;
        localStorage.setItem('failedAttempts', failedAttempts);
        
        if (failedAttempts >= MAX_ATTEMPTS) {
            showErrorModal(`5회 실패로 인해 5분간 입장이 제한됩니다.`);
            entryModal.classList.remove('active');
            startLockout();
        } else {
            const remainingAttempts = MAX_ATTEMPTS - failedAttempts;
            showErrorModal(`꺼지쇼 (남은 시도: ${remainingAttempts}회)`);
        }
        return;
    }
    
    // 성공 시 실패 횟수 초기화
    failedAttempts = 0;
    localStorage.removeItem('failedAttempts');
    localStorage.removeItem('lockoutEndTime');
    
    // 로컬 스토리지에 방문자 정보 저장
    localStorage.setItem('visitorName', name);
    localStorage.setItem('visitorBirthday', birthday);
    localStorage.setItem('visitorGender', gender);
    
    // 전시관 페이지로 이동
    window.location.href = 'gallery/gallery.html';
});
