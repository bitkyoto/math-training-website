import { MemoryTask, ResultTask, Task } from '@/types/Task'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import sha256 from 'crypto-js/sha256'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export function getDivisor(num: number, range: number) {
  let divisors: number[] = []
  if (range === 1) {
    for (let i = 1; i < 10; i++) {
      if (num % i === 0) divisors.push(i)
    }
  }
  if (range === 2) {
    for (let i = 10; i < 100; i++) {
      if (num % i === 0) divisors.push(i)
    }
  }
  if (range === 3) {
    for (let i = 100; i < 1000; i++) {
      if (num % i === 0) divisors.push(i)
    }
  }
  if (divisors.length >= 1) {
    let res = divisors[Math.floor(Math.random() * divisors.length)]
    return res
  }
  return 1
}

export const generateTask = (operation: number, number1: number, number2: number) => {
  let n1 = 0,
    n2 = 0
  switch (number1) {
    case 1:
      n1 = getRandomInt(1, 10)
      break
    case 2:
      n1 = getRandomInt(10, 100)
      break
    case 3:
      n1 = getRandomInt(100, 1000)
      break
  }
  switch (number2) {
    case 1:
      n2 = getRandomInt(1, 10)
      break
    case 2:
      n2 = getRandomInt(10, 100)
      break
    case 3:
      n2 = getRandomInt(100, 1000)
      break
  }
  switch (operation) {
    case 1: {
      const task: Task = {
        num1: n1,
        num2: n2,
        operation: '+',
        answer: n1 + n2,
      }
      return task
    }
    case 2: {
      const task: Task = {
        num1: n1,
        num2: n2,
        operation: '-',
        answer: n1 - n2,
      }
      return task
    }
    case 3: {
      const task: Task = {
        num1: n1,
        num2: n2,
        operation: '*',
        answer: n1 * n2,
      }
      return task
    }
    case 4: {
      const max = Math.max(n1, n2)
      const range = n1 >= n2 ? number2 : number1
      const num2 = getDivisor(max, range)
      const task: Task = {
        num1: max,
        num2: num2,
        operation: '/',
        answer: max / num2,
      }
      return task
    }
    default:
      return {
        num1: 0,
        num2: 0,
        operation: '',
        answer: 0,
      }
  }
}

interface Data {
  tasks: number
  correctPercentage: number
}

export const generateCalculusTasks = (mode) => {
  if (mode.selectedNumbers.length >= 1 && mode.selectedOperations.length >= 1) {
    const selectedOperations = [...mode.selectedOperations]
    const selectedNumbers = [...mode.selectedNumbers]
    const tasks: Task[] = []
    for (let i = 0; i < mode.amountOfTasks; i++) {
      const operation = selectedOperations[Math.floor(Math.random() * selectedOperations.length)]
      const number1 = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)]
      const number2 = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)]
      tasks.push(generateTask(operation, number1, number2)!)
    }
    return tasks
  }
}
export const generateMemoryTasks = (mode): MemoryTask[] => {
  const tasks: MemoryTask[] = []
  for (let i = 0; i < mode.amountOfTasks; i++) {
    tasks.push(generateMemoryTask())
  }
  return tasks
}
const generateMemoryTask = (): MemoryTask => {
  return { num1: getRandomInt(10000, 100000) }
}
export function writeResults(tasks: ResultTask[]) {
  const correctTasks = tasks.filter((task: ResultTask) => task.isCorrect)
  const correctPercentage = correctTasks.length / tasks.length
  if (!localStorage.getItem('data')) {
    const dataToWrite: Data = {
      tasks: tasks.length,
      correctPercentage,
    }
    const data: Data[] = [dataToWrite]
    localStorage.setItem('data', `${JSON.stringify(data)}`)
    localStorage.setItem(
      'previousAnswer',
      sha256(tasks.reduce((cur, task) => cur + task.question + task.userAnswer, '')).toString()
    )
  } else {
    if (
      localStorage.getItem('previousAnswer') !==
      sha256(tasks.reduce((cur, task) => cur + task.question + task.userAnswer, '')).toString()
    ) {
      let data: Data[] = JSON.parse(localStorage.getItem('data')!)
      data.push({
        tasks: tasks.length,
        correctPercentage,
      })
      localStorage.setItem('data', `${JSON.stringify(data)}`)
      localStorage.setItem(
        'previousAnswer',
        sha256(tasks.reduce((cur, task) => cur + task.question + task.userAnswer, '')).toString()
      )
    }
  }
}
export function getResults() {
  const results = localStorage.getItem('data')
  if (results) {
    const parsedResults: Data[] = JSON.parse(results)
    console.log(JSON.parse(results))
    return parsedResults.map((result, index) => ({
      tasks: result.tasks,
      correctPercentage: result.correctPercentage * 100, // Преобразуем процент в число от 0 до 100
    }))
  }
  return []
}
export function getGeneralResults() {
  const results = localStorage.getItem('data')
  if (results) {
    const parsedResults: Data[] = JSON.parse(results)
    return parsedResults.map((result, index) => ({
      index: index + 1,
      correctPercentage: result.correctPercentage * 100, // Преобразуем процент в число от 0 до 100
    }))
  }
  return []
}

export function getAveragePercentage(res: Data[]) {
  const sum = res.reduce((prev, cur) => prev + cur.correctPercentage, 0)
  return sum / res.length
}
