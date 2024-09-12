// 로그인 시뮬레이션 함수
function login() {
    let res = http.post('https://example.com/api/login', JSON.stringify({
        username: 'test_user',
        password: 'test_pass',
    }), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
        '로그인 성공': (r) => r.status === 200,
    });

    return res.json().cookies.session_id; // 세션 ID 반환
}

// 주식 조회 시뮬레이션 함수
function viewStock(session_id) {
    let res = http.get('https://example.com/api/stock/search?query=Samsung', {
        headers: { 'Cookie': `session_id=${session_id}` },
    });

    check(res, {
        '주식 조회 성공': (r) => r.status === 200,
    });
}

// 주식 매수 시뮬레이션 함수
function buyStock(session_id) {
    let res = http.post('https://example.com/api/stock/buy', JSON.stringify({
        stock_id: '005930', // 삼성 주식 예시
        quantity: 10,       // 10주 매수
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `session_id=${session_id}`,
        },
    });

    check(res, {
        '주식 매수 성공': (r) => r.status === 200,
    });
}

// 로그아웃 시뮬레이션 함수
function logout(session_id) {
    let res = http.post('https://example.com/api/logout', null, {
        headers: { 'Cookie': `session_id=${session_id}` },
    });

    check(res, {
        '로그아웃 성공': (r) => r.status === 200,
    });
}

// 각 가상 사용자(VU)가 실행할 기본 함수
export default function () {
    // 1. 로그인
    let session_id = login();

    // 2. 주식 조회
    viewStock(session_id);

    // 3. 주식 매수
    buyStock(session_id);

    // 4. 로그아웃
    logout(session_id);

    sleep(1); // 1초 대기
}
