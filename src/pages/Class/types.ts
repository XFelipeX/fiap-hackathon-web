export interface IClassTable {
  id: string
  code: string
  name: string
  room: string
  qntStudents: string
  shift: string
  status: string
  students: string[]
  teachers: string[]
}

export interface PeopleData {
  id: string;
  name: string;
}

export interface ClassTableProps {
  classes: IClassTable[]
  students: PeopleData[]
  teachers: PeopleData[]
  openMenuIndex: number | null
  toggleMenu: (index: number) => void
  menuRef: React.RefObject<HTMLDivElement>
  navigate: (path: string) => void
  handleDeleteClass: (classData: IClassTable) => void
  setModalTitle: (title: string) => void
  setModalData: (data: string[]) => void
  setIsModalVisible: (isVisible: boolean) => void
}