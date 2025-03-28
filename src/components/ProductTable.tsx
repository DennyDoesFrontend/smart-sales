import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { useProductStore } from '../stores/useProductStore';
import ProductModal from './ProductModal'; // Make sure to import the modal

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function ProductTable() {
  const { products, deleteProduct } = useProductStore();
  
  // STATE FOR MODAL (NEW CODE)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // HANDLE EDIT CLICK (NEW CODE)
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header with Add Product button - UPDATED */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Products</h2>
        <button
          onClick={() => {
            setEditingProduct(null); // Reset editing product
            setIsModalOpen(true); // Open modal
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> {/* Added plus icon */}
          Add Product
        </button>
      </div>
      
      {/* Product Table - UPDATED EDIT BUTTON */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* UPDATED EDIT BUTTON */}
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FiEdit />
                  </button>
                  {/* DELETE BUTTON (UNCHANGED) */}
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}