import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./context/ThemeContext";
import Topbar from "./pages/global/Topbar";
import Categories from "./pages/categories/Categories";
import CreateCategory from "./pages/categories/CreateCategory";
import EditCategory from "./pages/categories/EditCategory";
import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories">
                <Route index element={<Categories />} />
                <Route path="add" element={<CreateCategory />} />
                <Route path="edit/:id" element={<EditCategory />} />
              </Route>
              <Route path="/products">
                <Route index element={<Products />} />
                <Route path="add" element={<CreateProduct />} />
                <Route path="edit/:id" element={<EditProduct />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
