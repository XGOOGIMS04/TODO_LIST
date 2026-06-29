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