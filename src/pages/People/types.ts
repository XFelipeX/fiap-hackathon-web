export interface TeachersTable {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
  subjects: string[]
}

export interface StudentsTable {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
}

export interface PersonTableProps {
  people: TeachersTable[] | StudentsTable[],
  personSelected: string
  openMenuIndex: number | null,
  toggleMenu: (index: number) => void,
  menuRef: React.RefObject<HTMLDivElement>,
  navigate: (path: string) => void,
  handleDelete: (person: TeachersTable | StudentsTable) => void
  setModalTitle: (title: string) => void
  setModalData: (data: string[]) => void
  setIsModalVisible: (isVisible: boolean) => void
}

export interface Translations {
  subjects: { [key: string]: string }
}