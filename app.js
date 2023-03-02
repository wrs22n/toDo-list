const addItemText = document.querySelector(".task__add");
const addItemBtn = document.getElementById("btn");
const todoList = document.querySelector(".todo");
const clearAll = document.querySelector(".clear");


const todo = [];

if (document.cookie != "") {
    addCookie(todo); 
}

addItemBtn.addEventListener("click", (e) => {
    let newTodo = {
        todoListItem: addItemText.value
    }

    if (addItemText.value === '') return;
    createChangeElement(addItemText.value);
    todo.push(newTodo)
    addItemText.value = '';

    document.cookie =`todo=${JSON.stringify(todo)}; expires=Mon, 20 Mar 2023 12:00:00 UTC`;

    
})

function createChangeElement(element) {
    //todo.forEach((element,i) => {

    /* create li */ 
    const item = document.createElement("li");
    item.classList.add('todo__item') ;
/* create input */ 
    const itemInput = document.createElement("input");
    itemInput.classList.add("todo__text");
    itemInput.value = element;
    itemInput.setAttribute("readonly","readonly");
/* create div */ 
    const itemDiv = document.createElement("div");
/* create btn-edit */ 
    const itemBtnEdit = document.createElement("button");
    itemBtnEdit.classList.add("edit");
/* create img-edit */ 
    const itemImgEdit = document.createElement("img");
    itemImgEdit.src = './img/edit.png';
/* create btn-delete */ 
    const itemBtnDelete = document.createElement("button");
    itemBtnDelete.classList.add("delete");
/* create img-delete */ 
    const itemImgDelete = document.createElement("img");
    itemImgDelete.src = './img/trash-bin.png';
    
    item.appendChild(itemInput);
    item.appendChild(itemDiv);
    itemDiv.appendChild(itemBtnEdit);
    itemDiv.appendChild(itemBtnDelete);
    itemBtnEdit.appendChild(itemImgEdit);
    itemBtnDelete.appendChild(itemImgDelete);
    todoList.appendChild(item);

    editElement(itemBtnEdit,itemInput);
    deleteElement(itemBtnDelete,item,itemInput);

    /*delete all*/ 
    clearAll.addEventListener("click", (e) => {
        todoList.innerHTML = "";
        document.cookie =`todo=${JSON.stringify(todo.splice(0,todo.length))}`;
    })

    //}) 
}

function editElement(btn,input) {
    let switchItem = "0";
    let firstInput = input.value;
    btn.addEventListener("click", (e) => {
        if (switchItem === '0') {
            input.removeAttribute("readonly");
            switchItem = '1';
        } else if (switchItem === '1') {
            input.setAttribute("readonly","readonly");
            switchItem = '0';
            let elements = document.cookie.split('=');
            let arr = JSON.parse(elements[1]);
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                for (const key in element) {
                    if (element[key] === firstInput) {
                        element[key] = input.value;
                    }
                }
            }
            document.cookie =`todo=${JSON.stringify(arr)}; expires=Mon, 20 Mar 2023 12:00:00 UTC`;
        }   
    })
}

function deleteElement(btn,li,input) {
    btn.addEventListener("click",(e) => {
        todoList.removeChild(li);
        let elements = document.cookie.split('=');
        let arr = JSON.parse(elements[1]);
        newArr = [];
        for (let i = 0; i < arr.length; i++) {
            for (const key in arr[i]) {
                if (arr[i][key] !== input.value) {
                    newArr.push(arr[i]);            
                }
            }
        };
        document.cookie =`todo=${JSON.stringify(newArr)}; expires=Mon, 20 Mar 2023 12:00:00 UTC`;
    })
}

function addCookie(array) {
    let elements = document.cookie.split('=');
    let arr = JSON.parse(elements[1]);
    for (let i = 0; i < arr.length; i++) {
        for (const key in arr[i]) {
            array.push(arr[i]);
            createChangeElement(arr[i][key]);
        }
    }
}