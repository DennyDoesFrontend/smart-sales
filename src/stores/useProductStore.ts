import { create } from 'zustand'

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

type ProductStore = {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products : [
    // Rice Dishes
    { id: '1', name: 'Assorted Fried Rice', category: 'Rice Dishes', price: 45.00, stock: 20 },
    { id: '2', name: 'Assorted Jollof Rice', category: 'Rice Dishes', price: 45.00, stock: 20 },
    { id: '3', name: 'Fried Rice with Chicken', category: 'Rice Dishes', price: 40.00, stock: 25 },
    { id: '4', name: 'Fried Rice with Fish', category: 'Rice Dishes', price: 40.00, stock: 25 },
    { id: '5', name: 'Fried Rice', category: 'Rice Dishes', price: 35.00, stock: 30 },
    { id: '6', name: 'Waakye', category: 'Rice Dishes', price: 35.00, stock: 30 },
  
    // Banku Meals
    { id: '7', name: 'Banku with Grilled Tilapia', category: 'Banku Meals', price: 50.00, stock: 15 },
    { id: '8', name: 'Banku with Fried Tilapia', category: 'Banku Meals', price: 50.00, stock: 15 },
    { id: '9', name: 'Banku with Soup', category: 'Banku Meals', price: 40.00, stock: 20 },
  
    // Yam Dishes
    { id: '10', name: 'Boiled Yam', category: 'Yam Dishes', price: 30.00, stock: 25 },
    { id: '11', name: 'Fried Yam with Chicken', category: 'Yam Dishes', price: 45.00, stock: 18 },
    { id: '12', name: 'Fried Yam with Fish', category: 'Yam Dishes', price: 45.00, stock: 18 },
  
    // Swallows
    { id: '13', name: 'Eba with Soup', category: 'Swallows', price: 35.00, stock: 22 },
    { id: '14', name: 'Fufu with Soup', category: 'Swallows', price: 40.00, stock: 20 },
    { id: '15', name: 'Rice Balls with Soup', category: 'Swallows', price: 35.00, stock: 22 },
  
    // Gari Dishes
    { id: '16', name: 'Gari Fortor with Chicken', category: 'Gari Dishes', price: 35.00, stock: 25 },
    { id: '17', name: 'Gari Fortor with Fish', category: 'Gari Dishes', price: 35.00, stock: 25 },
  
    // Salads
    { id: '18', name: 'Coleslaw Salad', category: 'Salads', price: 25.00, stock: 30 },
    { id: '19', name: 'Ghanaian Salad', category: 'Salads', price: 30.00, stock: 25 },
  
    // Snacks
    { id: '20', name: 'Kelewele', category: 'Snacks', price: 20.00, stock: 40 },
    { id: '21', name: 'Plantain', category: 'Snacks', price: 15.00, stock: 50 },
  ],
  addProduct: (product) => 
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now().toString() }]
    })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, ...updates } : p
      )
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    })),
}))