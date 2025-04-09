import React, { useState, useEffect } from 'react'

const App = () => {
  const [todoList, setTodoList] = useState(()=> {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : tasks 
  });
  const [newTodo, setNewTodo] = useState("");
  const [changeTodoId, setChangeTodoId] = useState(null);
  const [changeText, setChangeText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])
  

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  }

  const addTodo = () => {
    const task = {
      id: Date.now(),
      taskName: newTodo,
      completed: false,
    }
    setTodoList([...todoList, task]);
    setNewTodo("");
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id))
  }
  const updateTodo = (id) => {
    setTodoList(todoList.map((task)=> 
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  const startEditing = (id, currentText) => {
    setChangeTodoId(id);
    setChangeText(currentText);
  }

  const saveEditing = (id) => {
    setTodoList(todoList.map((task) => task.id === id ? {...task, taskName:changeText} : task ))
    setChangeTodoId(null)
  }

  return (
    <div 
    className=' h-screen'>
      {/* input container */}
      <div 
      className='h-[100px] md:h-[200px] lg:h-[300px] bg-white flex items-center justify-center space-x-3'>

        <input 
        type="text" 
        placeholder='Enter Todo..' 
        value={newTodo}
        className='border-gray-500 border-[1px] w-[70%] max-w-[700px] h-[40px] pl-3 outline-none'
        onChange={handleChange}/>

        <button
        className='h-[40px] bg-green-500 px-3 hover:bg-black hover:text-green-500 transition-all ease-in-out duration-500'
        onClick={addTodo}>
          Add
        </button>

      </div>

      {/* display todos */}
      <div className='bg-[#158cbb7b]'>
      {todoList.map((task,index) => (
        <div key={task.id} className={`flex ${task.completed ? 'bg-green-500' : 'bg-none'}`}>
          <div>{index + 1}</div>
          {changeTodoId === task.id ? (<input type='text' placeholder='enter new todo' onChange={(e)=>setChangeText(e.target.value)}/>) :
          (<div>{task.taskName}</div>)}

          {changeTodoId === task.id ? (<div onClick={()=>saveEditing(task.id)}>Save</div>): (<button onClick={()=>startEditing(task.id, task.taskName)}>Edit</button>) }
          
          <button onClick={()=>deleteTodo(task.id)}>Delete</button>
          <button onClick={()=>updateTodo(task.id)}>{task.completed ? 'undo' : 'done'}</button>
        </div>
        
      ))}</div>
    </div>
  )
}

export default App