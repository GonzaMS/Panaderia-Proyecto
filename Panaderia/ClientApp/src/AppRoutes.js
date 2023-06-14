import { Proveedores } from "./components/Proveedores";
import { ProductosElaborados } from "./components/ProductosElaborados";
import { OrdenesProduccion } from "./components/OrdenesProduccion";
import { Cajeros } from "./components/Cajeros";
import { Recetas } from "./components/Recetas";
import { Clientes } from "./components/Clientes";
import { Compras } from "./components/Compras";
import { Ventas } from "./components/Ventas";
import { FacturaCompra } from "./components/FacturaCompra";
import { StockIngrediente } from "./components/StockIngrediente";
import { StockProductos } from "./components/StockProductos";
//import { Home } from "./components/Home";

const AppRoutes = [
  //{
  // index: true,
  //element: <Home />,
  //},
  {
    path: "/Proveedores",
    element: <Proveedores />,
  },
  {
    path: "/Cajeros",
    element: <Cajeros />,
  },
  {
    path: "/Clientes",
    element: <Clientes />,
  },
  {
    path: "/Recetas",
    element: <Recetas />,
  },
  {
    path: "/ProductosElaborados",
    element: <ProductosElaborados />,
  },
  {
    path: "/OrdenesProduccion",
    element: <OrdenesProduccion />,
  },
  {
    path: "/Compras",
    element: <Compras />,
  },
  {
    path: "/FacturaCompra",
    element: <FacturaCompra />,
  },
  {
    path: "/Ventas",
    element: <Ventas />,
  },
  {
    path: "/StockIngrediente",
    element: <StockIngrediente />,
  },
  {
    path: "/StockProductos",
    element: <StockProductos />,
  },
];

export default AppRoutes;
