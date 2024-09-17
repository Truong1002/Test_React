import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { HdrPlusOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../context/ThemeContext";
import { ProductsGrid } from "./sections/ProductsGrid";

export function Products() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   // Khởi tạo defaultValues với các trường mới
   const [defaultValues] = useState({
      name: '',        // Tên sản phẩm
      price: 0,        // Giá sản phẩm
      stock: 0,        // Số lượng tồn kho
      categoryId: 0,   // Danh mục sản phẩm
      description: '', // Mô tả sản phẩm
      imageURL: '',    // URL ảnh sản phẩm
   });

   const redirect = useNavigate();
   
   return (
      <Box m="20px">
         {/* HEADER */}
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Products" subtitle="Product list" />
            <Box>
               <Button
                  sx={{
                     backgroundColor: colors.blueAccent[700],
                     color: colors.grey[100],
                     fontSize: "14px",
                     fontWeight: "bold",
                     padding: "10px 20px",
                  }}
                  onClick={() => redirect("/products/add")}
               >
                  <HdrPlusOutlined sx={{ mr: "10px" }} />
                  Create Product
               </Button>
            </Box>
         </Box>

         {/* Products Grid */}
         <ProductsGrid 
            defaultValues={defaultValues} // Truyền defaultValues với các trường mới
         />

      </Box>
   );
}

export default Products;
