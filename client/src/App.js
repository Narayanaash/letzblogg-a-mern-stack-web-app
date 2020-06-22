import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import BlogsList from "./components/BlogsList";
import BlogDetail from "./components/BlogDetail";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import AddBlog from "./components/AddBlog";
import UpdateBlog from "./components/UpdateBlog";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { loadUser } from "./actions/authActions";
import About from "./components/About";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <Route path="/" exact={true} component={BlogsList} />
            <Route path="/single-blog/:id" component={BlogDetail} />
            <Route path="/add-blog" component={AddBlog} />
            <Route path="/update-blog/:id" component={UpdateBlog} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
