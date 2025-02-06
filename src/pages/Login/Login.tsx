import React from 'react'
import { Formik, Form } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { LoginValues } from './types'
import {
  MainContainer,
  Logo,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Error,
  Link,
  Button
} from './styles'
import Header from '../../components/Header/Header'

const validations = Yup.object({ 
  email: Yup.string()
    .email('Email inválido')
    .required('Por favor, informe o seu email!'),

  password: Yup.string()
    .min(8, 'A senha deve possuir pelo menos 8 caracteres!')
    .required('Por favor, informe uma senha!'),
})

const Login:React.FC = () => {
  const navigate = useNavigate()

  const initialValues:LoginValues = {
    email: '',
    password: ''
  }

  const handleLogin = async (values: LoginValues) => {
    try {
      const useCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      console.log('Usuário logado:', useCredential.user)
      navigate('/')

    } catch (e: any) {
      console.log('Erro ao fazer login: ', e.message)
      alert('Erro ao fazer login:' + e.message)  
    }
  }
  
  return (
    <MainContainer>
      <Logo>Nome Escola</Logo>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validations}
        onSubmit={(values) => handleLogin(values)}

      >
        {({values, handleChange, touched, errors }) => (
          <Form>
            <FormContainer>
              <InputContainer>
                <Label htmlFor='email'>Email</Label>
                <Input 
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {touched.email && errors.email && <Error>{errors.email}</Error>}
              </InputContainer>
              
              <InputContainer>
                <Label htmlFor='password'>Senha</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={values.password}
                />
                {touched.password && errors.password && <Error>{errors.password}</Error>}
              </InputContainer>
              <Link href="#">Esqueci minha senha</Link>

              <Button type='submit'>Entrar</Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </MainContainer>
  )
}

export default Login