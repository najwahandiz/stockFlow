"use client";

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '@/app/redux/products/productsSlice'
import aiReducer from '@/app/redux/ai/aiSlice'

export const store = configureStore ({
    reducer : {
        products : productsReducer,
        ai : aiReducer
        
    }
});