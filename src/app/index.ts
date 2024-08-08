export interface IProduct {
    id?: number;
    name: string;
    category?: string;
    price: number;
    description?: string;
    image: string;
    department?: string;
    material?: string;
    gallery?: string[];
    hasDiscount?: boolean;
    discountValue?: number;
    details?: {
      adjective: string;
      material: string;
    };
  }
  