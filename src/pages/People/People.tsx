import React, { useState, useRef, useEffect } from 'react'
import { db } from '../../services/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ListModal from '../../components/ListModal/ListModal';
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
  personSelected: string
  openMenuIndex: number | null,
  toggleMenu: (index: number) => void,
  menuRef: React.RefObject<HTMLDivElement>,
  navigate: (path: string) => void,
  handleDelete: (person: TeachersTable | StudentsTable) => void
  setModalTitle: (title: string) => void
  setModalData: (data: string[]) => void
  setIsModalVisible: (isVisible: boolean) => void
}

interface Translations {
  subjects: { [key: string]: string }
}

const translations: Translations = {
  subjects: {
    portuguese: 'Português',
    math: 'Matemática',
    physics: 'Física',
    chemistry: 'Química',
    biology: 'Biologia',
    history: 'História',
    geography: 'Geografia',
    philosophy: 'Filosofia',
    sociology: 'Sociologia',
    art: 'Arte',
    physical_education: 'Educação Física',
    english: 'Inglês',
  }
};

function PersonTable ({
  people,
  personSelected,
  openMenuIndex,
  toggleMenu,
  menuRef,
  navigate,
  handleDelete,
  setModalTitle,
  setModalData,
  setIsModalVisible
}: PersonTableProps) {

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
                      <ToggleMenuItem onClick={() => navigate(`/peopleform/${personSelected}/${person.id}`)}>Editar</ToggleMenuItem>
                      <ToggleMenuItem onClick={() => handleDelete(person)}>Excluir</ToggleMenuItem>
                      {(person as TeachersTable).subjects && (
                        <ToggleMenuItem onClick={() => {
                          setModalTitle('Matérias')
                          setModalData((person.subjects as string[]).map((subject: string | number) => translations.subjects[subject]))
                          setIsModalVisible(true)
                        }}>Matérias</ToggleMenuItem>
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
  const [teachers, setTeachers] = useState<TeachersTable[]>([]);
  const [students, setStudents] = useState<StudentsTable[]>([]);
  const [personSelected, setPersonSelected] = useState<'student' | 'teacher'>('teacher');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalData, setModalData] = useState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

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

  const fetchTeachers = async () => {
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
  fetchTeachers()
}, []);

const deleteTeacher = async (person: TeachersTable) => {
  if (window.confirm(`Tem certeza que deseja excluir o professor ${person.name}`)) {
    try {
      const teachersCollection = collection(db, 'teachers')
      const teacherDoc = doc(teachersCollection, person.id)
      await deleteDoc(teacherDoc)
      alert(`${person.name} excluído com sucesso!`)
      fetchTeachers()

    } catch (e) {
      console.error("Erro ao excluir professor: ", e)
      alert("Erro ao excluir professor. Tente novamente.")
    }
  }
  console.log(person)
}

const deleteStudent = async (person: StudentsTable) => {
  if (window.confirm(`Tem certeza que deseja excluir o aluno ${person.name}`)) {
    try {
      const studentsCollection = collection(db, 'students')
      const studentDoc = doc(studentsCollection, person.id)
      await deleteDoc(studentDoc)
      alert(`${person.name} excluído com sucesso!`)
      fetchStudents()

    } catch (e) {
      console.error("Erro ao excluir aluno: ", e)
      alert("Erro ao excluir aluno. Tente novamente.")
    }
  }
  console.log(person)
}

const handleDelete = async (person: TeachersTable | StudentsTable) => {
  if (personSelected === 'teacher') {
    deleteTeacher(person as TeachersTable)

  } else {
    deleteStudent(person as StudentsTable)
  }
}

return (
  <>
    <MainContent>
      <ListModal 
        title={modalTitle} 
        data={modalData}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
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
        <Add
          onClick={() => navigate(`/peopleform/${personSelected}`)}
        >
          {personSelected == 'teacher' ? 'Adicionar professor' : 'Adicionar Aluno'}
        </Add>
      </Buttons>
      <ContentContainer>
        <PersonTable
          people={personSelected == 'teacher' ? teachers : students}
          personSelected={personSelected}
          openMenuIndex={openMenuIndex}
          toggleMenu={toggleMenu}
          menuRef={menuRef}
          navigate={navigate}
          handleDelete={handleDelete}
          setModalTitle={setModalTitle}
          setModalData={setModalData}
          setIsModalVisible={setIsModalVisible}
        />
      </ContentContainer>
    </MainContent>
  </>
  )
}

export default Person