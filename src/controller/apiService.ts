import axios from "axios"

const url = import.meta.env.VITE_API_ENDPOINT

const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
})


export const apiService = {

    // get all todos
    getTodos: async () => {
        const response = await api.get("/todos")
        return response.data
    },

    // create todo
    createTodo: (text: string, done: boolean, color: string) => api.post("/todos", ({ text: text, done: done,color: color })),

    // update todo by id
    updateTodo: (id: number, data: { text: string, done: boolean }) => api.put(`/todos/${id}`, data),

    // delete todo by id
    deleteTodo: (id: number) => api.delete(`/todos/${id}`),
}

// check api error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error)
        return Promise.reject(error)
    }
)

export default apiService