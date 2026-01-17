"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchById } from '@/app/redux/products/productsThunks';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';


export default function Détails() {

  const {id} = useParams();
  const dispatch = useDispatch();
  const {selectedProduct, loading, error} = useSelector ((state)=>state.products);

  useEffect ( () => {
    dispatch(fetchById(id));
  },[dispatch,id]);

   if (loading) {
    return <p className="text-center-red mt-10">hello</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">error getting product...</p>;
  }

  if (!selectedProduct) {
    return null;
  }
   

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          {selectedProduct.name}
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Category: <span className="font-semibold">{selectedProduct.category}</span>
        </p>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-bold">Price:</span>{" "}
            {selectedProduct.price} Dh
          </p>

          <p>
            <span className="font-bold">Quantity:</span>{" "}
            {selectedProduct.quantity}
          </p>

          <p>
            <span className="font-bold">Description:</span>
            <br />
            {selectedProduct.description || "No description"}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-block mt-6 text-teal-600 font-bold hover:underline"
        >
          ← Back to products
        </Link>
      </div>
    </div>
  )
}
