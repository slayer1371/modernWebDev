// import React, { useEffect, useState } from "react";
// import { fetchInProgressOrders, markOrderReady } from "../../hooks/CoffeeModelService";


// export function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionMessage, setActionMessage] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const results = await fetchInProgressOrders();
//         setOrders(results);
//       } catch (e) {
//         setError("Failed to fetch orders.");
//         console.log(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleMarkReady = async (orderId) => {
//     setActionMessage("");
//     try {
//       await markOrderReady(orderId);
//       setOrders(orders => orders.filter(o => o.id !== orderId));
//       setActionMessage("Order marked as Ready.");
//     } catch (err) {
//       setActionMessage("Failed to update order status.");
//       console.log(err);
//     }
//   };

//   if (loading) return <div className="p-8 text-center">Loading orders...</div>;
//   if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin: In Progress Orders</h1>
//       {actionMessage && <div className="mb-4 text-green-700">{actionMessage}</div>}
//       {orders.length === 0 ? (
//         <div className="text-gray-600">No in-progress orders.</div>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Order ID</th>
//               <th className="px-4 py-2">User</th>
//               <th className="px-4 py-2">Items</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id} className="border-t">
//                 <td className="px-4 py-2">{order.id}</td>
//                 <td className="px-4 py-2">{order.get("user")?.getUserName() || "Unknown"}</td>
//                 <td className="px-4 py-2">
//                   <ul className="list-disc pl-4">
//                     {(order.get("items") || []).map((item, idx) => (
//                       <li key={idx}>
//                         {item.coffee.name} x {item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="px-4 py-2">{order.get("status")}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     onClick={() => handleMarkReady(order.id)}
//                   >
//                     Mark as Ready
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminOrders; 

import React, { useEffect, useState } from "react";
import { fetchInProgressOrders, markOrderReady } from "../../hooks/CoffeeModelService"; // Assuming these services exist

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchInProgressOrders();
        setOrders(results);
      } catch (e) {
        setError("Failed to fetch orders.");
        console.error("Error fetching admin orders:", e);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const handleMarkReady = async (orderId) => {
    setActionMessage("");
    try {
      await markOrderReady(orderId);
      setOrders(orders => orders.filter(o => o.id !== orderId));
      setActionMessage("Order marked as Ready.");
    } catch (err) {
      setActionMessage("Failed to update order status.");
      console.error("Error marking order ready:", err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-xl font-semibold text-red-700 p-4 border border-red-300 rounded-md shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          Admin: In Progress Orders
        </h1>

        {actionMessage && (
          <div className={`text-center py-3 px-4 rounded-lg mx-auto mt-6 mb-6 max-w-md ${
            actionMessage.includes("Ready") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {actionMessage}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-600 py-10">
            No in-progress orders at the moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {/* FIX: Use getUsername() to display the username from the Parse.User object */}
                      {order.get("user")?.getUsername() || "Unknown User"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <ul className="list-disc pl-4 space-y-1">
                        {(order.get("items") || []).map((item, idx) => (
                          <li key={idx} className="text-gray-600">
                            {/* Ensure item.coffee and item.coffee.name exist */}
                            {item.coffee?.name || 'Unknown Coffee'} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.get("status"))}`}>
                        {order.get("status")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        className="cursor-pointer px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        onClick={() => handleMarkReady(order.id)}
                      >
                        Mark as Ready
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
