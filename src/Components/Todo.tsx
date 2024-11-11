import { useState } from 'react'
import Services from '../Services';
import ITodo from '../ITodo';
import style from "../Css/TodoCss.module.css"

const Todo = () => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoes, setTodoes] = useState<ITodo[]>(Services.getData());
  const [todoText, setTodoText] = useState<string>("");
  const [mess, setMess] = useState<string>('');

  const handletChange = (e:any) => {
    setTodoText(e.target.value.toUpperCase());
  }

  const onSubmitValue = (e:any) => {

    e.preventDefault()

    if (todoText !== "") {
      Services.postData(todoText);
      setTodoes(Services.getData());
      location.reload();
    }else{
      setMess("Por favor complete el campo..");
      setTimeout(() => {
        setMess("");
      }, 5000);
    }
  }

  const deleteTodo = (id:any) => {
    Services.deleteData(id);
    setTodoes(Services.getData());
  }

  // ==================== Btn contaier ==================== \\

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveAll, setIsActiveAll] = useState<boolean>(false);
  const [isActiveCompleted, setIsActiveCompleted] = useState<boolean>(false);

  const showAll = () => {
    setIsActiveAll(true);
    setIsActive(false);
    setIsActiveCompleted(false);
    setTodoes(Services.getData());
  }

  const showActive = () => {

    setIsActiveAll(false);
    setIsActive(true);
    setIsActiveCompleted(false);

    const active:ITodo[] = Services.getData();
    const todo = []
    for (const key in active) {
      if (Object.prototype.hasOwnProperty.call(active, key)) {
        const element = active[key];
        if (element.completed !== true) {
          todo.push(element);
        }
      }

      setTodoes(todo);

    }
  }

  const showCompleted = () => {

    setIsActiveAll(false);
    setIsActive(false);
    setIsActiveCompleted(true);

    const active:ITodo[] = Services.getData();
    const todo = []
    for (const key in active) {
      if (Object.prototype.hasOwnProperty.call(active, key)) {
        const element = active[key];
        if (element.completed !== false) {
          todo.push(element);
        }
      }

      setTodoes(todo);

    }
  }

  // ======================== Edit ======================== \\

  const TodoList = ({itemList, showEdit}:{itemList:ITodo, showEdit:boolean}) => {

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isCheked, setIsCheked] = useState<boolean>(itemList.completed);
    const [textChange, setTextChange] = useState<string>(itemList.todo);

    const EditChange = (e:any) => {
      setTextChange(e.target.value.toUpperCase());
    }

    const onEditValue = (e:any) => {
      e.preventDefault();

      if (textChange != "") {
        itemList.todo = textChange;
        itemList.completed = isCheked;
        Services.putData(itemList);
        setIsUpdate(showEdit);
      }else{
        setMess("Por favor complete el campo..");
        setTimeout(() => {
          setMess("");
        }, 5000);
      }
    }

    return (
      <div>
        {

          isUpdate?
          <form className={style.formEdit} >
            <input type="checkbox" checked={isCheked} onChange={() => setIsCheked(!isCheked)} className={style.check} title={isCheked? 'Click to Incompleted' : 'Click to Completed.'} />
            <input type="text" maxLength={30} className={style.inputText} onChange={(e) => EditChange(e)} value={textChange.toUpperCase()} />
            <input type="submit" className={style.inputBtn} value="Update" onClick={(e) => onEditValue(e)} />
          </form>

          :

          <ul className={style.listUl}>
            <li className={style.liContainerTodo}>
              <input className={style.inputTextEdit} style={itemList.completed? {textDecoration: 'line-through'} : {} } type="text" value={itemList.todo} readOnly />
            </li>
            <li className={style.btnContaner} >
              <button className={style.btnEdit} onClick={() => setIsUpdate(true)}>Edit</button>
              <button className={style.btnDelete} onClick={() => deleteTodo(itemList.id)} >Delete</button>
            </li>
          </ul>

        }
      </div>
    )
  }

  // ======================== btnOptions ======================== \\

  const CheckAll = () => {

    const active:ITodo[] = Services.getData();
    const todo:ITodo[] = [];

    for (let i = 0; i < active.length; i++) {
      const element = active[i];
      element.completed = true

      todo.push(element);
    }

    setTodoes(todo);
    Services.putSaveData(todo);
    setTodoes(Services.getData());

  }

  const UnCheckAll = () => {

    const active:ITodo[] = Services.getData();
    const todo:ITodo[] = [];

    for (let i = 0; i < active.length; i++) {
      const element = active[i];
      element.completed = false

      todo.push(element);
    }

    setTodoes(todo);
    Services.putSaveData(todo);
    setTodoes(Services.getData());

  }

  const RemoveCompleted = () => {

    const active:ITodo[] = Services.getData();
    const todo:ITodo[] = [];

    for (let i = 0; i < active.length; i++) {
      const element = active[i];

      todo.push(element);
    }

    Services.putSaveData(todo.filter((item) => item.completed == false));
    setTodoes(Services.getData());

  }

  // ======================== Paginatión ======================== \\

  const [nPage, setNPage] = useState<number>(5);
  const [pPage, setPPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const nextPage = () => {

    if (nPage < todoes.length) {

      // console.log(todoes);
      setNPage(nPage + 5);
      setPPage(pPage + 5);
      setCurrentPage(currentPage + 1);

    }else{
      setMess("No Existen mas tareas...");

      setTimeout(() => {
        setMess("");
      }, 5000);
    }
  }

  const previousPage = () => {

    if (pPage > 0) {

      // console.log(todoes);
      setPPage(pPage - 5);
      setNPage(nPage - 5);
      setCurrentPage(currentPage - 1);

    }else{
      setMess("No Existen mas tareas...");

      setTimeout(() => {
        setMess("");
      }, 5000);
    }


  }

  return (
    <div className={style.container} >

      <div className={style.containerDiv}>
        <form className={style.formTodo} >
          <input type="text" className={style.inputText} maxLength={30} onChange={(e) => handletChange(e)}  />
          <input type="submit" className={style.inputBtn} value="Add" onClick={(e) => onSubmitValue(e)} />
        </form>

        <div className={style.containerbtn}>
          <button className={isActiveAll? style.activeBtn : style.containerBtnButton } onClick={showAll} >All</button>
          <button className={isActive? style.activeBtn : style.containerBtnButton } onClick={showActive} >Active</button>
          <button className={isActiveCompleted? style.activeBtn : style.containerBtnButton } onClick={showCompleted} >Completed</button>
        </div>

        <h3>{todoes.filter(c => c.completed == true).length} out of {todoes.length} items completed</h3>

        {/* <div className={style.listUl} > */}
        <div style={{height: "200px"}} >

          {
            todoes.slice(pPage, nPage).map((item) => (
              <TodoList itemList={item} showEdit={isEdit} key={item.id} />
            ))
          }

        </div>

        <div className={style.containerPagination}>
          <button onClick={previousPage} >Previous</button>
          <span>{currentPage}/{Math.ceil(todoes.length/5)}</span>
          <button onClick={nextPage} >Next</button>
        </div>

        <strong style={{color:"red", height: "20px", display: "block"}} >{mess}</strong>

        <hr />

        <div className={style.containerBtnOption} >
          {todoes.filter(c => c.completed == true).length == todoes.length? <button onClick={UnCheckAll} >UnCheck All</button> : <button onClick={CheckAll} >Check All</button> }
          <button onClick={RemoveCompleted} >Remove Completed</button>
        </div>

      </div>
    </div>
  )
}

export default Todo;