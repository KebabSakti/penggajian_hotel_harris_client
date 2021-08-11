import Template from "./components/Template";
import SalaryPage from "./pages/SalaryPage";
import EmployeePage from "./pages/EmployeePage";
import DepartmentPage from "./pages/DepartmentPage";
import PasswordPage from "./pages/PasswordPage";
import PositionPage from "./pages/PositionPage";
import StatusPage from "./pages/StatusPage";
import TaxPage from "./pages/TaxPage";

const routes = [
  {
    path: "/salary",
    layout: Template,
    component: SalaryPage,
    exact: false,
  },
  {
    path: "/employee",
    layout: Template,
    component: EmployeePage,
    exact: false,
  },
  {
    path: "/department",
    layout: Template,
    component: DepartmentPage,
    exact: false,
  },
  {
    path: "/position",
    layout: Template,
    component: PositionPage,
    exact: false,
  },
  {
    path: "/status",
    layout: Template,
    component: StatusPage,
    exact: false,
  },
  {
    path: "/tax",
    layout: Template,
    component: TaxPage,
    exact: false,
  },
  {
    path: "/password",
    layout: Template,
    component: PasswordPage,
    exact: false,
  },
];

export default routes;
