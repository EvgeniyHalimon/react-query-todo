import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

import { postTodo } from "../../api/todoApi"
import { useCustomMutation } from "../../hooks/useCustomMutation"

const AddTodoForm = () => {
    const [newTodo, setNewTodo] = useState('')

    const postTodoMutation = useCustomMutation(postTodo, 'todos')

    const handleSubmit = (e) => {
        e.preventDefault()
        postTodoMutation.mutate({title: newTodo, completed: false})
        setNewTodo('')
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )
}

export {AddTodoForm}