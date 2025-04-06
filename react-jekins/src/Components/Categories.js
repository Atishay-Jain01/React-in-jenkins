import React from 'react';
import { Link } from 'react-router-dom';
import './Cat.css';

export default function Categories() {
    const categories = [
        { catno: 1, catname: "Beds", offer: "No", availability: "Yes", image: "bed.avif" },
        { catno: 2, catname: "Decor", offer: "No", availability: "Yes", image: "decor.avif" },
        { catno: 3, catname: "Furniture", offer: "Yes", availability: "Yes", image: "furniture.avif" },
        { catno: 4, catname: "Sofa", offer: "Yes", availability: "Yes", image: "sofas.avif" },
        { catno: 5, catname: "Storage", offer: "No", availability: "Yes", image: "store_organise.avif" },
    ];

    const categoryRows = categories.map((item, index) => (
        <tr className={index % 2 === 0 ? "c2" : "c3"} key={item.catno}>
            <td>{item.catno}</td>
            <td>{item.catname}</td>
            <td>{item.offer}</td>
            <td>{item.availability}</td>
            <td align="center">
                <img src={`/images/${item.image}`} alt={item.catname} width="100" />
            </td>
            <td align="center">
                <Link to={`/Products/${item.catno}`}>Details</Link>
            </td>
        </tr>
    ));

    return (
        <div>
            <h3>All Categories</h3>
            <table border="2" cellPadding="5" cellSpacing="0" width="700">
                <thead>
                    <tr className="c1">
                        <th>S. no.</th>
                        <th>Category Name</th>
                        <th>Offer</th>
                        <th>Availability</th>
                        <th>Image</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>{categoryRows}</tbody>
            </table>
        </div>
    );
}
