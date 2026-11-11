import type { Todo } from '../types.ts'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// 할 일 한 줄
function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // 실수로 지우지 않도록 한 번 더 확인한 뒤 삭제한다
  const handleDelete = () => {
    if (window.confirm(`'${todo.text}' 할 일을 삭제할까요?`)) {
      onDelete(todo.id)
    }
  }

  return (
    <li className={todo.done ? 'todo-item done' : 'todo-item'}>
      <label className="todo-label">
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button type="button" className="todo-delete" onClick={handleDelete}>
        삭제
      </button>
    </li>
  )
}

export default TodoItem
