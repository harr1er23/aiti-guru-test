import type { SortField, SortOrder } from "../../../entities/product/type";
import { create } from "zustand";

interface ProductsStore {
    search: string;
    sortBy: SortField;
    order: SortOrder;
    page: number;
    limit: number;
    setSearch: (search: string) => void;
    setSort: (sortBy: SortField, order: SortOrder) => void;
    setPage: (page: number) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
    search: '',
    sortBy: 'title',
    order: 'asc',
    page: 1,
    limit: 12,
    setSearch: (search) => set({ search, page: 1 }),
    setSort: (sortBy, order) => set({ sortBy, order }),
    setPage: (page) => set({ page }),
}));