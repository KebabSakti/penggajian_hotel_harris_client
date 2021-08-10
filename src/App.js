import React, { useContext } from "react";
import routes from "./routes";
import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  const [user] = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <AuthPage />
        </Route>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => {
                if (user === null) {
                  return <Redirect to="/" />;
                } else {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }
              }}
            />
          );
        })}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
