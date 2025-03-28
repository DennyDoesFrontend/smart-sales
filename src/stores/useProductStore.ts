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
  products: [
    { id: '1', name: 'Fried Rice with Meat', category: 'Continental', price: 24.99, stock: 42 },
    { id: '2', name: 'Waakye and Fish', category: 'Local', price: 89.99, stock: 15 },
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