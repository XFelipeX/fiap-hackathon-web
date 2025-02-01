import React, { useState, useRef, useEffect } from 'react'
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
import { useNavigate } from 'react-router-dom'

interface ClassTable {
  id: string
  code: string
  name: string
  room: string
  qntStudents: string
  shift: string
  status: string
  studentsId: []
  teachersId: []
}

interface ClassTableProps {
  classes: ClassTable[],
  openMenuIndex: number | null,
  toggleMenu: (index: number) => void,
  menuRef: React.RefObject<HTMLDivElement>,
  navigate: (path: string) => void
}

function ClassTable ({ classes, openMenuIndex, toggleMenu, menuRef, navigate }: ClassTableProps) {
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
      {classes.map((classData, index) => (
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
                      <ToggleMenuItem>Excluir</ToggleMenuItem>
                      <ToggleMenuItem>Alunos</ToggleMenuItem>
                      <ToggleMenuItem>Professores</ToggleMenuItem>
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

const Class: React.FC = () => {
  const navigate = useNavigate()
  const [classes, setClasses] = useState<ClassTable[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
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

  useEffect(() => {
      const fetchClasses = async () => {
        const classesCollection = collection(db, 'class')
        const classesSnapshot = await getDocs(classesCollection)
    
        const classesData: ClassTable[] = classesSnapshot.docs.map((doc) => {
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
              studentsId: data.studentsId || [],
              teachersId: data.teachersId || [],
            };
          }
          return undefined
        }).filter((classData): classData is ClassTable => classData !== undefined)
    
        setClasses(classesData)
      };
    
      fetchClasses()
    }, []);

  // const MockclassTable: ClassTable[] = [
  //   { id: '1', code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", qntStudents: "30", shift: "Tarde", status: "Ativa", studentsId: [], teachersId: [] },
  //   { id: '2', code: "T-002", name: "Turma A - 1º Ano", room: "Sala 101", qntStudents: "30", shift: "Tarde", status: "Ativa", studentsId: [], teachersId: [] },
  //   { id: '3', code: "T-003", name: "Turma A - 1º Ano", room: "Sala 101", qntStudents: "30", shift: "Tarde", status: "Ativa", studentsId: [], teachersId: [] },
  //   { id: '4', code: "T-004", name: "Turma A - 1º Ano", room: "Sala 101", qntStudents: "30", shift: "Tarde", status: "Ativa", studentsId: [], teachersId: [] },
  // ]

  console.log(classes)
  return (
    <>
      <MainContent>
        <Add onClick={() => navigate('/classform')}>Cadastrar Turma</Add>
        <ContentContainer>
          <ClassTable
            classes={classes}
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

export default Class