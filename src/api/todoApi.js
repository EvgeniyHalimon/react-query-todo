import axios from "axios";

const todosApi = axios.create({
    baseURL: 'http://localhost:3004'
})

export const getTodos = async () => {
    const responce = await todosApi.get('/todos')
    return responce.data
}

export const postTodo = async (todo) => {
    return await todosApi.post('/todos', todo)
}

export const patchTodo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

export const deleteTodo = async ({id}) => {
    return await todosApi.delete(`/todos/${id}`, id)
}

export default todosApi