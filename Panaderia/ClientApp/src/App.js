import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import "./css/styles.css";
import { Menu } from "./components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ThemeProvider>
        <div className={`container-fluid p-3 d-flex flex-row fondo-panel`}>
          <Menu />
          <div className="container">
            <Layout>
              <Routes>
                {AppRoutes.map((route, index) => {
                  const { element, ...rest } = route;
                  return <Route key={index} {...rest} element={element} />;
                })}
              </Routes>
            </Layout>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
