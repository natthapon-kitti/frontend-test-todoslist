import { useEffect, useState } from "react"
import { useApi } from "./apiContext"
import { FaTrashAlt } from "react-icons/fa"
import { Button, Checkbox, Input, Form, Skeleton, ColorPicker } from "antd"
import { BiPencil } from "react-icons/bi";


type Todo = { id: number; text: string; done: boolean, color: string };

const Todos = () => {
  const { getTodos, createTodo, updateTodo, deleteTodo } = useApi()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form] = Form.useForm()


  useEffect(() => {
    setLoading(true)
    fetchTodos()

  }, [])

  useEffect(() => {
    console.log("Editing ID changed:", editingId);
  }, [editingId])

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


  const handleCreateTodo = async (text: string, color: string) => {

    // setState for seamless user experience
    setTodos([...todos, {
      text: text, done: false, color: color,
      id: 0
    }])
    console.log(text)
    form.resetFields()
    await createTodo(text, false, color)
    await fetchTodos()

  }

  const toHexString = (colorObject) => {
    if (colorObject && colorObject.toHexString) {
      return colorObject.toHexString()
    }
    return undefined
  };


  return (
    <div className="text-black flex flex-col items-start">
      <h2 className="font-semibold text-3xl">Todos List</h2>
      <br />
      <h2 className=" text-2xl">Today</h2>
      {
        loading
          ?
          <div className="m-5 w-full">
            <Skeleton />
          </div>
          :
          <div className="w-full mt-2 ">
            {
              todos.map((todo: { id: number, text: string, done: boolean, color: string }) => (
                <div key={todo.id} className="w-full md:w-[50%] relative pb-2 pt-2 ">

                  {/* bg */}
                  <div
                    style={{ backgroundColor: todo.color }} className="opacity-20 absolute top-0 left-0 w-full h-full z-0 ">

                  </div>

                  <div className=" w-full flex items-center space-x-2 " >


                    <label className="flex items-center w-full group cursor-pointer  p-2 rounded "
                      onClick={async () => {
                        handleUpdateTodo(todo.id, { text: todo.text, done: !todo.done })
                      }}
                    >

                      <Checkbox
                        checked={todo.done}
                        className="rounded-full !z-30"


                      >
                        {editingId === todo.id ? (
                          <Input
                            defaultValue={todo.text}
                            autoFocus
                            onBlur={async (e) => {
                              setEditingId(null)
                              if (e.target.value.trim() && e.target.value !== todo.text) {
                                await handleUpdateTodo(todo.id, { text: e.target.value, done: todo.done })
                              }
                            }}
                            onKeyDown={async (e) => {
                              if (e.key === 'Enter') {
                                setEditingId(null)
                                if (e.currentTarget.value.trim() && e.currentTarget.value !== todo.text) {
                                  await handleUpdateTodo(todo.id, { text: e.currentTarget.value, done: todo.done })
                                }
                              }
                            }
                            }

                          />
                        )
                          :
                          <p className={` w-full text-left pl-2 ${todo.done ? "line-through " : ""} `}>
                            {todo.text}
                          </p>
                        }






                      </Checkbox>


                    </label>

                    <div className="flex gap-x-2 absolute right-2">
                      <Button

                        className="cursor-pointer "
                        onClick={() => {
                          setEditingId(todo.id)
                        }}
                        icon={<BiPencil />}
                      >

                      </Button>

                      <Button
                        danger
                        variant="solid"
                        color="red"
                        className="text-white "
                        onClick={async () => {
                          handleDeleteTodo(todo.id)
                        }}
                        icon={<FaTrashAlt />}
                      >
                      </Button>
                    </div>

                  </div>
                  <div className="absolute bottom-0 w-full h-[1px] bg-slate-300 p-0 m-0" />


                </div>

              ))
            }
          </div>

      }

      <Form
        form={form}
        className="w-full md:w-[50%] gap-x-2  flex items-center !mt-6"
        onFinish={(e) => {
          const colorHex = toHexString(e.color)
          console.log(colorHex)

          handleCreateTodo(e.task, colorHex)
        }}

      >
        <Form.Item
          name='task'
          rules={[{ required: true, message: 'Please input your task' }]}
          className="w-full"
        >
          <Input placeholder="task name" ></Input>

        </Form.Item>
        <Form.Item name='color'>
          <ColorPicker defaultValue="#FF0000" format="hex" showText />
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