import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Prodeets() {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchedProduct = {
            product_id: productId,
            name: "Double Bed",
            color: "Brown",
            manufacturingDate: "2023-01-01",
            company: "IKEA",
            price: 199.99,
            image: "DoubleBed.jpg"
        };

        setProductDetails(fetchedProduct);
    }, [productId]);

    return (
        <div>
            {productDetails ? (
                <div>
                    <h3>{productDetails.name}</h3>
                    <img
                        src={`/images/${productDetails.image}`}
                        alt={productDetails.name}
                        width="200"
                    />
                    <p>Product ID: {productDetails.product_id}</p>
                    <p>Color: {productDetails.color}</p>
                    <p>Manufacturing Date: {productDetails.manufacturingDate}</p>
                    <p>Company: {productDetails.company}</p>
                    <p>Price: ${productDetails.price}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
