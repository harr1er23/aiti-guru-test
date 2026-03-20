export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    brand: string;
    sku: string;
    thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortField = 'price' | 'rating' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface ProductsParams {
    limit?: number;
    skip?: number;
    sortBy?: SortField;
    order?: SortOrder;
}