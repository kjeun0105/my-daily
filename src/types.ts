// 할 일 하나의 데이터 모양
export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

// 목록 필터 종류: 전체 / 진행 중 / 완료
export type Filter = 'all' | 'active' | 'done'
