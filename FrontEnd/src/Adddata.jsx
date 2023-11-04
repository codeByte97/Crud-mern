import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
function AddProduct() {
    const [product, setProduct] = useState({
        productName: '',
        pid: '',
        Price: 0,
        Quantity: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === 'Price' || name === 'Quantity' ? parseInt(value) : value,
        });
    };
    const Notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await fetch('/AddData', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        });
        const res = await result.json();
        if (res.status === 200) {
            Notify(res.message);
        }
        else {
            NotifyError(res.message);
        }

    };

    return (
        <>
            <Link to='/'>HomePage |</Link> 
            <Link to='/AddProduct'>Addproduct</Link>
            <div>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productName">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="productId">Product ID:</label>
                        <input
                            type="text"
                            id="productId"
                            name="pid"
                            value={product.productId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="Price"
                            value={product.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="Quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default AddProduct;
