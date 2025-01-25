import React, { useState, useRef, useEffect } from 'react'
import {
  MainContent,
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

interface ClassTable {
  code: string,
  name: string,
  room: string,
  studentQnt: string,
  shift: "Manhã" | "Tarde" | "Noite",
  status: "Ativa" | "Inativa"
}

interface ClassTableProps {
  classes: ClassTable[]
}

const Class: React.FC = () => {
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

  function ClassTable ({ classes }: ClassTableProps) {
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
            <TableData>{classData.studentQnt}</TableData>
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
                        <ToggleMenuItem>Editar</ToggleMenuItem>
                        <ToggleMenuItem>Excluir</ToggleMenuItem>
                        <ToggleMenuItem>Alunos</ToggleMenuItem>
                        <ToggleMenuItem>Professores</ToggleMenuItem>
                        <ToggleMenuItem>Matérias</ToggleMenuItem>
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

  const MockclassTable: ClassTable[] = [
    { code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-002", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-003", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-004", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
  ]

  return (
    <>
      <MainContent>
        <Add>Cadastrar Turma</Add>
        <ContentContainer>
          <ClassTable classes={MockclassTable}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Class