import React from 'react'
import {
  MainContainer,
  Title,
  TableContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  TableDataFirst
} from './styles'

const Timeline: React.FC = () => {

  const mockWeekTable = [
    { 
      day: "Segunda", 
      schedule: [
        { time: "07:00", subject: "Biologia", teacher:"Flavia P." },
        { time: "07:50", subject: "Geografia", teacher:"Pedro G." },
        { time: "08:40", subject: "Química", teacher:"Carol D." },
        { time: "09:45", subject: "Artes", teacher:"Ana L." },
        { time: "10:35", subject: "Inglês", teacher:"Maria S." },
        { time: "11:25", subject: "Português", teacher:"Carlos D." },
      ]
    },
    { 
      day: "Terça", 
      schedule: [
        { time: "07:00", subject: "Biologia", teacher:"Flavia P." },
        { time: "07:50", subject: "Geografia", teacher:"Pedro G." },
        { time: "08:40", subject: "Química", teacher:"Carol D." },
        { time: "09:45", subject: "Artes", teacher:"Ana L." },
        { time: "10:35", subject: "Inglês", teacher:"Maria S." },
        { time: "11:25", subject: "Português", teacher:"Carlos D." },
      ]
    },
    { 
      day: "Quarta", 
      schedule: [
        { time: "07:00", subject: "Biologia", teacher:"Flavia P." },
        { time: "07:50", subject: "Geografia", teacher:"Pedro G." },
        { time: "08:40", subject: "Química", teacher:"Carol D." },
        { time: "09:45", subject: "Artes", teacher:"Ana L." },
        { time: "10:35", subject: "Inglês", teacher:"Maria S." },
        { time: "11:25", subject: "Português", teacher:"Carlos D." },
      ]
    },
    { 
      day: "Quinta", 
      schedule: [
        { time: "07:00", subject: "Biologia", teacher:"Flavia P." },
        { time: "07:50", subject: "Geografia", teacher:"Pedro G." },
        { time: "08:40", subject: "Química", teacher:"Carol D." },
        { time: "09:45", subject: "Artes", teacher:"Ana L." },
        { time: "10:35", subject: "Inglês", teacher:"Maria S." },
        { time: "11:25", subject: "Português", teacher:"Carlos D." },
      ]
    },
    { 
      day: "Sexta", 
      schedule: [
        { time: "07:00", subject: "Biologia", teacher:"Flavia P." },
        { time: "07:50", subject: "Geografia", teacher:"Pedro G." },
        { time: "08:40", subject: "Química", teacher:"Carol D." },
        { time: "09:45", subject: "Artes", teacher:"Ana L." },
        { time: "10:35", subject: "Inglês", teacher:"Maria S." },
        { time: "11:25", subject: "Português", teacher:"Carlos D." },
      ]
    }
  ];

  const mockTestsTable = [
    { 
      period: "Primeiro Bimestre", 
      schedule: [
        { day: "04/03", subject: "Biologia" },
        { day: "04/03", subject: "Geografia" },
        { day: "04/03", subject: "Química" },
        { day: "04/03", subject: "Artes" },
        { day: "04/03", subject: "Inglês" },
        { day: "04/03", subject: "Português" },
      ]
    },
    { 
      period: "Segundo Bimestre", 
      schedule: [
        { day: "04/03", subject: "Biologia" },
        { day: "04/03", subject: "Geografia" },
        { day: "04/03", subject: "Química" },
        { day: "04/03", subject: "Artes" },
        { day: "04/03", subject: "Inglês" },
        { day: "04/03", subject: "Português" },
      ]
    },
    { 
      period: "Terceiro Bimestre", 
      schedule: [
        { day: "04/03", subject: "Biologia" },
        { day: "04/03", subject: "Geografia" },
        { day: "04/03", subject: "Química" },
        { day: "04/03", subject: "Artes" },
        { day: "04/03", subject: "Inglês" },
        { day: "04/03", subject: "Português" },
      ]
    },
    { 
      period: "Quarto Bimestre", 
      schedule: [
        { day: "04/03", subject: "Biologia" },
        { day: "04/03", subject: "Geografia" },
        { day: "04/03", subject: "Química" },
        { day: "04/03", subject: "Artes" },
        { day: "04/03", subject: "Inglês" },
        { day: "04/03", subject: "Português" },
      ]
    }
  ];

  return (
    <>
      <MainContainer>
        <Title>Semanal</Title>

        <TableContainer>
          {mockWeekTable.map((dayItem) => (
            <Table>
              <TableRow>
                <TableHeader colSpan={3}>{dayItem.day}</TableHeader>
              </TableRow>
              {dayItem.schedule.map((classItem) => (
                <TableRow>
                  <TableDataFirst>{classItem.time}</TableDataFirst>
                  <TableData>{classItem.subject}</TableData>
                  <TableData>{classItem.teacher}</TableData>
                </TableRow>
              ))}
            </Table>
          ))}
        </TableContainer>

        <Title>Provas</Title>
        
        <TableContainer>
          {mockTestsTable.map((period) => (
            <Table>
              <TableRow>
                <TableHeader colSpan={2}>{period.period}</TableHeader>
              </TableRow>
              {period.schedule.map((test) => (
                <TableRow>
                  <TableDataFirst>{test.day}</TableDataFirst>
                  <TableData>{test.subject}</TableData>
                </TableRow>
              ))}
            </Table>
          ))}
        </TableContainer>

      </MainContainer>
    </>
  )
}

export default Timeline