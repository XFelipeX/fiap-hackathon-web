import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  id: number
  code: string
  name: string
  subjects: string
  duration: string
  academicPeriod: string
}

interface PlanTableProps {
  plans: PlanTable[]
  navigate: (path: string) => void
}

function PlanTable ({ plans, navigate }: PlanTableProps) {
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
        <TableRow key={plansData.id}>
          <TableData>{plansData.code}</TableData>
          <TableData>{plansData.name}</TableData>
          <TableData>{plansData.subjects}</TableData>
          <TableData>{plansData.duration}</TableData>
          <TableData>{plansData.academicPeriod}</TableData>
          <TableData>
            <EditButton onClick={() => navigate(`/planForm/${plansData.id}`)}>Editar</EditButton>
          </TableData>
          <TableData>
            <DeleteButton onClick={() => handleDelete(plansData)}>Excluir</DeleteButton>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

function handleDelete(plansData: PlanTable) {
  if (!window.confirm(`Tem certeza que deseja excluir o plano ${plansData.name}?`)) {
    console.log('Plano não excluído')
    return false

  }
  window.alert(`${plansData.name} excluído com sucesso!`)
}

const Plan: React.FC = () => {
  const navigate = useNavigate()

  const MockPlanTable: PlanTable[] = [
    { id: 1, code: "PE-001", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { id: 2, code: "PE-002", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { id: 3, code: "PE-003", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
    { id: 4, code: "PE-004", name: "Plano de Ensino de Matemática", subjects: "Matemática, Raciocínio Lógico", duration: "80 horas", academicPeriod: "1º Semestre 2025" },
  ]

  return (
    <>
      <MainContent>
        <Add onClick={() => navigate('/planForm')}>Cadastrar Plano de ensino</Add>
        <ContentContainer>
          <PlanTable plans={MockPlanTable} navigate={navigate}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Plan