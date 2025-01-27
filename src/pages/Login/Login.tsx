import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  MainContainer,
  Logo,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Link,
  Button
} from './styles'

interface LoginValues {
  email: string
  password: string
}

const validations = Yup.object({ 
  email: Yup.string()
    .required('Por favor, informe o seu email!'),

  password: Yup.string()
    .min(8, 'A senha deve possuir pelo menos 8 caracteres!')
    .required('Por favor, informe uma senha!'),
})

const Login:React.FC = () => {

  const initialValues:LoginValues = {
    email: '',
    password: ''
  }

  const handleLogin = (values: LoginValues) => {
    console.log(values)
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
        {({values, handleChange }) => (
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
                  required
                />
              </InputContainer>
              
              <InputContainer>
                <Label htmlFor='password'>Senha</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={values.password}
                  required
                />  
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