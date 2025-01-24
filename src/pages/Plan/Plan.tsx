import React from 'react'
import {
  MainContent,
  Add,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  EditButton,
  DeleteButton
} from './styles'

interface PlanTable {
  code: string,
  name: string,
  subjects: string,
  duration: string,
  academicPeriod: string
}

interface PlanTableProps {
  plans: PlanTable[]
}

function PlanTable ({ plans }: PlanTableProps) {
  return (
    <Table>
      <TableRow>
        <TableHeader>Código</TableHeader>
        <TableHeader>Nome</TableHeader>
        <TableHeader>Disciplinas</TableHeader>
        <TableHeader>Carga Horária</TableHeader>
        <TableHeader>Período Letivo</TableHeader>
        <TableHeader></TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
      {plans.map((plansData) => (
        <TableRow>
          <TableData>{plansData.code}</TableData>
          <TableData>{plansData.name}</TableData>
          <TableData>{plansData.subjects}</TableData>
          <TableData>{plansData.duration}</TableData>
          <TableData>{plansData.academicPeriod}</TableData>
          <TableData>
            <EditButton>Editar</EditButton>
          </TableData>
          <TableData>
            <DeleteButton>Excluir</DeleteButton>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

const Plan: React.FC = () => {

  const MockPlanTable: PlanTable[] = [
    { code: "PE-001", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { code: "PE-001", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { code: "PE-001", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { code: "PE-001", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
  ]

  return (
    <>
      <MainContent>
        <Add>Cadastrar Plano de ensino</Add>
        <ContentContainer>
          <PlanTable plans={MockPlanTable}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Plan