export interface IPlanTable {
  id: string
  code: string
  name: string
  subjects: string
  duration: string
  academicPeriod: string
}

export interface PlanTableProps {
  plans: IPlanTable[]
  navigate: (path: string) => void
}

export interface Translations {
  subjects: { [key: string]: string }
  period: { [key: string]: string }
}