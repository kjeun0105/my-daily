import type { Todo } from '../types.ts'
import TodoItem from './TodoItem.tsx'

type TodoListProps = {
  todos: Todo[]
  emptyMessage: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, emptyMessage, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-empty">{emptyMessage}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TodoList
