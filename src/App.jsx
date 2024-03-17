import React from 'react';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo,setTodo]=useState('');
  const [todos,setTodos]=useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [showFinished,setShowFinished]=useState(true);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);
   
  const toggleFinished= (e)=>{
        setShowFinished(!showFinished);
  }
  
  const handleAdd = () =>{
      const newTodo={id:uuidv4(),todo, isCompleted:false};
      setTodos(prevTodo=>[...prevTodo,newTodo]);
      setTodo('');
    
  }

  const handleEdit = (e,id) =>{
    let t=todos.filter(item=>{
      return item.id===id;
    })
    setTodo(t[0].todo);
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
     setTodos(newTodos);
   
  }

  const handleDelete = (e,id) =>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
     setTodos(newTodos);
    
  }


  const handleChange =(e) =>{
    setTodo(e.target.value);

  }

  const handleCheckBox = (e) => {
     let id=e.target.name;
     setTodos(prevTodos=>
      prevTodos.map(todo=>
        todo.id===id?{...todo,isCompleted:!todo.isCompleted}:todo));
    
  };
  
  

  return (
    <>
    <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-10 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-1/2 ">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your tasks at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add a Task</h2>
        <input onChange={handleChange}  type="text" className='w-full rounded-lg px-5 py-1' value={todo}/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-800 disabled:bg-slate-600 hover:bg-slate-950 p-2 py-1 text-white text-sm font-bold rounded-md '>Save</button>
      </div>
          <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='my-4' id='show' />
            <label htmlFor="show" className='mx-2'>Show Finished</label>
          <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
          <h2 className='text-xl font-bold'>Your Tasks</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No Tasks to display</div>}
             {todos.map(item=>{
            return ( (showFinished || !item.isCompleted) &&
          <div key={item.id} className="todo flex justify-between w-full my-3 px-5">
            <div className='flex gap-5'>
            <input onChange={handleCheckBox} type="checkbox"  checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
<div className="buttons flex h-full">
  <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-slate-800 hover:bg-slate-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
  <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-800 hover:bg-slate-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><MdDelete /></button>
</div>
</div>)
 })} 
           
      </div>
      </div>
    </>
  )
}

export default App
