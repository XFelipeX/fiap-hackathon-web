export interface LessonItemProps {
  lessons: Lesson[] | null | undefined;
  fetchLessons: () => Lesson[] | null | undefined
}

export interface Lesson {
  id: string
  timeDate: any
  teacherId: string
  teacher: any
  subject: string
  classId: string
  class: any
  status:  'agendada' | 'concluída' | 'cancelada'
  files: File[]
  code: string
}