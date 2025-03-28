import { create } from 'zustand';

type PaymentMethod = 'MTN_MOMO' | 'AIRTELTIGO_CASH' | 'VODAFONE_CASH' | 'CASH';

export type Sale = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  date: string;
  paymentMethod: PaymentMethod;
  phoneNumber?: string;
  isCompleted: boolean;
  notes?: string;
  completedAt?: string;    // ISO timestamp
  preparationTime?: number;
  tableNumber?: string | number;
};

type SalesStore = {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id'>) => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
};

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [
    {
      id: '1',
      productId: '1',
      productName: 'Jollof Rice',
      quantity: 2,
      price: 25.00,
      date: new Date().toISOString(),
      paymentMethod: 'CASH',
      isCompleted: false
    },
    {
      id: '2',
      productId: '2',
      productName: 'Banku with Tilapia',
      quantity: 1,
      price: 45.00,
      date: new Date().toISOString(),
      paymentMethod: 'MTN_MOMO',
      phoneNumber: '0551234567',
      isCompleted: false
    }
  ],
  
  addSale: (sale) => 
    set((state) => ({
      sales: [...state.sales, { 
        ...sale, 
        id: Date.now().toString(),
        isCompleted: false // Default value
      }]
    })),
    
  updateSale: (id, updates) =>
    set((state) => ({
      sales: state.sales.map((sale) =>
        sale.id === id ? { ...sale, ...updates } : sale
      )
    })),
    
  deleteSale: (id) =>
    set((state) => ({
      sales: state.sales.filter((sale) => sale.id !== id)
    }))
}));