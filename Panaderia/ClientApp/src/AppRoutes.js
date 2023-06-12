//import { Home } from "./components/Home";
import { Proveedores } from "./components/Proveedores";
import { ProductosElaborados } from "./components/ProductosElaborados";
import { OrdenesProduccion } from "./components/OrdenesProduccion";
import { Cajeros } from "./components/Cajeros";
import { Recetas } from "./components/Recetas";
import { Clientes } from "./components/Clientes";

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
];

export default AppRoutes;
