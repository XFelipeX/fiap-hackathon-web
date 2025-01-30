import React, { useState, useRef, useEffect } from 'react'
import {
  MainContent,
  Add,
  AddStudent,
  ContentContainer,
  Table,
  TableRow,
  TableHeader,
  TableData,
  OptionsButtonContainer,
  OptionsButton,
  ToggleMenu,
  ToggleMenuList,
  ToggleMenuItem
} from './styles'

interface PersonTable {
  id: string,
  name: string,
  birthDate: string,
  phoneNumber: string,
  email: string
}

interface PersonTableProps {
  persons: PersonTable[]
}

const Person: React.FC = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex  === index ? null : index);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  function PersonTable ({ persons }: PersonTableProps) {
    return (
      <Table>
        <TableRow>
          <TableHeader>Id</TableHeader>
          <TableHeader>Nome</TableHeader>
          <TableHeader>Data de nascimento</TableHeader>
          <TableHeader>Celular</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
        {persons.map((personData, index) => (
          <TableRow key={index}>
            <TableData>{personData.id}</TableData>
            <TableData>{personData.name}</TableData>
            <TableData>{personData.birthDate}</TableData>
            <TableData>{personData.phoneNumber}</TableData>
            <TableData>{personData.email}</TableData>
            <TableData>
              <OptionsButtonContainer>
                <OptionsButton
                  onClick={() => toggleMenu(index)}
                >
                  Opções
                </OptionsButton>
                {openMenuIndex === index && (
                  <ToggleMenu ref={menuRef}>
                    <nav>
                      <ToggleMenuList>
                        <ToggleMenuItem>Editar</ToggleMenuItem>
                        <ToggleMenuItem>Excluir</ToggleMenuItem>
                        <ToggleMenuItem>Matérias</ToggleMenuItem>
                      </ToggleMenuList>
                    </nav>
                  </ToggleMenu>
                )}
              </OptionsButtonContainer>
            </TableData>
          </TableRow>
        ))}  
      </Table>
    )
  }

  const MockPersonTable: PersonTable[] = [
    { id: "001", name: "Felipe Dias", birthDate: "07/07/2000", phoneNumber: "(11) 952499766", email: "felipe@fiap.com.br" },
    { id: "002", name: "Thiago Fialho", birthDate: "08/08/2000", phoneNumber: "(11) 952499767", email: "thiago@fiap.com.br" },
    { id: "003", name: "Sérgio Neto", birthDate: "09/09/2000", phoneNumber: "(11) 952499768", email: "sergio@fiap.com.br" },
  ]

  return (
    <>
      <MainContent>
        <Add>Professores</Add>
        <AddStudent>Alunos</AddStudent>
        <ContentContainer>
          <PersonTable persons={MockPersonTable}/>
        </ContentContainer>
      </MainContent>
    </>
  )
}

export default Person