import { useEffect, useState } from "react"
import { useApi } from "./apiContext"
import { FaTrashAlt } from "react-icons/fa"
import { Button, Checkbox, Input, Form, Skeleton } from "antd"


type Todo = { id: number; text: string; done: boolean };

const Todos = () => {
  const { getTodos, createTodo, updateTodo, deleteTodo } = useApi()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    setLoading(true)
    fetchTodos()

  }, [])



  const fetchTodos = async () => {

    try {
      const todos = await getTodos()
      console.log(todos)
      setTodos(todos)

      setTimeout(() => {
        setLoading(false)
      }, 500);
    }
    catch (error) {
      console.error("Failed to fetch todos:", error)
    }

  }

  const handleUpdateTodo = async (id: number, data: { text: string, done: boolean }) => {
    // setState for seamless user experience
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, ...data } : todo))

    await updateTodo(id, data)


  }

  const handleDeleteTodo = async (id: number) => {
    // setState for seamless user experience
    setTodos(
      todos.filter(todo => todo.id !== id))
    console.log(todos)
    await deleteTodo(id)
  }


  const handleCreateTodo = async (text: string) => {
    const newTask = text.task
    // setState for seamless user experience
    setTodos([...todos, { text: newTask, done: false }])
    console.log(text)
    form.resetFields()
    await createTodo(newTask, false)
    await fetchTodos()

  }


  return (
    <div className="text-black flex flex-col items-start">
      <h1 className="font-semibold">Todos List</h1>
      <br />
      <h2 className="font-semibold text-2xl">Today</h2>
      {
        loading
          ?
          <div className="m-5 w-full">
            <Skeleton />
          </div>
          :
          todos.map((todo: { id: number, text: string, done: boolean }) => (
            <div key={todo.id} className="w-full md:w-[50%]">
              <div className="w-full flex items-center space-x-2 my-2 ">

                <label className="flex items-center w-full group cursor-pointer  p-2 rounded "
                  onClick={async () => {
                    handleUpdateTodo(todo.id, { text: todo.text, done: !todo.done })
                  }}
                >

                  <Checkbox
                    checked={todo.done}
                    className="rounded-full"
                  >
                    <p className={` w-full text-left pl-2 ${todo.done ? "line-through " : ""} `}>
                      {todo.text}
                    </p>
                  </Checkbox>

                </label>

                <Button danger className="text-white bg-amber-50 " onClick={async () => {
                  handleDeleteTodo(todo.id)
                }}>
                  <FaTrashAlt />
                </Button>
              </div>
              <hr className="w-full h-2 text-slate-300" />
            </div>

          ))
      }

      <Form
        form={form}
        className="w-full md:w-[50%] gap-x-2  flex items-center !mt-6"
        onFinish={(e) => {
          handleCreateTodo(e)
        }}

      >
        <Form.Item
          name='task'
          rules={[{ required: true, message: 'Please input your task' }]}
          className="w-full"
        >
          <Input placeholder="task name" ></Input>

        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className=" w-24 h-full"
            htmlType="submit"
          >

            Add Task
          </Button>
        </Form.Item>


      </Form>

    </div >
  )
}

export default Todos