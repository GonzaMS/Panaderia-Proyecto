//import { Home } from "./components/Home";
import { Proveedores } from "./components/Proveedores";
import { ProductosElaborados } from "./components/ProductosElaborados";
import { OrdenesProduccion } from "./components/OrdenesProduccion";
import { Cajeros } from "./components/Cajeros";
import { Recetas } from "./components/Recetas";
import { Clientes } from "./components/Clientes";
import { Compras } from "./components/Compras";
import { Ventas } from "./components/Ventas";
import { FacturaVenta } from "./components/FacturaVenta";
import { FacturaCompra } from "./components/FacturaCompra";

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
    path: "/ProductosElaborados",
    element: <ProductosElaborados />,
  },
  {
    path: "/OrdenesProduccion",
    element: <OrdenesProduccion />,
  },
  {
    path: "/Cajeros",
    element: <Cajeros />,
  },
  {
    path: "/Recetas",
    element: <Recetas />,
  },
  {
    path: "/Clientes",
    element: <Clientes />,
  },
  {
    path: "/Compras",
    element: <Compras />,
  },
  {
    path: "/Ventas",
    element: <Ventas />,
  },
  {
    path: "/FacturaCompra",
    element: <FacturaCompra />,
  },
];

export default AppRoutes;
