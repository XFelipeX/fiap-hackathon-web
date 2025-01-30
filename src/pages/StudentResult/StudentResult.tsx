import React from 'react'

import {
  MainContent,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  TableResultContainer,
  BimesterTitle
} from './styles'

interface StudentResultTable {
  id: string,
  student: string,
  bimester: number,
  firstWork: number,
  seconfWork: number,
  test: number,
  total: number
}

interface StudentResultTableProps {
  results: StudentResultTable[]
}

const StudentResult: React.FC = () => {
  // const { id } = useParams<{ id: string }>()

  function StudentResult ({ results }: StudentResultTableProps) {
    return (
      <TableResultContainer> 
        {results.map((resultData) => (
          <ContentContainer key={resultData.id}>
            <BimesterTitle>{resultData.bimester}º Bimestre</BimesterTitle>
            <Table>
              <TableRow>
                <TableHeader>Tarefa</TableHeader>
                <TableHeader>Nota</TableHeader>
              </TableRow>
              <TableRow>
                <TableData>Trabalho 1</TableData>
                <TableData>{resultData.firstWork}</TableData>
              </TableRow>
              <TableRow>
                <TableData>Trabalho 2</TableData>
                <TableData>{resultData.seconfWork}</TableData>
              </TableRow>
              <TableRow>
                <TableData>Prova</TableData>
                <TableData>{resultData.test}</TableData>
              </TableRow>
              <TableRow>
                <TableData>Total</TableData>
                <TableData>{resultData.total}</TableData>
              </TableRow>
            </Table>
          </ContentContainer>
        ))}
      </TableResultContainer>
    )
  }

  const MockStudentResultTable: StudentResultTable[] = [
    { id: "001", bimester: 1, student: "001", firstWork: 10, seconfWork: 10, test: 10, total: 10 },
    { id: "002", bimester: 2, student: "001", firstWork: 10, seconfWork: 10, test: 10, total: 10 },
    { id: "003", bimester: 3, student: "001", firstWork: 10, seconfWork: 10, test: 10, total: 10 },
    { id: "004", bimester: 4, student: "001", firstWork: 10, seconfWork: 10, test: 10, total: 10 },
  ]

  return (
    <MainContent>
      <StudentResult results={MockStudentResultTable} />
    </MainContent>
  )
}


export default StudentResult