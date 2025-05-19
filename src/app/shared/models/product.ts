import { Category } from "./category";

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    featured: boolean;
    discount: number;
    categories: Category[];
}