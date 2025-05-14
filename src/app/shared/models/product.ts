import { Category } from "./category";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    featured: boolean;
    discount: number;
    categories: Category[];
}