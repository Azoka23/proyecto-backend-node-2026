import "./App.css";
import "./components/Item/Item.css";
import "./components/ItemList/ItemList.css";
import "./components/ItemListContainer/ItemListContainer.css";
import "./components/ShoppingCart/ShoppingCart.css";

// 📦 LIBRERÍAS
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔐 CONTEXT
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// 🛡️ RUTAS PROTEGIDAS
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

// 🛍️ COMPONENTES TIENDA (PÚBLICOS)
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { Checkout } from "./components/Checkout/Checkout";
import { OrderConfirmation } from "./components/OrderConfirmation/OrderConfirmation";
import { Contacto } from "./components/Contacto/Contacto";

// 🔑 AUTH (LOGIN Y REGISTRO)
import { Login } from "./components/Login/Login.jsx";
import { Registro } from "./components/Login/Registro.jsx"; // <--- AGREGADO

// 🧱 LAYOUTS
import { MainLayout } from "./Layout/MainLayout";
import { AdminLayout } from "./Layout/AdminLayout";

// 🛠️ ADMIN COMPONENTS (PRIVADOS)
import { AdminDashboard } from "./adminComponents/AdminDashboard/AdminDashboard";
import { ProductFormContainer } from "./adminComponents/ProductFormContainer/ProductFormContainer";
import { ProductList } from "./adminComponents/ProductList/ProductList";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* 🛒 RUTAS PÚBLICAS (TIENDA) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route
                path="/categoria/:categoriaId"
                element={<ItemListContainer />}
              />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<ShoppingCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation/:orderId"
                element={<OrderConfirmation />}
              />
            </Route>
            {/* 🔐 RUTAS PRIVADAS (ADMINISTRADOR) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  element={<AdminLayout />}
                  requiredRole="administrador"
                />
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route
                path="productos/crear"
                element={<ProductFormContainer />}
              />
              <Route
                path="productos/editar/:id"
                element={<ProductFormContainer />}
              />
              <Route path="productos/lista" element={<ProductList />} />
            </Route>
            {/* 🔑 ACCESO (SIN LAYOUT) */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />{" "}
            {/* <--- AGREGADO */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
