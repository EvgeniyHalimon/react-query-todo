import { useQuery } from "react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { AddTodoForm } from "../form/AddTodoForm"
import { getTodos, patchTodo, deleteTodo } from "../../api/todoApi"
import { useCustomMutation } from "../../hooks/useCustomMutation"


const TodoList = () => {

    const {isLoading, isError, error, data: todos} = useQuery(
        'todos', getTodos, 
        { select: data => data.sort((a,b) => b.id - a.id)}
    )

    const updateTodoMutation = useCustomMutation(patchTodo, 'todos')
    const deleteTodoMutation = useCustomMutation(deleteTodo, 'todos')

    if(isLoading){
        return <p>Loading...</p>
    } 

    if (isError){
        return <p>{error.message}</p>
    } 

    return(
        <main>
            <h1>Todo List</h1>
            <AddTodoForm/>
            {todos.map((todo) => 
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button 
                        className="trash" 
                        onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )}
        </main>
    )
}

export {TodoList}