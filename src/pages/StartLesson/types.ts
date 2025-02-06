export interface Translations {
  subjects: { [key: string]: string }
}

export interface Lesson {
  id: string
  timeDate: any
  teacherId: string
  teacher: any
  subject: string
  classId: string
  class: any
  status: 'agendada' | 'concluída' | 'cancelada'
  files: File[]
  code: string
}

export interface FormValues {
  lessonId: string
}

export interface Students {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
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