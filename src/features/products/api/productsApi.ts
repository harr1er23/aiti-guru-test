import type { ProductsParams, ProductsResponse } from "../../../entities/product/type";
import { api } from "../../../shared/api/axiosInstance";

export const getProducts = async (params?: ProductsParams): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>('/products', { params });
    return data;
};

export const searchProducts = async (query: string, params?: ProductsParams): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>('/products/search', {
        params: { q: query, ...params },
    });
    return data;
};