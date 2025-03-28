import { create } from 'zustand' // Import create from zustand

// Define the Table type at the top level
type TableStatus = 'vacant' | 'occupied'

interface Table {
  id: string
  number: number
  status: TableStatus
  orderId?: string
}

interface TableStore {
  tables: Table[]
  occupyTable: (tableId: string, orderId: string) => void
  freeTable: (tableId: string) => void
  getTableByNumber: (number: number) => Table | undefined
}

export const useTableStore = create<TableStore>((set, get) => ({
  tables: Array.from({ length: 10 }, (_, i) => ({
    id: `T${i + 1}`,
    number: i + 1,
    status: 'vacant' as TableStatus
  })),

  occupyTable: (tableId: string, orderId: string) => 
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, status: 'occupied', orderId } : t
      )
    })),

  freeTable: (tableId: string) =>
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, status: 'vacant', orderId: undefined } : t
      )
    })),

  getTableByNumber: (number: number) => 
    get().tables.find((t) => t.number === number)
}))