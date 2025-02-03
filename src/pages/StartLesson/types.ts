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