import React, { useEffect, useState } from 'react'
import { Students, Tasks } from './types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { useParams } from 'react-router-dom'
import {
  MainContent,
  StudentName,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  ResultsContainer,
  TableResultContainer,
  BimesterTitle,
  HorizontalLine,
  StudentInfoContainer,
  StudentInfo
} from './styles'


const StudentResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<Students[]>([]);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Students | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks')
      const tasksSnapshot = await getDocs(tasksCollection)

      const tasksData: Tasks[] = tasksSnapshot.docs.map((doc) => {
      const data = doc.data();

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

    }).filter((tasksData): tasksData is Tasks => tasksData !== undefined)

    setTasks(tasksData)
    };
    fetchTasks()
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
    setCurrentStudent(students.find((student) => student.id == id) || null)
  }, [id, students])

  const tasksByBimester = tasks.reduce((acc: Record<number, Tasks[]>, task) => {
    if (task.bimester && task.studentsId.includes(id || '')) {
      if (!acc[task.bimester]) {
        acc[task.bimester] = [];
      }
      acc[task.bimester].push(task);
    }
    return acc;
  }, {});

  const StudentResultTable: React.FC<{ bimester: number, tasks: Tasks[] }> = ({ bimester, tasks }) => {
    const bimesterTotal = tasks.reduce((sum, task) => {
      const studentIndex = task.studentsId.findIndex(studentId => studentId === id);
      return sum + (task.studentsGrades[studentIndex] || 0);
    }, 0);

    const bimesterAverage = bimesterTotal / tasks.length;
    
    return (
      <TableResultContainer>
        <BimesterTitle>{bimester}º Bimestre</BimesterTitle>
        <ContentContainer>
          <Table>
            <TableRow>
              <TableHeader>Tarefa</TableHeader>
              <TableHeader>Nota</TableHeader>
            </TableRow>
            {tasks.map((task) => {
              const studentIndex = task.studentsId.findIndex(studentId => studentId === id);
              const grade = task.studentsGrades[studentIndex] || 0;
              
              return (
                <TableRow key={task.id}>
                  <TableData>{task.name}</TableData>
                  <TableData>{grade}</TableData>
                </TableRow>
              );
            })}
            <TableRow>
              <TableData><strong>Total</strong></TableData>
              <TableData><strong>{bimesterAverage.toFixed(1)}</strong></TableData>
            </TableRow>
          </Table>
        </ContentContainer>
      </TableResultContainer>
    );
  };

  const totalAverage = Object.values(tasksByBimester).reduce((acc, bimesterTasks) => {
    const bimesterAverage = bimesterTasks.reduce((sum, task) => {
      const studentIndex = task.studentsId.findIndex(studentId => studentId === id);
      return sum + (task.studentsGrades[studentIndex] || 0);
    }, 0) / bimesterTasks.length;
    return acc + bimesterAverage;
  }, 0);

  return (
    <MainContent>
      <StudentName>Aluno: {currentStudent?.name || 'indefinido'}</StudentName>
      <ResultsContainer>
        {Object.entries(tasksByBimester).map(([bimester, tasks]) => (
          <StudentResultTable 
            key={bimester} 
            bimester={Number(bimester)}
            tasks={tasks}
          />
        ))}
      </ResultsContainer>
      <HorizontalLine/>
      <StudentInfoContainer>
        <StudentInfo>
          Media total: <strong>{totalAverage.toFixed(1)}</strong>
        </StudentInfo>
        <StudentInfo>
          Estado: {totalAverage >= 60 ? 'Aprovado' : 'Reprovado'}
        </StudentInfo>
      </StudentInfoContainer>
    </MainContent>
  )
}


export default StudentResult