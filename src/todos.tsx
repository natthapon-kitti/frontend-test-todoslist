import { useEffect, useState } from "react"
import { useApi } from "./apiContext"
import { FaTrashAlt } from "react-icons/fa"
import { Checkbox } from '@headlessui/react'

const Todos = () => {
  const { getTodos, createTodo, updateTodo, deleteTodo } = useApi()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchTodos()
  }, [])



  const fetchTodos = async () => {

    try {
      const todos = await getTodos()
      console.log(todos)
      setTodos(todos)
      setLoading(false)
    }
    catch (error) {
      console.error("Failed to fetch todos:", error)
    }

  }

  



  return (
    <div className="text-black flex flex-col items-start">
      <h1 className="font-semibold">Todos List</h1>
      <br />
      <h2 className="font-semibold text-2xl">Today</h2>
      {
        todos.map((todo: { id: number, text: string, done: boolean }) => (
          <div key={todo.id} className="w-full md:w-[50%]">
            <div className="w-full flex items-center space-x-2 my-2">

              <label className="flex items-center w-full group cursor-pointer  p-2 rounded "
                onClick={async () => {
                  await updateTodo(todo.id, { text: todo.text, done: !todo.done })
                  fetchTodos()
                }}
              >

                <Checkbox
                  checked={todo.done}
                  className=" group block size-4 rounded border bg-white data-checked:bg-blue-500 "
                >
                  <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Checkbox>
                <p className={` w-full text-left pl-2 ${todo.done ? "line-through " : ""} `}>
                  {todo.text}
                </p>
              </label>

              <button className="text-white bg-amber-50 " onClick={async () => {
                await deleteTodo(todo.id)
                fetchTodos()
              }}>
                <FaTrashAlt />
              </button>
            </div>
            <hr className="w-full h-2" />
          </div>

        ))
      }


    </div >
  )
}

export default Todos