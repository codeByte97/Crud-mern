import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function App() {
  const [data, setdata] = useState([]);
  const NotifyError = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  useEffect(() => {
    async function fecthData() {
      try {
        const res = await fetch('/GetData');
        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
          setdata(data.Data);
        } else {
          NotifyError(res.message);
        }

      } catch (e) {
        console.log(e);
      }
    }
    fecthData();
  })

  return (
    <>
      <Link to='/'>HomePage |</Link>
      <Link to='/AddProduct'>Addproduct</Link>
      <div>
        {data.map((product, index) => {
          return <div key={index} className="Product">
            <h1 id='product' >{product.productName}</h1>
            <h2 id='price'>{product.Price}</h2>
            <h3 id='quantity'>{product.Quantity}</h3>
          </div>;
        })}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
