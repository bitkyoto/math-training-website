export interface Task {
  num1: number
  num2: number
  operation: string
  answer: number
  userAnswer?: number
}

export interface ResultTask{
  question: string
  userAnswer: string
  isCorrect: boolean
}
