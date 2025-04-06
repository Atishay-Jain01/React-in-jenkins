import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Cat.css';

export default function Products() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchedProducts = [
            { product_id: 1, prodname: "Double Bed", availability: "Yes", image: "DoubleBed.jpg" },
            { product_id: 2, prodname: "Bed with Storage", availability: "Yes", image: "BedWithStorage.jpg" },
            { product_id: 3, prodname: "Single Bed", availability: "Yes", image: "SingleBed.jpg" },
            { product_id: 4, prodname: "Children's Bed", availability: "Yes", image: "ChildrensBed.jpg" },
            { product_id: 5, prodname: "Bunk Bed", availability: "Yes", image: "BunkBed.jpg" },
        ];

        setProducts(fetchedProducts);
    }, [categoryId]);

    const productRows = products.map((item, index) => (
        <tr className={index % 2 === 0 ? "c2" : "c3"} key={item.product_id}>
            <td>{item.product_id}</td>
            <td>{item.prodname}</td>
            <td>{item.availability}</td>
            <td align="center">
                <img src={`/images/${item.image}`} alt={item.prodname} width="100" />
            </td>
            <td align="center">
                <Link to={`/Prodeets/${item.product_id}`}>Details</Link>
            </td>
        </tr>
    ));

    return (
        <div>
            <h3>Shop Beds</h3>
            <table border="2" cellPadding="5" cellSpacing="0" width="700">
                <thead>
                    <tr className="c1">
                        <th>S. no.</th>
                        <th>Product Name</th>
                        <th>Availability</th>
                        <th>Image</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>{productRows}</tbody>
            </table>
        </div>
    );
}
