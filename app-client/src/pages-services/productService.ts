import httpModule from "../helpers/HttpModule";
import { ProductFormInput, IProduct, ICategory } from "../types/GlobalTypes";

export class ProductService {
  constructor(private productEndpoints: {
    LIST: string;
    CREATE: string;
    EDIT: string;
    FIND: string;
    CATEGORIES: string;
  }) {}

  // Tạo sản phẩm mới
  async createProduct(productData: {
    name: string;
    price: number;
    description: string;
    stock: number;
    imageURL?: string;
    categoryId: number;
  }) {
    try {

      const data = {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        stock: productData.stock,
        imageURL: productData.imageURL, 
        categoryId: productData.categoryId,
      };

      console.log("Posting product data:", data);

      await httpModule.post(this.productEndpoints.CREATE, data);
    } catch (error) {
      if (error && error instanceof Error) {
        console.log("Error:", error.message);
      }
      throw error;
    }
  }

  // Chỉnh sửa sản phẩm
  async editProduct(id: number, productData: {
    name: string;
    price: number;
    description: string;
    stock: number;
    imageURL?: string;
    categoryId: number;
  }) {
    try {
      const data = {
        productId: id, // Sử dụng đúng ID cho sản phẩm
        name: productData.name,
        price: productData.price,
        description: productData.description,
        stock: productData.stock,
        imageURL: productData.imageURL, // Có thể là undefined
        categoryId: productData.categoryId,
      };

      console.log("Updating product data:", data);

      await httpModule.put(this.productEndpoints.EDIT + `/${id}`, data);
    } catch (error) {
      if (error && error instanceof Error) {
        console.log("Error:", error.message);
      }
      throw error;
    }
  }

  // Lấy danh sách sản phẩm có bộ lọc
  async getProducts(filter: any) {
    try {
      let params = [];

      for (const key in filter) {
        if (filter[key]) {
          params.push(`${key}=${filter[key]}`);
        }
      }

      const response = await httpModule.get<IProduct[]>(this.productEndpoints.LIST + `?${params.join("&")}`);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      } else {
        console.log("Unexpected error:", error);
      }
      throw error;
    }
  }

  // Lấy chi tiết một sản phẩm
  async getProduct(id?: number): Promise<ProductFormInput> {
    try {
      const response = await httpModule.get<IProduct>(this.productEndpoints.FIND + `/${id ?? ""}`);
      const product: ProductFormInput = {
        productId: response.data.productId,
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        stock: response.data.stock,
        imageURL: response.data.imageURL,
        categoryId: response.data.categoryId,
        createdAt: response.data.createdAt,
      };
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  // Xóa một sản phẩm
  async deleteProduct(id: number) {
    try {
      await httpModule.delete<IProduct>(this.productEndpoints.FIND + `/${id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  async getCategories(): Promise<ICategory[]> {
    try {
      const response = await httpModule.get<ICategory[]>(this.productEndpoints.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
}
