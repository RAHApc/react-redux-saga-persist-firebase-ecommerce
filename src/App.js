import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.action';

// component
import AdminToolbar from './components/AdminToolbar';

// hoc
import WithAdminAuth from './hoc/withAdminAuth';
import WithAuth from './hoc/withAuth';

// layout
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashBoardLayout from './layouts/DashboardLayout';

//pages
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Order from './pages/Order';

import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  return (
    <div className="App">
      <AdminToolbar/>
        <Switch>
          <Route exact path="/" render={() => (
            <HomePageLayout>
              <HomePage/>
            </HomePageLayout>
          )}/>

          <Route exact path="/search" render={() => (
            <MainLayout>
              <Search/>
            </MainLayout>
          )}/>

          <Route path="/search/:filterType" render={() => (
            <MainLayout>
              <Search/>
            </MainLayout>
          )}/>

          <Route path="/product/:productID" render={() => (
            <MainLayout>
              <ProductDetails/>
            </MainLayout>
          )}/>

          <Route path="/cart" render={() => (
            <MainLayout>
              <Cart/>
            </MainLayout>
          )}/>

          <Route path="/registration" render={() =>
          (
            <MainLayout>
              <Registration/>
            </MainLayout>
          )}/>

          <Route path="/login" render={() => 
          (
            <MainLayout>
              <Login/>
            </MainLayout>
          )}/>

          <Route path="/recovery" render={() => 
          (
            <MainLayout>
              <Recovery/>
            </MainLayout>
          )}/>

          <Route path="/dashboard" render={() => 
          (
            <WithAuth>
              <MainLayout>
                <Dashboard/>
              </MainLayout>
            </WithAuth>
          )}/>

          <Route path="/order/:orderID" render={() => 
          (
            <WithAuth>
              <DashBoardLayout>
                <Order/>
              </DashBoardLayout>
            </WithAuth>
          )}/>

          <Route path="/admin" render={() => 
          (
            <WithAdminAuth>
              <AdminLayout>
                <Admin/>
              </AdminLayout>
            </WithAdminAuth>
          )}/>

        </Switch>
    </div>
  );
}


export default App;
