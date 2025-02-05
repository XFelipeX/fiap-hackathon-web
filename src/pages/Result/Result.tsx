import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { IResultTable, ResultTableProps, IClass, FormValues, Students, Tasks } from './types'
import { Formik, Form } from 'formik';
import {
  MainContent,
  UpperContent,
  FormContainer,
  ContentContainer,
  FeedBack,
  Table,
  TableRow,
  TableHeader,
  TableData,
  OptionsButtonContainer,
  OptionsButton,
  InputContainer,
  Label,
  SelectInput,
  Add
} from './styles'

function ResultTable ({ results, navigate, selectedClass }: ResultTableProps) {
  if (!selectedClass) {
    return (
      <FeedBack>Selecione uma turma</FeedBack>
    )
  }

  return (
    <Table>
      <TableRow>
        <TableHeader>Aluno(a)</TableHeader>
        <TableHeader>Média 1º B</TableHeader>
        <TableHeader>Média 2º B</TableHeader>
        <TableHeader>Média 3º B</TableHeader>
        <TableHeader>Média 4º B</TableHeader>
        <TableHeader>Total</TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
      {results.map((result, index) => (
        <TableRow key={index}>
          <TableData>{result.studentName}</TableData>
          <TableData>{result.grade1Bi}</TableData>
          <TableData>{result.grade2Bi}</TableData>
          <TableData>{result.grade3Bi}</TableData>
          <TableData>{result.grade4Bi}</TableData>
          <TableData>{result.total}</TableData>
          <TableData>
            <OptionsButtonContainer>
              <OptionsButton
                onClick={() => navigate(`/result/${result.studentId}`)}
              >
                Todas as notas
              </OptionsButton>
            </OptionsButtonContainer>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

const Result: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<Students[]>([]);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [selectedClass, setSelectedClass] = useState<IClass | null | undefined>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, 'class')
      const classesSnapshot = await getDocs(classesCollection)
  
      const classesData: IClass[] = classesSnapshot.docs.map((doc) => {
        const data = doc.data();

        if (doc.id !== 'counter') {  
          return {
            id: doc.id,
            code: data.code || '',
            name: data.name || '',
            qntStudents: data.qntStudents || '',
            room: data.room || '',
            shift: data.shift || '',
            status: data.status || '',
            students: data.students || [],
            teachers: data.teachers || [],
          };
        }
        return undefined
      }).filter((classData): classData is IClass => classData !== undefined)
  
      setClasses(classesData)
    };
  
    fetchClasses()
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students')
      const studentsSnapshot = await getDocs(studentsCollection)

      const studentsData: Students[] = studentsSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (doc.id !== 'counter') {  
        return {
          id: doc.id,
          code: data.code || '',
          name: data.name || '',
          birthDay: data.birthDay || '',
          tel: data.tel || '',
          email: data.email || ''
        };
      }
      return undefined
    }).filter((studentsData): studentsData is Students => studentsData !== undefined)

    setStudents(studentsData)
    };
    fetchStudents()
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks')
      const tasksSnapshot = await getDocs(tasksCollection)

      const tasksData: Tasks[] = tasksSnapshot.docs.map((doc) => {
      const data = doc.data();

      if (doc.id !== 'counter') {  
        return {
          bimester: data.bimester || undefined,
          classId: data.classId || '',
          data: data.data || '',
          name: data.name || '',
          type: data.type || '',
          value: data.value || undefined,
          studentsGrades: data.studentsGrades || [],
          studentsId: data.studentsId || [],
        };
      }
      return undefined
    }).filter((tasksData): tasksData is Tasks => tasksData !== undefined)

    setTasks(tasksData)
    };
    fetchTasks()
  }, []);

  const computedResults: IResultTable[] = selectedClass
  ? students
      .filter((student) => selectedClass.students.includes(student.id))
      .map((student) => {
        const studentTasks = tasks.filter((task) =>
          Array.isArray(task.studentsId) && task.studentsId.includes(student.id)
        );

        const gradesByBimester: Record<number, number[]> = { 1: [], 2: [], 3: [], 4: [] };

        studentTasks.forEach((task) => {
          if (task.bimester && task.studentsGrades) {
            const gradeIndex = task.studentsId.indexOf(student.id);
            if (gradeIndex !== -1) {
              gradesByBimester[task.bimester].push(task.studentsGrades[gradeIndex] || 0);
            }
          }
        });

        const calculateAverage = (grades: number[]) =>
          grades.length > 0
            ? grades.reduce((acc, grade) => acc + grade, 0)
            : 0;

        const grade1Bi = calculateAverage(gradesByBimester[1]);
        const grade2Bi = calculateAverage(gradesByBimester[2]);
        const grade3Bi = calculateAverage(gradesByBimester[3]);
        const grade4Bi = calculateAverage(gradesByBimester[4]);
        const total = grade1Bi + grade2Bi + grade3Bi + grade4Bi;

        return {
          id: student.id,
          studentId: student.id,
          studentName: student.name,
          grade1Bi,
          grade2Bi,
          grade3Bi,
          grade4Bi,
          total
        };
      })
  : [];

  const handleClassSelect = (values: FormValues) => {
    if (classes) {
      const classItem = classes.find((item) => item.id == values.classId)
      setSelectedClass(classItem)

    } else {
      setSelectedClass(null);
    }
  }

  function handleSubmit(values: { classId: string }): any {
    throw new Error('Function not implemented.')
  }
  
  return (
    <>
      <MainContent>
        <UpperContent>
          <FormContainer>
            <Formik
              initialValues={{ classId: ''}}
              enableReinitialize
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleChange, }) => (
                <Form>
                  <InputContainer>
                    <Label htmlFor="classId">Turma</Label>
                    <SelectInput
                      as="select"
                      name="classId"
                      id="classId"
                      onChange={(e) => {
                        handleChange(e)
                        handleClassSelect({ classId: e.target.value })
                      }}
                      value={values.classId}
                    >
                      <option value="">Selecione</option>
                        {classes.map((classItem) => (
                          <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                        ))}
                    </SelectInput>
                  </InputContainer>
                </Form>
              )}
            </Formik>
          </FormContainer>
          <Add onClick={() => navigate('/postResult')}>Lançar notas</Add>
        </UpperContent>
        <ContentContainer>
          <ResultTable results={computedResults} navigate={navigate} selectedClass={selectedClass}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Result