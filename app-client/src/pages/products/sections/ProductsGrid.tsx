import { useEffect, useState } from "react";
import { CategoryGridProps, ICategory, ProductGridProps } from "../../../types/GlobalTypes";
import { Box, Typography } from "@mui/material";
import { Add, HdrPlusOutlined, EditOffOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import { redirect, useNavigate } from "react-router-dom";
import Grid from "../../../components/Grid";

import DeleteModal from "../../../components/Modals/DeleteModal";
import FilterProducts from "./FilterProducts";
import { useProducts } from "../../../pages-hooks/useProducts";

export function ProductsGrid({ defaultValues }: ProductGridProps) {
   const { products, handleFilter, handleDelete, setID, isDeleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal } = useProducts(defaultValues);

   const redirect = useNavigate();

   const columns = [
      { field: "id", headerName: "ID" },
      {
         field: "name",
         headerName: "Name",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "price",
         headerName: "Price",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "description",
         headerName: "Description",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "stock",
         headerName: "Stock",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "categoryId",
         headerName: "Category Id",
         flex: 1,
         cellClassName: "name-column--cell",
      },

      {
         field: "acoes",
         headerName: "",
         flex: 1,
         renderCell: (params: any) => (
            <Typography>
               <EditOffOutlined
                  sx={{ cursor: 'pointer' }}
                  onClick={() => redirect(`/products/edit/${params.row.id}`)}
               />
               <DeleteForeverOutlined
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                     setID(params.row.id);
                     handleOpenDeleteModal();
                  }}
               />
            </Typography>
         ),
      },
   ];

   return (
      <Box>
         {/* Filter Categories */}
         <FilterProducts
            defaultValues={defaultValues}
            onFilter={handleFilter}
         />
         {/* End Filter Categories */}

         {
            products.length === 0 ?
               <h1>No Product</h1>
               :
               <Box>
                  {/* Categories Grid */}
                  <Grid
                     title='Products'
                     subtitle='Products'
                     data={products?.map((i) => ({
                        id: i.productId,
                        ...i
                     }))}
                     columns={columns}
                     quickSearch={true}
                  />
                  {/* End Categories Grid */}

                  <DeleteModal
                     title={"CONFIRM DELETION"}
                     subtitle={"The item will be permanently deleted"}
                     isOpen={isDeleteModalOpen}
                     onSubmit={handleDelete}
                     onClose={handleCloseDeleteModal}
                  />
               </Box>
         }
      </Box>

   );
}

