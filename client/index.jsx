import React from "react";
import ReactDOM from "react-dom";
import Board from "./Components/Board/Board";
import PrimarySearchAppBar from './Components/AppToolbar/AppToolbar';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/index";
import Form from './Components/Board/Form';
import FormPostIT from './Components/POSTIT/Form';

export default function App() {
  window.store = store;
 /* console.log(store.getState());
  console.log(store.getState().boards);
  const unsubscribe = store.subscribe( () => console.log('Updated state ', store.getState));
  unsubscribe();
*/
  return (
    <div className="app">
      <PrimarySearchAppBar boards={store.getState().boards} index={store.getState().index}  />
      <Switch>
        <Route exact path="/">
          <Board board={store.getState().boards} index={store.getState().index} />
        </Route>
        <Route exact path="/board/:id_props" >
          <Board board={store.getState().boards} index={store.getState().index} />
        </Route>
        <Route exact path='/add/board' component={Form}></Route>
        <Route exact path='/update/board/:id' component={Form}></Route>
        <Route exact path='/add/postit' component={FormPostIT}></Route>
        <Route exact path='/update/postit/:idx_postit' component={FormPostIT}></Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  < Provider store={store} >
    <Router>
      <App />
    </Router>
  </Provider >,
  document.getElementById("root")
);

