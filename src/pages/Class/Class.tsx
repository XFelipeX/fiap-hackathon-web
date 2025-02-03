import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../services/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ListModal from '../../components/ListModal/ListModal';
import { IClassTable, PeopleData, ClassTableProps } from './types'
import {
  MainContent,
  Add,
  ContentContainer,
  FeedBack,
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

function ClassTable ({
  classes,
  students,
  teachers,
  openMenuIndex,
  toggleMenu,
  menuRef,
  navigate,
  handleDeleteClass,
  setModalTitle,
  setModalData,
  setIsModalVisible
}: ClassTableProps ) {
  if (classes.length === 0) {
      return <FeedBack>Nenhuma turma ainda.</FeedBack>
    }

  return (
    <Table>
      <TableRow>
        <TableHeader>Código</TableHeader>
        <TableHeader>Nome</TableHeader>
        <TableHeader>Sala</TableHeader>
        <TableHeader>Nº de alunos</TableHeader>
        <TableHeader>Turno</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
      {classes.map((classData, index) => {

        const filteredStudents = students
          .filter((student) => classData.students.includes(student.id))
          .map((student) => student.name)

        const filteredTeachers = teachers
          .filter((teacher) => classData.teachers.includes(teacher.id))
          .map((teacher) => teacher.name);

        return (
          <TableRow key={index}>
            <TableData>{classData.code}</TableData>
            <TableData>{classData.name}</TableData>
            <TableData>{classData.room}</TableData>
            <TableData>{classData.qntStudents}</TableData>
            <TableData>{classData.shift}</TableData>
            <TableData>{classData.status}</TableData>
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
                        <ToggleMenuItem onClick={() => navigate(`/classform/${classData.id}`)}>Editar</ToggleMenuItem>
                        <ToggleMenuItem onClick={() => handleDeleteClass(classData)}>Excluir</ToggleMenuItem>
                        <ToggleMenuItem onClick={() => {
                          setModalTitle('Alunos')
                          setModalData(filteredStudents)
                          setIsModalVisible(true)
                        }}>Alunos</ToggleMenuItem>
                        <ToggleMenuItem onClick={() => {
                          setModalTitle('Professores')
                          setModalData(filteredTeachers)
                          setIsModalVisible(true)
                        }}>Professores</ToggleMenuItem>
                      </ToggleMenuList>
                    </nav>
                  </ToggleMenu>
                )}
              </OptionsButtonContainer>
            </TableData>
          </TableRow>
        )
      })}  
    </Table>
  )
}

const Class: React.FC = () => {
  const navigate = useNavigate()
  const [classes, setClasses] = useState<IClassTable[]>([]);
  const [students, setStudents] = useState<PeopleData[]>([]);
  const [teachers, setTeachers] = useState<PeopleData[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalData, setModalData] = useState<PeopleData[]>();
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

  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, 'class')
      const classesSnapshot = await getDocs(classesCollection)
  
      const classesData: IClassTable[] = classesSnapshot.docs.map((doc) => {
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
      }).filter((classData): classData is IClassTable => classData !== undefined)
  
      setClasses(classesData)
    };
  
    fetchClasses()
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsData: PeopleData[] = studentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
        };
      });
      setStudents(studentsData); // Atualiza a lista de alunos
    };
  
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersCollection = collection(db, 'teachers');
      const teachersSnapshot = await getDocs(teachersCollection);
      const teachersData: PeopleData[] = teachersSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
        };
      });

      setTeachers(teachersData);
    };
  
    fetchTeachers();
  }, []);

  const handleDeleteClass = async (classData: IClassTable) => {
    if (window.confirm(`Tem certeza que deseja excluir a turma ${classData.name}`)) {
      try {
        const classesCollection = collection(db, 'class')
        const classDoc = doc(classesCollection, classData.id)
        await deleteDoc(classDoc)
        alert(`${classData.name} excluída com sucesso!`)

      } catch (e) {
        console.error("Erro ao excluir turma: ", e)
        alert("Erro ao excluir turma. Tente novamente.")
      }
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
        <Add onClick={() => navigate('/classform')}>Cadastrar Turma</Add>
        <ContentContainer>
          <ClassTable
            classes={classes}
            students={students}
            teachers={teachers}
            openMenuIndex={openMenuIndex}
            toggleMenu={toggleMenu}
            menuRef={menuRef}
            navigate={navigate}
            handleDeleteClass={handleDeleteClass}
            setModalTitle={setModalTitle}
            setModalData={setModalData}
            setIsModalVisible={setIsModalVisible}
          />
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Class