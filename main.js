// ---- header_날짜
let date_section = document.querySelector("header"); /* header 요소 가져옴 */

// 날짜 구하기
let today = new Date() 
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();
today = (`${year}.${month+1}.${day}`); /* 문자열 포맷팅 */

// YY.MM.DD 를 header 에 넣어줌
date_section.innerHTML = today;


// ----- article_동기부여
let text = document.querySelector("#text_box");
text.addEventListener("keydown", down => { // 엔터 누르면 커서 사라짐(포커스 제거)
    if (down.key == 'Enter' && !down.isComposing){ // 엔터 && 한글조합 끝나면 실행
    text.blur(); // 커서 사라짐(포커스 제거)
    localStorage.setItem("user_text", text.value); // setIte()함수로 localStorage에 아이템 추가
}});
const user_text = localStorage.getItem("user_text") || ""; // getItem() 함수로 localStorage의 아이템 읽기
text.value = user_text; // input 창에 값 저장


//----- 추가버튼, 모달창 연결
let addBtn = document.querySelector('.btn'); // 버튼 가져옴
let modalScreen = document.querySelector("#modal-container"); // 모달 컨테이너 가져옴

// 추가버튼 누르면 숨어있던 오버레이와 모달창 block
addBtn.addEventListener("click", (event) => { 
    modalScreen.style.display = "flex";
});

let confirmBtn = document.querySelector("#confirm");
let cancleBtn = document.querySelector("#cancle");
let modalText = document.querySelector("#modal-text");
let check_list = document.querySelector("#contents"); // 체크리스트 가져옴 -> 텍스트 넣어줘야함

//----- 텍스트 입력하고 확인 누르면 체크리스트에 추가
confirmBtn.addEventListener("click", (event) => {

    // 동적 생성
    let addList = document.createElement("div"); // 체크박스와 텍스트 묶는 박스
    addList.setAttribute("class", "addList");
    let addCheckBox = document.createElement("input"); // 체크박스
    addCheckBox.setAttribute("type", "checkbox"); // 체크박스 속성 값 설정
    addCheckBox.setAttribute("class", "checkBox");
    let addText = document.createElement("p"); // 텍스트
    addText.setAttribute("class", "addText");

    // 큰 div 안에 체크박스, 텍스트 추가
    addList.appendChild(addCheckBox);
    addList.appendChild(addText);
    check_list.appendChild(addList);

    addText.innerText = modalText.value; // 텍스트를 p태그 안에 넣어줌
    console.log(modalText.value); // 텍스트 테스트용
});

// 확인 버튼 누르면 모달창 닫힘
confirmBtn.addEventListener("click", (event) => {
    modalScreen.style.display = "none";
});

//------- 취소 버튼 누르면 모달창 닫침
cancleBtn.addEventListener("click", (event) => {
    modalScreen.style.display = "none";
});