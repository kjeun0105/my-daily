import { useState } from 'react'
import type { Filter } from './types.ts'
import { useTodos } from './hooks/useTodos.ts'
import TodoInput from './components/TodoInput.tsx'
import TodoFilter from './components/TodoFilter.tsx'
import TodoList from './components/TodoList.tsx'

const EMPTY_MESSAGES: Record<Filter, string> = {
  all: '할 일이 없어요. 새로운 할 일을 추가해 보세요!',
  active: '진행 중인 할 일이 없어요. 모두 끝냈어요!',
  done: '아직 완료한 할 일이 없어요.',
}

// 예: "11월 10일 화요일"
const today = new Date().toLocaleDateString('ko-KR', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
})

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearDone } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  // 아래 값들은 todos와 filter에서 계산할 수 있으므로 state로 따로 두지 않는다
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })
  const remainingCount = todos.filter((todo) => !todo.done).length
  const doneCount = todos.length - remainingCount

  return (
    <main className="app">
      <header className="app-header">
        <h1>My Daily</h1>
        <p className="today">{today}</p>
      </header>
      <TodoInput onAdd={addTodo} />
      <section className="card">
        {todos.length > 0 && (
          <TodoFilter
            filter={filter}
            remainingCount={remainingCount}
            doneCount={doneCount}
            onChangeFilter={setFilter}
            onClearDone={clearDone}
          />
        )}
        <TodoList
          todos={visibleTodos}
          emptyMessage={todos.length === 0 ? EMPTY_MESSAGES.all : EMPTY_MESSAGES[filter]}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </section>
    </main>
  )
}

export default App
