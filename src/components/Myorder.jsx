// import React, { useEffect, useState } from "react";
// import Parse from "parse";

// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const user = Parse.User.current();
//         if (!user) {
//           setError("You must be logged in to view your orders.");
//           setLoading(false);
//           return;
//         }
//         const Order = Parse.Object.extend("Order");
//         const query = new Parse.Query(Order);
//         query.equalTo("user", user);
//         query.descending("createdAt");
//         const results = await query.find();
//         setOrders(results);
//       } catch (err) {
//         setError("Failed to fetch orders.");
//         console.log(err);
        
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <div className="p-8 text-center">Loading your orders...</div>;
//   if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">My Orders</h1>
//       {orders.length === 0 ? (
//         <div className="text-gray-600">You have no orders yet.</div>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Order ID</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Items</th>
//               <th className="px-4 py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id} className="border-t">
//                 <td className="px-4 py-2">{order.id}</td>
//                 <td className="px-4 py-2">{order.get("status")}</td>
//                 <td className="px-4 py-2">
//                   <ul className="list-disc pl-4">
//                     {(order.get("items") || []).map((item, idx) => (
//                       <li key={idx}>
//                         {item.coffee.name} x {item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="px-4 py-2">{order.createdAt?.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default MyOrders;

import React, { useEffect, useState } from "react";
import Parse from "parse"; // Ensure Parse is imported

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = Parse.User.current();
        if (!user) {
          setError("You must be logged in to view your orders.");
          setLoading(false);
          return;
        }

        const Order = Parse.Object.extend("Order");
        const query = new Parse.Query(Order);
        query.equalTo("user", user);
        query.descending("createdAt");
        // IMPORTANT: Include the 'items' field if it contains pointers or relations
        // For array of objects, direct access is usually fine, but if 'coffee' within 'items'
        // were a pointer to 'Coffee' object, you'd need query.include('items.coffee')
        // Based on your CartPage, 'items' is an array of objects like { coffeeId, quantity, coffee: { name, price } }
        // so direct access should work.
        const results = await query.find();

        // Assuming 'items' array already contains 'coffee' object with 'name' property
        // from when it was saved in the Cart/Order
        setOrders(results);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error("Error fetching orders:", err); // Use console.error for errors
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); // Logic unchanged: runs once on mount

  // Helper function to get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Delivered": // Example for future status
        return "bg-blue-100 text-blue-800";
      case "Cancelled": // Example for future status
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading your orders...</div>
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
    <div className="min-h-screen bg-gray-50 py-8"> {/* Overall page background and padding */}
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl"> {/* Main content card */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-600 py-10">
            You have no orders yet. Time to get some coffee!
            <p className="mt-4">
              <Link to="/menu" className="text-blue-600 hover:underline font-medium">
                Browse our menu
              </Link>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto"> {/* Ensures table is responsive */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.get("status"))}`}>
                        {order.get("status")}
                      </span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
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

export default MyOrders;
