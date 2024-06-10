import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Table: {order.tableNumber}, Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
