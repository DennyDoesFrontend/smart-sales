import ProductTable from '../components/ProductTable'

export default function ProductsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductTable />
    </div>
  )
}