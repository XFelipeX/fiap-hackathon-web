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