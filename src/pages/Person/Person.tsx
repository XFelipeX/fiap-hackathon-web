import React, { useState, useRef, useEffect } from 'react'
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  MainContent,
  Buttons,
  TeacherButton,
  StudentButton,
  Add,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  OptionsButtonContainer,
  OptionsButton,
  ToggleMenu,
  ToggleMenuList,
  ToggleMenuItem
} from './styles'
import { useNavigate } from 'react-router-dom'

interface TeachersTable {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
  subjects: string[]
}

interface StudentsTable {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
}

interface PersonTableProps {
  people: TeachersTable[] | StudentsTable[],
  openMenuIndex: number | null,
  toggleMenu: (index: number) => void,
  menuRef: React.RefObject<HTMLDivElement>,
  navigate: (path: string) => void,
}

function PersonTable ({ people, openMenuIndex, toggleMenu, menuRef, navigate }: PersonTableProps) {
  return (
    <Table>
      <TableRow>
        <TableHeader>Código</TableHeader>
        <TableHeader>Nome</TableHeader>
        <TableHeader>Data de nascimento</TableHeader>
        <TableHeader>Celular</TableHeader>
        <TableHeader>Email</TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
      {people.map((person, index) => (
        <TableRow key={index}>
          <TableData>{person.code}</TableData>
          <TableData>{person.name}</TableData>
          <TableData>{formatDate(person.birthDay)}</TableData>
          <TableData>{person.tel}</TableData>
          <TableData>{person.email}</TableData>
          <TableData>
            <OptionsButtonContainer>
              <OptionsButton
                onClick={() => toggleMenu(index)}
              >
                Opções
              </OptionsButton>
              {openMenuIndex === index && (
                <ToggleMenu ref={menuRef}>
                  <nav>
                    <ToggleMenuList>
                      <ToggleMenuItem onClick={() => navigate('')}>Editar</ToggleMenuItem>
                      <ToggleMenuItem>Excluir</ToggleMenuItem>
                      {(person as TeachersTable).subjects && (
                        <ToggleMenuItem>Matérias</ToggleMenuItem>
                      )}
                    </ToggleMenuList>
                  </nav>
                </ToggleMenu>
              )}
            </OptionsButtonContainer>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

const formatDate = (timestamp: {seconds: number; nanoseconds: number}) => {
  const date = new Date(timestamp.seconds * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const Person: React.FC = () => {
  const navigate = useNavigate()
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [teachers, setTeachers] = useState<TeachersTable[]>([])
  const [students, setStudents] = useState<StudentsTable[]>([])
  const [personSelected, setPersonSelected] = useState<'student' | 'teacher'>('teacher');
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex  === index ? null : index);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  const fetchTeacher = async () => {
    const teachersCollection = collection(db, 'teachers')
    const teachersSnapshot = await getDocs(teachersCollection)

    const teachersData: TeachersTable[] = teachersSnapshot.docs.map((doc) => {
    const data = doc.data();

    if (doc.id !== 'counter') {  
      return {
        id: doc.id,
        code: data.code || '',
        name: data.name || '',
        birthDay: data.birthDay || '',
        tel: data.tel || '',
        email: data.email || '',
        subjects: data.subjects || []
      };
    }
    return undefined
  }).filter((teachersData): teachersData is TeachersTable => teachersData !== undefined)

  setTeachers(teachersData)
};

const fetchStudents = async () => {
  const studentsCollection = collection(db, 'students')
  const studentsSnapshot = await getDocs(studentsCollection)

  const studentsData: StudentsTable[] = studentsSnapshot.docs.map((doc) => {
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
}).filter((studentsData): studentsData is StudentsTable => studentsData !== undefined)

setStudents(studentsData)
};

useEffect(() => {
  fetchStudents()
  fetchTeacher()
}, []);

// const mockStudents = [
//   { id: '01', code: 'S-001', name: 'Lucas da Silva', birthDay: '01/02/2003', tel: '32998765432', email: 'lucas.silva@email.com' },
//   { id: '02', code: 'S-002', name: 'Maria Oliveira', birthDay: '06/15/2002', tel: '11987654321', email: 'maria.oliveira@email.com' },
//   { id: '03', code: 'S-003', name: 'João Souza', birthDay: '09/25/2001', tel: '21976543210', email: 'joao.souza@email.com' },
//   { id: '04', code: 'S-004', name: 'Ana Pereira', birthDay: '12/30/2000', tel: '31965432109', email: 'ana.pereira@email.com' },
//   { id: '05', code: 'S-005', name: 'Carlos Mendes', birthDay: '05/07/1999', tel: '41954321098', email: 'carlos.mendes@email.com' }
// ];

// const mockTeachers = [
//   { id: '001', code: "TE-001", name: 'Fernanda Costa', birthDay: '10/04/1985', tel: '11987654321', email: 'fernanda@costa.com', subjects: ['Mathematics', 'Physics'] },
//   { id: '002', code: "TE-002", name: 'Ricardo Lima', birthDay: '22/08/1979', tel: '21976543210', email: 'ricardo@lima.com', subjects: ['History', 'Geography'] },
//   { id: '003', code: "TE-003", name: 'Juliana Alves', birthDay: '05/03/1990', tel: '31965432109', email: 'juliana@alves.com', subjects: ['Biology', 'Chemistry'] },
//   { id: '004', code: "TE-004", name: 'Marcos Silva', birthDay: '18/11/1982', tel: '41954321098', email: 'marcos@silva.com', subjects: ['English', 'Literature'] },
//   { id: '005', code: "TE-005", name: 'Patrícia Mendes', birthDay: '25/07/1987', tel: '32998765432', email: 'patricia@mendes.com', subjects: ['Physical Education'] }
// ];

return (
  <>
    <MainContent>
      <Buttons>
        <div>
          <TeacherButton 
            selected={personSelected == 'teacher'}
            onClick={() => setPersonSelected('teacher')}
          >Professores</TeacherButton>

          <StudentButton 
            selected={personSelected == 'student'}
            onClick={() => setPersonSelected('student')}
          >Alunos</StudentButton>
        </div>
        <Add>Adicionar</Add>
      </Buttons>
      <ContentContainer>
        <PersonTable
          people={personSelected == 'teacher' ? teachers : students}
          openMenuIndex={openMenuIndex}
          toggleMenu={toggleMenu}
          menuRef={menuRef}
          navigate={navigate}
        />
      </ContentContainer>
    </MainContent>
  </>
  )
}

export default Person