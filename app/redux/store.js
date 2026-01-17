"use client";


import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '@/app/redux/products/productsSlice'

export const store = configureStore ({
    reducer : {
        products : productsReducer
    }
});