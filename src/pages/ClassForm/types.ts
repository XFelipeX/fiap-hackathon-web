export interface FormValues {
  name: string
  room: string
  qntStudents: string
  shift: string
  status: string
  students: string[]
  teachers: string[]
}

export interface Teachers {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
  subjects: string[]
}

export interface Students {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
}