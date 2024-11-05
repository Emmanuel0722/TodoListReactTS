import './App.css'
import Todo from './Components/Todo'
import style from './Css/TodoCss.module.css'

function App() {

  return (
    <>
      <header className={style.headerApp} >
        <a target='blank' href="https://github.com/Emmanuel0722">
          <img className={style.imTitle} src="./tasklist.png" alt="ImgTak" />
        </a>
      </header>
      <h1 className={ style.titleTask } >TaskList</h1>
      <Todo />
    </>
  )
}

export default App
