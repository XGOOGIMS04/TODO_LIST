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


// ----- 동기부여
let text = document.querySelector("#text_box");
text.addEventListener("keydown", down => { // 엔터 누르면 콘솔에 찍힘
    if (down.key == 'Enter'){
    console.log(text.value);
}});