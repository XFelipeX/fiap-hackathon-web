import React from "react"
import {
  MainContainer,
  TopContainer,
  Title,
  TestsButton,
  TestsButtonAnchor,
  ContentContainer,
  ClassItemContainer,
  ClassItemContentContainer,
  TimeDate,
  Info,
  InfoItem,
  FilesButton
} from './styles'

interface ClassData {
  timeDate: string;
  className: string;
  room: string;
  status: string;
}
 
interface ClassItemProps {
  classes: ClassData[];
}

function ClassItem ({ classes }: ClassItemProps) {
  return (
    <>
      {classes.map((classData) => (
        <>
        <ClassItemContainer>
          <ClassItemContentContainer>
            <div>
              <TimeDate>{classData.timeDate}</TimeDate>
              <Info>
                <InfoItem>{classData.className}</InfoItem>
                <InfoItem>{classData.room}</InfoItem>
                <InfoItem>{classData.status}</InfoItem>
              </Info>
            </div>
            <FilesButton>Arquivos</FilesButton>
          </ClassItemContentContainer>
        </ClassItemContainer>
        </>
      ))}
    </>
  )
}

const Home: React.FC = () => {

  const mockClasses: ClassData[] = [
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Cancelada"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
  ]

  return (
    <>
      <MainContainer>
        <TopContainer>
          <Title>Aulas Hoje</Title>
          <TestsButton>
            <TestsButtonAnchor href="/timeline">Provas</TestsButtonAnchor>
          </TestsButton>
        </TopContainer>
        <ContentContainer>
          <ClassItem classes={mockClasses}/>
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export default Home
