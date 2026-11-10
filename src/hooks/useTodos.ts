import { useEffect, useState } from 'react'
import type { Todo } from '../types.ts'

const STORAGE_KEY = 'my-daily.todos'

// 브라우저 저장소에서 할 일 목록 불러오기
function loadTodos(): Todo[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Todo[]) : []
  } catch {
    // 저장된 값이 깨졌거나 저장소를 쓸 수 없으면 빈 목록으로 시작
    return []
  }
}

// 할 일 목록 데이터와 추가/완료/삭제 기능을 묶은 커스텀 훅
export function useTodos() {
  // 처음 한 번만 저장소에서 불러온다
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  // todos가 바뀔 때마다 저장소에 저장한다
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // 저장소를 쓸 수 없는 환경(시크릿 모드 등)에서는 저장만 건너뛴다
    }
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
      createdAt: Date.now(),
    }
    // 기존 배열을 직접 바꾸지 않고, 새 항목을 붙인 새 배열을 만든다
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    // 해당 id 항목만 done 값을 뒤집은 새 객체로 바꾸고, 나머지는 그대로 둔다
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  const deleteTodo = (id: string) => {
    // 해당 id가 아닌 항목만 남긴 새 배열을 만든다
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearDone = () => {
    // 완료되지 않은 항목만 남긴다
    setTodos(todos.filter((todo) => !todo.done))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, clearDone }
}
