import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  MainContent,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  OptionsButtonContainer,
  OptionsButton,
  SelectClass,
  SelectClassContent,
  Add
} from './styles'

interface ResultTable {
  id: string,
  studentId: string,
  studentName: string,
  grade1Bi: number,
  grade2Bi: number,
  grade3Bi: number,
  grade4Bi: number,
  total: number
}

interface ResultTableProps {
  results: ResultTable[]
}

const Result: React.FC = () => {
  const navigate = useNavigate()

  function ResultTable ({ results }: ResultTableProps) {
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
        {results.map((resultData, index) => (
          <TableRow key={index}>
            <TableData>{resultData.studentName}</TableData>
            <TableData>{resultData.grade1Bi}</TableData>
            <TableData>{resultData.grade2Bi}</TableData>
            <TableData>{resultData.grade3Bi}</TableData>
            <TableData>{resultData.grade4Bi}</TableData>
            <TableData>{resultData.total}</TableData>
            <TableData>
              <OptionsButtonContainer>
                <OptionsButton
                  onClick={() => navigate(`/result/${resultData.studentId}`)}
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

  const MockResultTable: ResultTable[] = [
    { id: "001", studentId: "001", studentName: "Felipe Dias", grade1Bi: 10, grade2Bi: 10, grade3Bi: 10, grade4Bi: 10, total: 40},
    { id: "002", studentId: "002", studentName: "Thiago Fialho", grade1Bi: 10, grade2Bi: 10, grade3Bi: 10, grade4Bi: 10, total: 40},
    { id: "003", studentId: "003", studentName: "Sérgio Neto", grade1Bi: 10, grade2Bi: 10, grade3Bi: 10, grade4Bi: 10, total: 40},
  ]

  return (
    <>
      <MainContent>
        <SelectClass>
          <SelectClassContent>Turma</SelectClassContent>
        </SelectClass>
        <Add onClick={() => navigate('/postResult')}>Lançar notas</Add>
        <ContentContainer>
          <ResultTable results={MockResultTable}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Result