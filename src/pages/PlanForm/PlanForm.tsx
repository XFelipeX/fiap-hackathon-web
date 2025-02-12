import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { db } from '../../services/firebase'
import { collection, doc, getDoc } from "firebase/firestore"
import { useFirestore } from '../../hooks/useFirestore';
import { FormValues } from './types'
import {
  MainContainer,
  FormContainer,
  InputContainer,
  Label,
  TextInput,
  Error,
  CheckBoxContainer,
  CheckBoxInput,
  CheckBoxLabel,
  NumberInput,
  SelectInput,
  SubmitButton
} from './styles'

const validations = Yup.object({
  name: Yup.string()
    .required('Defina um nome para o plano de ensino'),
  subjects: Yup.array()
    .min(1, 'Selecione pelo menos uma disciplina')
    .required('Selecione as disciplinas'),
  duration: Yup.number()
    .required('Defina uma carga horária'),
  academicPeriod: Yup.string()
    .required('Selecione um período letivo')
})

const subjects = [
  { value: "portuguese", label: "Português" },
  { value: "math", label: "Matemática" },
  { value: "physics", label: "Física" },
  { value: "chemistry", label: "Química" },
  { value: "biology", label: "Biologia" },
  { value: "history", label: "História" },
  { value: "geography", label: "Geografia" },
  { value: "philosophy", label: "Filosofia" },
  { value: "sociology", label: "Sociologia" },
  { value: "art", label: "Arte" },
  { value: "physical_education", label: "Educação Física" },
  { value: "english", label: "Inglês" },
];

const PlanForm: React.FC = () => {
  const { createDocumentWithCode, updateDocument } = useFirestore();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    subjects: [],
    duration: 1,
    academicPeriod: '',
  });

  useEffect(() => {
    const fetchPlan = async () => {
      if (id) {
        const plansCollection = collection(db, 'plans')
        const planDoc = doc(plansCollection, id)
        const planSnapshot = await getDoc(planDoc)

        if (planSnapshot.exists()) {
          setInitialValues(planSnapshot.data() as FormValues)
        }
      }
    }

    fetchPlan()
  }, [id])

  const handleSave = (values: FormValues) => {
    if (id) {
      updateDocument('plans', values, id)
    } else {
      createDocumentWithCode('plans', values, 'PE')
    }
  }

  return (
    <>
      <MainContainer>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
					  validationSchema={validations}
            onSubmit={(values) => handleSave(values)}
          >
            {({ values, handleChange, setFieldValue, touched, errors }) => (
              <Form>
                <InputContainer>
                  <Label htmlFor="name">Nome</Label>
                  <TextInput
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                  {touched.name && errors.name && <Error>{errors.name}</Error>}
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="subjects">Disciplinas</Label>
                  <CheckBoxContainer>
                    {subjects.map((subject) => (
                      <div key={subject.value}>
                        <CheckBoxInput
                          type="checkbox"
                          id={subject.value}
                          name="subjects"
                          value={subject.value}
                          checked={values.subjects.includes(subject.value)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const selectedSubjects = e.target.checked
                              ? [...values.subjects, subject.value]
                              : values.subjects.filter((item) => item !== subject.value)
                            setFieldValue("subjects", selectedSubjects)
                          }}
                        />
                        <CheckBoxLabel htmlFor={subject.value}>{subject.label}</CheckBoxLabel>
                      </div>
                    ))}
                  </CheckBoxContainer>
                  {touched.subjects && errors.subjects && <Error>{errors.subjects}</Error>}
                </InputContainer>
                
                <InputContainer>
                  <Label htmlFor="duration">Carga Horária</Label>
                  <NumberInput
                    type="number"
                    name="duration"
                    id="duration"
                    min={1}
                    max={1200}
                    onChange={handleChange}
                    value={values.duration}
                  />
                  {touched.duration && errors.duration && <Error>{errors.duration}</Error>}
                </InputContainer>
                
                <InputContainer>
                  <Label htmlFor="academicPeriod">Período Letivo</Label>
                  <SelectInput
                    as="select"
                    name="academicPeriod"
                    id="academicPeriod"
                    onChange={handleChange}
                    value={values.academicPeriod}
                  >
                    <option value="">Selecione um período</option>
                    <option value="1_2025">1º Bimestre 2025</option>
                    <option value="2_2025">2º Bimestre 2025</option>
                    <option value="3_2025">3º Bimestre 2025</option>
                    <option value="4_2025">4º Bimestre 2025</option>
                  </SelectInput>
                  {touched.academicPeriod && errors.academicPeriod && <Error>{errors.academicPeriod}</Error>}
                </InputContainer>

                <SubmitButton type="submit">Salvar</SubmitButton>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </MainContainer>
    </>
  )
}

export default PlanForm