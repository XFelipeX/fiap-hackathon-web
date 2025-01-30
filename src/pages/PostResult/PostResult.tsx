import React from 'react'

import {
  MainContent,
  Title,
  ContentContainer,
  Table,
  TableRow,
  TableData
} from './styles'

interface PostResultTable {
  studentId: string,
  studentName: string,
  studentGrade: number
}

interface PostResultTableProps {
  results: PostResultTable[]
}

const Result: React.FC = () => {
  function PostResultTable ({ results }: PostResultTableProps) {
    return (
      <Table>
        {results.map((resultData, index) => (
          <TableRow>
            <TableData>{resultData.studentName}</TableData>
            <TableData>{resultData.studentGrade}</TableData>
          </TableRow>
        ))}
      </Table>
    )
  }

  const MockPostResultTable: PostResultTable[] = [
    { studentId: "001", studentName: "Felipe Dias", studentGrade: 0 },
    { studentId: "002", studentName: "Thiago Fialho", studentGrade: 0 },
    { studentId: "003", studentName: "Sérgio Neto", studentGrade: 0 },
  ]

  return (
    <>
      <MainContent>
        <Title>Turma</Title>
        <ContentContainer>
          <PostResultTable results={MockPostResultTable}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Result