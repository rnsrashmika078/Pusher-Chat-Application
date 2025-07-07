export interface ImgProperty {
    secure_url: string;
    public_id: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    color: string;
    model: string;
    category: string;
    images: ImgProperty[];
    stock: number;
    createdAt: string;
}

export interface LoadBody {
    loading: boolean;
    type: string;
}
