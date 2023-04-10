//先綁定DOM
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const txt = document.querySelector("#todoInput");
const checkbox = document.querySelector(".checkbox");
const filterBtn = document.querySelector(".filter");

//先弄個空陣列
let todos =[];

//建立新增功能，並建立待辦的資料格式
const addTodo = (todo)=> {
  let newTodo = {
    id: todos.length,
    content: todo,
    status: false
  }
  console.log(newTodo);
  todos.push(newTodo);
}

//在按鈕上綁定監聽事件-新增待辦
save.addEventListener('click',(e)=>{
  if(txt.value.trim() === ""){ 
//助教所給的優化建議:判斷輸入框是否為空值的判斷式建議加上 .trim() 移除字串起始與結尾處的空白字元，避免使用者只輸入空白字元 ( 空格 ) 就將請求送出。
    alert("待辦事項不得為空白");
    return;
  }else{
    addTodo(txt.value);
    todoInput.value = '';
    render(todos);
 }
});

//渲染功能,利用innerHTML
const render= (todos) =>{
  let str = "";
  todos.forEach(function(item,index,data){
    //<span class="todo-text">買牛奶</span>
    str +=` 
    <li class="listContent" data-num="${index}">
     <input type="checkbox" ${item.status ? 'checked' : ''} />
      <span class="item">${item.content}</span>
      <button class="delete">刪除</button>
      <button class="update">編輯</button>
    </li>
    `})
  // console.log(str);
  list.innerHTML = str;
};
             
/*利用這點才有辦法去管理之後的刪除功能 data-num="${index}" */
 
list.addEventListener("click", function(e) {
  let target = e.target;
  //在按鈕上綁定監聽事件-刪除待辦
  if (target.getAttribute("class") === "delete") {
    let num = target.parentNode.getAttribute("data-num");
    // console.log(num)
    todos.splice(num, 1);
    render(todos); 
  } 
  //在按鈕上綁定監聽事件-修改待辦 
    else if (target.getAttribute("class") === "update") {
    let num = target.parentNode.getAttribute("data-num");
    let item = list.querySelectorAll("span")[num];
    // let item = list.querySelectorAll("span")
    // [object NodeList] (3) ["<span/>","<span/>","<span/>"]
    
    let input = document.createElement("input");
    // console.log(input);
    input.type = "text";
    input.value = item.textContent.trim();
    // console.log(input);
    item.replaceWith(input);
    input.focus();
    
    input.addEventListener("blur", function(e) {
      let newItem = input.value.trim();
      if (newItem !== "") {
        todos[num].content = newItem;
        // console.log(todos[num]);
        render(todos);
      } 
    });
    input.addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        input.blur();
      }
    });
  }else if(e.target.nodeName === 'INPUT'){
    let num = e.target.parentNode.getAttribute("data-num");
    todos[num].status= !todos[num].status;
    console.log(todos[num]);
    render(todos); 
  }
});

//篩選三按鈕
filterBtn.addEventListener('click', function(e) {
  if (e.target.getAttribute("class") === "all"){
    render(todos);
    console.log(e.target);
    e.target.classList.toggle("active");
  } else if (e.target.getAttribute("class") === "done"){
    const filterTodos = todos.filter(item => item.status);
    render(filterTodos);
  } else if (e.target.getAttribute("class") === "undone"){
    const filterTodos = todos.filter(item => !item.status);
    render(filterTodos);
  } 
});