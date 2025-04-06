import React, { useState, useEffect } from 'react';

export default function Offers() {
    const [offerProducts, setOfferProducts] = useState([]);

    useEffect(() => {
        const offerItems = [
            { product_id: 3, name: "Sofa", originalPrice: 300, offerPrice: 250, offer: "Yes" },
            { product_id: 4, name: "Dining Table", originalPrice: 150, offerPrice: 120, offer: "Yes" },
        ];
        setOfferProducts(offerItems);
    }, []);

    const offerRows = offerProducts.map((item, index) => (
        <tr key={item.product_id}>
            <td>{item.product_id}</td>
            <td>{item.name}</td>
            <td>${item.originalPrice}</td>
            <td>${item.offerPrice}</td>
        </tr>
    ));

    return (
        <div>
            <h3>Products with Offers</h3>
            <table border="2" cellPadding="5" cellSpacing="0" width="700">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Original Price</th>
                        <th>Price After Offer</th>
                    </tr>
                </thead>
                <tbody>{offerRows}</tbody>
            </table>
        </div>
    );
}
