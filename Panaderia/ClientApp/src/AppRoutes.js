import { Home } from "./components/Home";
import { Proveedores } from "./components/Proveedores";
import { Recetas } from "./components/Recetas";
import { ProductosElaborados } from "./components/ProductosElaborados";
import { OrdenesProduccion } from "./components/OrdenesProduccion";
import { Cajeros } from "./components/Cajeros";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
  {
    path: "/recetas",
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
    path: "/cajeros",
    element: <Cajeros />,
  },
];

export default AppRoutes;
