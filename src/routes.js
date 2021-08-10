import Template from "./components/Template";
import HomePage from "./pages/HomePage";
import SalaryPage from "./pages/SalaryPage";

const routes = [
  {
    path: "/home",
    layout: Template,
    component: HomePage,
    exact: false,
  },
  {
    path: "/salary",
    layout: Template,
    component: SalaryPage,
    exact: false,
  },
];

export default routes;
