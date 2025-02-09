import { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <p className="order-item">
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name}X${item.quantity}`
                  : `${item.name}X${item.quantity}, `
              )}
            </p>
            <p className="order-item-name">
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div className="order-item-address">
              <p>{order.address.street + ", "}</p>
              <p>
                {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
              </p>
            </div>
            <p className="order-item-phone">{order.address.phone}</p>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
