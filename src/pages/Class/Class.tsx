import React from 'react'
import {
  MainContent,
  Add,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  OptionsButton
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
      {classes.map((classData) => (
        <TableRow>
          <TableData>{classData.code}</TableData>
          <TableData>{classData.name}</TableData>
          <TableData>{classData.room}</TableData>
          <TableData>{classData.studentQnt}</TableData>
          <TableData>{classData.shift}</TableData>
          <TableData>{classData.status}</TableData>
          <TableData>
            <OptionsButton>Opções</OptionsButton>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

const Class: React.FC = () => {

  const MockclassTable: ClassTable[] = [
    { code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
    { code: "T-001", name: "Turma A - 1º Ano", room: "Sala 101", studentQnt: "30", shift: "Tarde", status: "Ativa" },
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