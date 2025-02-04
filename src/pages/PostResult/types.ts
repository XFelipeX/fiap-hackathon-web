export interface PostResultTable {
  studentId: string,
  studentName: string,
  studentGrade: number
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

export interface Student {
  id: string;
  name: string;
}