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
let newItem = []; // 객체들을 담아줄 배열 선언(체크리스트 정보들 담는 곳)

//----- 텍스트 입력하고 확인 누르면 체크리스트에 추가 + 객체 정보 저장
confirmBtn.addEventListener("click", (event) => {
    // 동적 생성(확인 눌렀을때 실시간으로 추가)
    let addList = document.createElement("div"); // 체크박스와 텍스트 묶는 박스
    addList.setAttribute("class", "List");
    let addCheckBox = document.createElement("input"); // 체크박스
    addCheckBox.setAttribute("type", "checkbox"); // 체크박스 속성 값 설정
    addCheckBox.setAttribute("class", "CheckBox");
    newItem.push({ checked: addCheckBox.checked, text: modalText.value }); // 새 항목을 배열에 추가

    addCheckBox.addEventListener("change", function () {
        let onChecked = Number(addCheckBox.getAttribute("data-index")); // 클릭된 체크박스의 인덱스 번호를 가져와서 변수에 담음
        newItem[onChecked].checked = addCheckBox.checked; // newItem 배열에서 그 번호에 해당하는 항목의 checked를 현재 체크박스 실제 상태로 업데이트함
        localStorage.setItem("newItem_obj", JSON.stringify(newItem)); // 체크상태 변경시 localStorage 업데이트
    });

    let addText = document.createElement("p"); // 텍스트
    addText.setAttribute("class", "Text");

    // 큰 div 안에 체크박스, 텍스트 추가
    addList.appendChild(addCheckBox);
    addList.appendChild(addText);
    check_list.appendChild(addList);

    addText.innerText = modalText.value; // 텍스트를 p태그 안에 넣어줌
    addCheckBox.setAttribute("data-index", newItem.length - 1); // 체크박스 번호 부여.
    localStorage.setItem("newItem_obj", JSON.stringify(newItem)); // 배열을 문자열로 변환해서 localStorage에 저장
});
let list_obj = localStorage.getItem("newItem_obj"); // localStorage에서 저장된 체크리스트 문자열 가져옴
newItem = JSON.parse(list_obj) || []; // 문자열을 다시 배열로 변환하여 변수 재할당. 이때 처음 실행시 null이 아닌 빈 배열을 넣어줘야함. 왜냐? Parse 랑 null이 만나면 오류가 생기기 때문 

for(i = 0; i < newItem.length; i++){ // 새로고침 후 localStrage에 불러와서 다시 그림. for문으로 하나씩 newItem에서 꺼내옴
    let reList = document.createElement("div");
    reList.setAttribute("class", "List");
    let reCheckBox = document.createElement("input");
    reCheckBox.setAttribute("type", "checkbox");
    reCheckBox.setAttribute("class", "CheckBox");
    let reText = document.createElement("p");
    reText.setAttribute("class", "Text");

    // 큰 div안에 체크박스, 텍스트 추가
    reList.appendChild(reCheckBox);
    reList.appendChild(reText);
    check_list.appendChild(reList);

    // 반복문으로 텍스트와 체크여부를 다시 화면에 그림
    reText.innerHTML = newItem[i].text;
    reCheckBox.checked = newItem[i].checked;
}

// 확인 버튼 누르면 모달창 닫힘
confirmBtn.addEventListener("click", (event) => {
    modalScreen.style.display = "none";
});

//------- 취소 버튼 누르면 모달창 닫침
cancleBtn.addEventListener("click", (event) => {
    modalScreen.style.display = "none";
});