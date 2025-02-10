import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      console.log("API Response:", response.data); // Debugging log

      // Ensure data is always an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setData([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]); // Fallback in case of API failure
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {Array.isArray(order.items)
                  ? order.items.map((item, index) =>
                      index === order.items.length - 1
                        ? `${item.name} X ${item.quantity}`
                        : `${item.name} X ${item.quantity}, `
                    )
                  : "No items found"}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items ? order.items.length : 0}</p>
              <p>
                <span>&#x23f;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
