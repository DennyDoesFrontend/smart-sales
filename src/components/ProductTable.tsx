import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiDollarSign, FiSearch, FiX } from 'react-icons/fi';
import { useProductStore } from '../stores/useProductStore';
import ProductModal from './ProductModal';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function ProductCards() {
  const { products, deleteProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Get all unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products based on search and category
  useEffect(() => {
    let results = products;
    
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )}
    
    if (selectedCategory !== 'All') {
      results = results.filter(product => 
        product.category === selectedCategory)
    }
    
    setFilteredProducts(results);
  }, [products, searchTerm, selectedCategory]);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-900/20 text-red-400';
    if (stock < 5) return 'bg-yellow-900/20 text-yellow-400';
    return 'bg-green-900/20 text-green-400';
  };

  return (
    <div className="rounded-lg">
      {/* Header with Add Product button */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Menu Items</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-[#EA7C69] text-white rounded-lg hover:bg-[#e76a55] transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Item
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#2D303E] text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EA7C69]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-white" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-[#EA7C69] text-white'
                  : 'bg-[#2D303E] text-gray-300 hover:bg-[#393C49]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              Showing {filteredProducts.length} results
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center text-[#EA7C69] hover:text-[#e76a55]"
            >
              <FiX className="mr-1" /> Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Product Cards Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {products.length === 0 
              ? 'No products found. Add your first product!' 
              : 'No items match your search criteria'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-[#1F1D2B] border border-[#393C49] rounded-lg p-4 hover:border-[#EA7C69] transition-colors"
              >
                {/* <img src='/assorted fried rice.jpeg' /> */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStockColor(product.stock)}`}>
                    {product.stock} in stock
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center text-[#50D1AA]">
                    <FiDollarSign className="mr-1" />
                    <span className="font-medium">GH₵{product.price.toFixed(2)}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-2 text-blue-400 hover:bg-[#2D303E] rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-red-400 hover:bg-[#2D303E] rounded-lg transition-colors"
                      aria-label="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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