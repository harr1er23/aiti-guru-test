import { useQuery } from "@tanstack/react-query";
import { useProductsStore } from "../model/productsStore";
import { getProducts, searchProducts } from "../api/productsApi";

export const useProducts = () => {
    const { search, sortBy, order, page, limit } = useProductsStore();

    const skip = (page - 1) * limit;
    const params = { limit, skip, sortBy, order };

    return useQuery({
        queryKey: ['products', search, sortBy, order, page],
        queryFn: () => search ? searchProducts(search, params) : getProducts(params),
    });
}