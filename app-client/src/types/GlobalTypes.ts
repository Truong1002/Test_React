// Interface cho form nhập liệu của danh mục
export interface CategoryFormInput {
   categoryId: number;
   name: string;
   description?: string; // Thêm nếu cần
   createdAt: string;
}

// Interface cho các thuộc tính mặc định khi hiển thị lưới danh mục
export interface CategoryGridProps {
   defaultValues: {
      name: string;
      description?: string;
      // ... other properties if any
    };
}

// Interface cho bộ lọc danh mục với hàm onFilter
export interface CategoryFilterProps {
   defaultValues: {
      name: string;
      description?: string;
      // ... other properties if any
    };
    onFilter: (filter: any) => Promise<void>;
}

// Interface cho đối tượng danh mục
export interface ICategory {
   categoryId: number;
   name: string;
   description?: string;
   createdAt: string;
}

// Interface cho form nhập liệu của sản phẩm
export interface ProductFormInput {
   productId: number;
   name: string;
   price: number;
   stock: number;       // Thêm stock để phù hợp với API
   description?: string; // Thêm description nếu cần
   imageURL?: string;    // Thêm imageURL nếu có
   categoryId: number;
   createdAt: string;
}

// Interface cho các thuộc tính mặc định khi hiển thị lưới sản phẩm
export interface ProductGridProps {
   defaultValues: {
      name: string;
      price: number;
      stock: number;
      description?: string;
      imageURL?: string;
      // ... other properties if any
    };
}

// Interface cho bộ lọc sản phẩm với hàm onFilter
export interface ProductFilterProps {
   defaultValues: {
      name: string;
      price: number;
      stock: number;
      description?: string;
      // ... other properties if any
    };
    onFilter: (filter: any) => Promise<void>;
}

// Interface cho đối tượng sản phẩm
export interface IProduct {
   productId: number;
   name: string;
   price: number;
   stock: number;       // Thêm stock để phù hợp với API
   description?: string; // Thêm description nếu cần
   imageURL?: string;    // Thêm imageURL nếu có
   categoryId: number;
   createdAt: string;
}
