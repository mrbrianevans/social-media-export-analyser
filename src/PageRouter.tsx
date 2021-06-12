import * as React from 'react'
import {HomePage} from "./pages/HomePage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Logo } from './components/Logo/Logo'
import { NavBar } from './components/NavBar/NavBar'

export const PageRouter = () => {
  return     <>
    <Router>
      <Logo/>
      <NavBar/>

      <Switch>
        <Route path={"/"}>
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  </>
}