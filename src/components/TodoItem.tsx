import type { Todo } from '../types.ts'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// 할 일 한 줄
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.done ? 'todo-item done' : 'todo-item'}>
      <label className="todo-label">
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button type="button" className="todo-delete" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  )
}

export default TodoItem
