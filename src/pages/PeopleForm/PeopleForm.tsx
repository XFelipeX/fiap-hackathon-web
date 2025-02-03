import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { db } from '../../services/firebase';
import { collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { TeacherFormValues, StudentFormValues } from './types';
import { useFirestore } from '../../hooks/useFirestore';
import {
  MainContainer,
  FormContainer,
  InputContainer,
  TextInput,
  CheckBoxContainer,
  CheckBoxInputContainer,
  CheckBoxInput,
  CheckBoxInputLabel,
  Label,
  Error,
  SubmitContainer,
  SubmitButton
} from './styled'

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

const validations = (person: string) => Yup.object({
  name: Yup.string()
    .required('Campo obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório'),
  birthDay: Yup.string()
    .required('Campo obrigatório'),
  tel: Yup.string()
    .matches(/^\d{10,11}$/, 'Telefone inválido')
    .required('Campo obrigatório'),
  subjects: person === 'teacher'
    ? Yup.array()
      .min(1, 'Selecione pelo menos uma matéria')
      .required('Campo obrigatório')
    : Yup.mixed().notRequired(),
})

const PeopleForm: React.FC = () => {
  const { createDocumentWithCode, updateDocument } = useFirestore()
  const { person, id } = useParams<{ person: string, id: string }>()
  const [initialValues, setInitialValues] = useState<TeacherFormValues | StudentFormValues>(person === 'teacher' ? {
    name: '',
    email: '',
    birthDay: '',
    tel: '',
    subjects: []
  } : {
    name: '',
    email: '',
    birthDay: '',
    tel: ''
  })

  const fetchTeacher = async () => {
    const teachersCollection = collection(db, 'teachers')
    const teacherDoc = doc(teachersCollection, id)
    const teacherSnapshot = await getDoc(teacherDoc)

    if (teacherSnapshot.exists()) {
      const data = teacherSnapshot.data()

      setInitialValues({
        ...data,
        birthDay: data.birthDay?.toDate().toISOString().split('T')[0] || '',
      } as TeacherFormValues)
    }
  };
  
  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students')
    const studentDoc = doc(studentsCollection, id)
    const studentsSnapshot = await getDoc(studentDoc)

    if (studentsSnapshot.exists()) {
      const data = studentsSnapshot.data()

      setInitialValues({
        ...data,
        birthDay: data.birthDay?.toDate().toISOString().split('T')[0] || '',
      } as StudentFormValues)
    }
  };

  useEffect(() => {
    if (id) {
      if (person === 'teacher') {
        fetchTeacher()
      } else {
        fetchStudents()
      }
    }
  }, [person, id])

  const handleSave = (values: TeacherFormValues | StudentFormValues) => {
    const dateParts = values.birthDay.split('-');
    const adjustedDate = new Date(
      parseInt(dateParts[0], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[2], 10),
      12, 0, 0
    );

    const formattedValues = {
      ...values,
      birthDay: Timestamp.fromDate(adjustedDate)
    }

    if (id) {
      if (person === 'teacher') {
        updateDocument('teachers', formattedValues, id)
      } else {
        updateDocument('students', formattedValues, id)
      }
    } else {
      if (person === 'teacher') {
        createDocumentWithCode('teachers', formattedValues, 'TE')
      } else {
        createDocumentWithCode('students', formattedValues, 'S')
      }
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validations(person || '')}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values, handleChange, touched, errors, setFieldValue }) => (
            <Form>

              <InputContainer>
                <Label htmlFor="name">Nome</Label>
                <TextInput type="text" name="name" id="name" onChange={handleChange} value={values.name} />
                {touched.name && errors.name && <Error>{errors.name}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="email">Email</Label>
                <TextInput type="email" name="email" id="email" onChange={handleChange} value={values.email} />
                {touched.email && errors.email && <Error>{errors.email}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="birthDay">Data de nascimento</Label>
                <TextInput type="date" name="birthDay" id="birthDay" onChange={handleChange} value={values.birthDay} />
                {touched.birthDay && errors.birthDay && <Error>{errors.birthDay}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="tel">Telefone</Label>
                <TextInput type="text" name="tel" id="tel" onChange={handleChange} value={values.tel} />
                {touched.tel && errors.tel && <Error>{errors.tel}</Error>}
              </InputContainer>

              {person === 'teacher' && (
                <InputContainer>
                  <Label>Matérias</Label>
                  <CheckBoxContainer>
                    {subjects.map((subject) => (
                      <CheckBoxInputContainer>
                        <CheckBoxInput
                          type="checkbox"
                          name={subject.value}
                          id={subject.value}
                          value={subject.value}
                          checked={values.subjects.includes(subject.value)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const selectedSubjects = e.target.checked
                              ? [...values.subjects, subject.value]
                              : values.subjects.filter((item) => item !== subject.value)
                            setFieldValue("subjects", selectedSubjects)
                          }}
                        />
                        <CheckBoxInputLabel htmlFor={subject.value}>
                          <p>{subject.label}</p>
                        </CheckBoxInputLabel>
                      </CheckBoxInputContainer>
                    ))}
                  </CheckBoxContainer>
                  {touched.subjects && errors.subjects && <Error>{errors.subjects}</Error>}
                </InputContainer>
              )}

              <SubmitContainer>
                <SubmitButton type="submit">{id ? 'Salvar' : 'Adicionar'}</SubmitButton>
              </SubmitContainer>

            </Form>
          )}
        </Formik>
      </FormContainer>
  </MainContainer>
  )
}

export default PeopleForm