import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSalesStore } from '../stores/useSaleStore'
import { useProductStore } from '../stores/useProductStore'
import { printReceipt } from '../utils/PrintReceipt'
import { v4 as uuidv4 } from 'uuid';

type PaymentMethod = 'MTN_MOMO' | 'AIRTELTIGO_CASH' | 'VODAFONE_CASH' | 'CASH'

type SalesModalProps = {
  products: {
    id: string
    name: string
    price: number
    stock: number
  }[]
  onClose: () => void
}

export default function SalesModal({ products, onClose }: SalesModalProps) {
  // State declarations
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  
  // Store hooks
  const { addSale } = useSalesStore()
  const { updateProduct } = useProductStore()

  // Find selected product
  const selectedProduct = products.find(p => p.id === selectedProductId)

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    setIsPrinting(true)
    
    try {
      const newSale = {
        id: uuidv4(),
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        date: new Date().toISOString(),
        paymentMethod,
        phoneNumber: paymentMethod !== 'CASH' ? phoneNumber : undefined,
        isCompleted: false
      }

      addSale(newSale)
      updateProduct(selectedProduct.id, { stock: selectedProduct.stock - quantity })
      printReceipt(newSale)
      onClose()
    } catch (error) {
      console.error('Error completing sale:', error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">Record New Sale</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isPrinting}
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {!showPaymentForm ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                    <input
                      type="text"
                      value={`GH₵${selectedProduct.price.toFixed(2)}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="pt-2">
                    <p className="text-lg font-semibold">
                      Total: GH₵{(selectedProduct.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => selectedProduct && setShowPaymentForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={!selectedProduct}
                >
                  Next: Payment
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CASH')}
                    className={`p-3 border rounded-lg ${paymentMethod === 'CASH' ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('MTN_MOMO')}
                    className={`p-3 border rounded-lg ${paymentMethod === 'MTN_MOMO' ? 'bg-yellow-100 border-yellow-500' : 'bg-gray-50'}`}
                  >
                    📱 MTN MoMo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('AIRTELTIGO_CASH')}
                    className={`p-3 border rounded-lg ${paymentMethod === 'AIRTELTIGO_CASH' ? 'bg-red-100 border-red-500' : 'bg-gray-50'}`}
                  >
                    📱 AirtelTigo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('VODAFONE_CASH')}
                    className={`p-3 border rounded-lg ${paymentMethod === 'VODAFONE_CASH' ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}
                  >
                    📱 Vodafone
                  </button>
                </div>

                {paymentMethod !== 'CASH' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {paymentMethod.replace('_', ' ')} Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0551234567"
                      className="w-full px-3 py-2 border rounded-md"
                      pattern="[0-9]{10}"
                      required={paymentMethod !== 'CASH'}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  disabled={isPrinting}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                  disabled={isPrinting}
                >
                  {isPrinting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Sale & Print Receipt'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}