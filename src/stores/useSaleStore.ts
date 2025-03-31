import { create } from 'zustand';

type PaymentMethod = 'MTN_MOMO' | 'AIRTELTIGO_CASH' | 'VODAFONE_CASH' | 'CASH';

export type Sale = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  date: string;
  customerName?: string;
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
      customerName: "Denzel Minsworth",
      date: new Date().toISOString(),
      paymentMethod: 'CASH',
      isCompleted: false,
      notes: "I want it hot and spicy"
    },
    {
      id: '2',
      productId: '2',
      productName: 'Banku with Tilapia',
      quantity: 1,
      price: 45.00,
      customerName: "Enoch Mentis",
      date: new Date().toISOString(),
      paymentMethod: 'MTN_MOMO',
      phoneNumber: '0551234567',
      isCompleted: false,
      notes: "I want the person serving to be fat"
    },
    {
      id: '3',
      productId: '3',
      productName: 'assorted fried rice',
      quantity: 1,
      price: 45.00,
      customerName: "James Bond",
      date: new Date().toISOString(),
      paymentMethod: 'MTN_MOMO',
      phoneNumber: '0551234567',
      isCompleted: false,
      notes: "I want a lot of shito please"
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