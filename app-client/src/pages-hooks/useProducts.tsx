import { useEffect, useState } from "react";
import { ProductService } from "../pages-services/productService"; // Assuming you have a ProductService similar to CategoryService
import { IProduct } from "../types/GlobalTypes";
import endpoints from "../helpers/Endpoints";
import { useModalDelete } from "../pages-utils/useModalDelete";

// Instantiate ProductService
const productService = new ProductService(
   endpoints.PRODUCT.v1
);

export const useProducts = (defaultValues: any) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { id, setID, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal } = useModalDelete();
  
   useEffect(() => {
      productService.getProducts(defaultValues)
         .then((products) => setProducts(products))
         .catch((error) => console.error(error));
   }, []);

   const handleDelete = async () => {
      try {
         await productService.deleteProduct(Number(id));
         handleCloseDeleteModal();
         setProducts(products.filter(p => p.productId !== id)); // Remove the deleted product from the list
      } catch (error) {
         console.error(error);
      }
   };

   const handleFilter = async (filter: any) => {
      try {
         const filteredProducts = await productService.getProducts(filter);
         setProducts(filteredProducts);
      } catch (error) {
         console.error(error);
      }
   };

  return { products, setProducts, handleDelete, handleFilter, setID, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal };
};
