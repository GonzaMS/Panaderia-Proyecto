import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import "./custom.css";
import { Menu } from "./components/Menu";

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
