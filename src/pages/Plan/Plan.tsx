import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../services/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import {
  MainContent,
  Add,
  ContentContainer,
  FeedBack,
  Table,
  TableRow,
  TableHeader,
  TableData,
  EditButton,
  DeleteButton
} from './styles'


interface PlanTable {
  id: string
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

interface Translations {
  subjects: { [key: string]: string }
  period: { [key: string]: string }
}

function PlanTable ({ plans, navigate }: PlanTableProps) {
  if (plans.length === 0) {
    return <FeedBack>Nenhum plano ainda.</FeedBack>
  }

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
      {plans.map((plan) => (
        <TableRow key={plan.id}>
          <TableData>{plan.code}</TableData>
          <TableData>{plan.name}</TableData>
          <TableData>{plan.subjects}</TableData>
          <TableData>{plan.duration}</TableData>
          <TableData>{plan.academicPeriod}</TableData>
          <TableData>
            <EditButton onClick={() => navigate(`/planForm/${plan.id}`)}>Editar</EditButton>
          </TableData>
          <TableData>
            <DeleteButton onClick={() => handleDelete(plan)}>Excluir</DeleteButton>
          </TableData>
        </TableRow>
      ))}  
    </Table>
  )
}

const handleDelete = async (plan: PlanTable) => {
  if (window.confirm(`Tem certeza que deseja excluir o plano ${plan.name}?`)) {
    try {
      const plansCollection = collection(db, 'plans')
      const planDoc = doc(plansCollection, plan.id)
      await deleteDoc(planDoc);
      alert(`${plan.name} excluído com sucesso!`)

    } catch (error) {
      console.error("Erro ao excluir plano:", error)
      alert("Erro ao excluir plano. Tente novamente.")
    }
  }
}

const translations: Translations = {
  subjects: {
    portuguese: 'Português',
    math: 'Matemática',
    physics: 'Física',
    chemistry: 'Química',
    biology: 'Biologia',
    history: 'História',
    geography: 'Geografia',
    philosophy: 'Filosofia',
    sociology: 'Sociologia',
    art: 'Arte',
    physical_education: 'Educação Física',
    english: 'Inglês',
  },
  period: {
    '1_2025': '1º Bimestre 2025',
    '2_2025': '2º Bimestre 2025',
    '3_2025': '3º Bimestre 2025',
    '4_2025': '4º Bimestre 2025',
  }
};

const Plan: React.FC = () => {
  const navigate = useNavigate()
  const [plans, setPlans] = useState<PlanTable[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      const plansCollection = collection(db, 'plans')
      const plansSnapshot = await getDocs(plansCollection)
  
      const plansData: PlanTable[] = plansSnapshot.docs.map((doc) => {
        const data = doc.data();

        if (doc.id !== 'counter') {
          const translatedSubjects = data.subjects
            ? (data.subjects as string[]).map((subject) => translations.subjects[subject] || subject).join(', ')
            : ''

          const translatedPeriod = translations.period[data.academicPeriod] || data.academicPeriod

          return {
            id: doc.id,
            code: data.code || '',
            name: data.name || '',
            subjects: translatedSubjects || '',
            duration: data.duration ? data.duration.toString() : '',
            academicPeriod: translatedPeriod || '',
          };
        }
        return undefined
      }).filter((plan): plan is PlanTable => plan !== undefined)
  
      setPlans(plansData)
    };
  
    fetchPlans()
  }, []);

  console.log(plans)
  return (
    <>
      <MainContent>
        <Add onClick={() => navigate('/planForm')}>Cadastrar Plano de ensino</Add>
        <ContentContainer>
          <PlanTable plans={plans} navigate={navigate} />
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Plan