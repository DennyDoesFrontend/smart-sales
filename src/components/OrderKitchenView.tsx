import { useSalesStore } from "../stores/useSaleStore";
import { FiClock, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { useEffect, useState } from "react";

type OrderKitchenViewProps = {
  expandedView?: boolean;
};

export default function OrderKitchenView({ expandedView = false }: OrderKitchenViewProps) {
  const { sales, updateSale } = useSalesStore();
  const [now, setNow] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  // Update current time every minute and set mounted state
  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => {
      clearInterval(timer);
      setIsMounted(false);
    };
  }, []);

  // Get pending orders from last 24 hours, sorted by oldest first
  const pendingOrders = sales
    .filter(order => !order.isCompleted && new Date(order.date) > new Date(now.getTime() - 86400000))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate minutes since order was placed
  const getMinutesPassed = (orderDate: string) => {
    return Math.floor((now.getTime() - new Date(orderDate).getTime()) / 60000);
  };

  // Mark order as complete with timestamp
  const markOrderComplete = (orderId: string) => {
    if (!isMounted) return;
    const order = sales.find(o => o.id === orderId);
    if (!order) return;
    
    updateSale(orderId, { 
      isCompleted: true,
      completedAt: new Date().toISOString(),
      preparationTime: getMinutesPassed(order.date)
    });
  };

  return (
    <div className={`${expandedView ? 'space-y-6' : 'space-y-4'}`}>
      {!expandedView && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kitchen Orders</h2>
          <p className="text-sm text-gray-500">
            {pendingOrders.length} pending {pendingOrders.length === 1 ? 'order' : 'orders'}
          </p>
        </div>
      )}

      {pendingOrders.length === 0 ? (
        <div className={`text-center py-8 rounded-lg ${expandedView ? 'bg-gray-50' : ''}`}>
          <FiCheckCircle className="mx-auto text-green-500 text-4xl mb-2" />
          <p className="text-gray-500">All orders completed!</p>
          {expandedView && (
            <p className="text-sm mt-2">New orders will appear here automatically</p>
          )}
        </div>
      ) : (
        pendingOrders.map((order) => {
          const minutesPassed = getMinutesPassed(order.date);
          const isUrgent = minutesPassed > 30;

          return (
            <div 
              key={order.id} 
              className={`p-4 rounded-lg ${
                expandedView ? 'shadow-sm mb-4' : 'border'
              } ${
                isUrgent 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">
                    Order #{order.id.slice(0,5)}
                    {isUrgent && (
                      <span className="ml-2 inline-flex items-center text-red-600">
                        <FiAlertTriangle className="mr-1" />
                        URGENT
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600">
                    {new Date(order.date).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.paymentMethod === 'CASH' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.paymentMethod.replace('_', ' ')}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    {minutesPassed}m
                  </span>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="font-medium">
                  {order.productName} × {order.quantity}
                </p>
                <p className="text-gray-700">
                  GH₵{(order.price * order.quantity).toFixed(2)}
                </p>
              </div>

              {order.notes && (
                <div className="mt-2 p-2 bg-yellow-50 rounded">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Note:</span> {order.notes}
                  </p>
                </div>
              )}

              {expandedView && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Order ID:</span> {order.id}
                  </p>
                  {order.tableNumber && (
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Table:</span> {order.tableNumber}
                    </p>
                  )}
                </div>
              )}

              <button 
                onClick={() => markOrderComplete(order.id)}
                className={`mt-3 w-full py-2 text-white rounded transition-colors ${
                  isUrgent 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Mark as Completed
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}