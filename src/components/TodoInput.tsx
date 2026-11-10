import { useState, type FormEvent } from 'react'

type TodoInputProps = {
  onAdd: (text: string) => void
}

// 할 일 입력창 + 추가 버튼
function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // form 제출 시 페이지가 새로고침되지 않도록 막기

    const trimmed = text.trim()
    if (trimmed === '') return // 빈 입력은 무시

    onAdd(trimmed)
    setText('') // 추가 후 입력창 비우기
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoInput
