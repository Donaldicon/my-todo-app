import React, { useState, useEffect } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [newTodo, setNewTodo] = useState();
  const [todoList, setTodoList] = useState( () => {
    const savedItems = localStorage.getItem("todos")
    return savedItems ? JSON.parse(savedItems) : tasks 
  });

  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])
  

  // get the new todo inputed
  const handleChange = (event) => {
    setNewTodo(event.target.value)
  }

  // add todo
  const addTodo = () => {
    if(newTodo.trim() === ("")){
      alert("I know what you are!")
      return;
    }

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTodo,
      completed: false,
    }

    setTodoList([...todoList, task]);

    // clear input field after add is clicked
    setNewTodo("")
  }

  // deleteTodo
  const deleteTodo = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id))
  }

  // done with task or Todo
  const doneTodo = (id) => {
    setTodoList(todoList.map((task) => task.id === id ? {...task, completed: !task.completed} : task))
  }


  const startEditing = (id, currentText) => {
    setEditTodoId(id);
    setEditText(currentText || "");
  }

  const saveEdit = (id) => {
    if(editText.trim() === "") {
      alert("Don't be Lazy. Enter Todo..")
      return;
    }
    setTodoList(todoList.map((task) => task.id === id ? {...task, taskName:editText} : task) )
    setEditTodoId(null);
  }

  return (
    <div className='h-screen'>
      {/* Input field */}
      <div className='h-[150px] md:h-[200px] lg:h-[300px] bg-white flex items-center justify-center space-x-3 lg:space-x-5'>
        <input type="text" placeholder='Enter Todos...' value={newTodo || ''} className='w-[70%] max-w-[700px] border-[1px]  border-gray-500 pl-3 lg:pl-7 h-[40px] lg:h-[60px] outline-none' onChange={handleChange}/>
        <button className='h-[40px] lg:h-[60px] bg-green-500 px-5' onClick={addTodo}> + </button>
      </div>

      {/* display todo */}
      <div className='px-[5%] py-[2%] bg-blue-400 h-screen'>
        {todoList.map((task,index) => (
          <div key={task.id} className={`flex flex-col space-y-5 md:space-y-0 md:flex-row items-start justify-between py-5 px-7 lg:mb-7 transition-all ease-in-out duration-500`}>
            <div className='flex items-start justify-start space-x-2 md:space-x-5'>
              <div>{index + 1}</div>
              <div>
              {editTodoId === task.id ? (<input type='text' placeholder='Enter new Todo...' value={editText}  onChange={(e) => setEditText(e.target.value)} className='w-[300px] md:w-[350px] lg:w-[500px] border-[1px]  border-gray-500 pl-1 lg:pl-3 h-[30px] lg:h-[60px] outline-none'/>) : (<div className={`w-[300px] md:max-w-[350px] lg:max-w-[500px] break-words ${task.completed ? 'line-through' : 'bg-none' }`}>{task.taskName}</div>) }
              </div>
            </div>
            <div className='flex items-center space-x-4 lg:space-x-7'>
              <div className='bg-gray-500 text-white h-[30px] lg:h-[45px] px-3 flex items-center justify-center'>
              {editTodoId === task.id ?  (<button onClick={()=>saveEdit(task.id)}><FontAwesomeIcon icon={faSave}/></button>) : (<button onClick={()=> startEditing(task.id)}><FontAwesomeIcon icon={faPen}/></button> ) }
              </div>
             
              <div onClick={() => doneTodo(task.id)}>
                {task.completed && task.id ? (<button className='bg-white text-red-500 h-[30px] lg:h-[45px] px-3'><FontAwesomeIcon icon={faArrowLeftRotate} /></button>) : (<button className='bg-white text-green-500 h-[30px] lg:h-[45px] px-3'><FontAwesomeIcon icon={faCheck}/></button>)}
              </div>

              <button onClick={() => deleteTodo(task.id)} className='h-[30px] lg:h-[45px] bg-red-500 px-3'><FontAwesomeIcon icon={faTrash}/></button>

            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default App