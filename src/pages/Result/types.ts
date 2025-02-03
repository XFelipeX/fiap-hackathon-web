export interface IResultTable {
  id: string
  studentId: string
  studentName: string
  grade1Bi: number
  grade2Bi: number
  grade3Bi: number
  grade4Bi: number
  total: number
}

export interface ResultTableProps {
  results: IResultTable[]
  navigate: (path: string) => void
  selectedClass: IClass | null | undefined
}

export interface IClass {
  id: string
  code: string
  name: string
  room: string
  qntStudents: string
  shift: string
  status: string
  students: string[]
  teachers: string[]
}

export interface FormValues {
  classId: string
}

export interface Students {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
}

export interface Tasks {
  bimester: number
  classId: string
  data: any
  name: string
  type: string
  value: number
  studentsGrades: []
  studentsId: []
}