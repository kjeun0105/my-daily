import type { Filter } from '../types.ts'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
]

type TodoFilterProps = {
  filter: Filter
  remainingCount: number
  doneCount: number
  onChangeFilter: (filter: Filter) => void
  onClearDone: () => void
}

// 필터 버튼 + 남은 할 일 개수 + 완료 항목 지우기
function TodoFilter({ filter, remainingCount, doneCount, onChangeFilter, onClearDone }: TodoFilterProps) {
  return (
    <div className="todo-filter">
      <div className="todo-filter-buttons">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'active' : ''}
            onClick={() => onChangeFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="todo-count">남은 할 일 {remainingCount}개</span>
      <button type="button" className="todo-clear" onClick={onClearDone} disabled={doneCount === 0}>
        완료 지우기
      </button>
    </div>
  )
}

export default TodoFilter
