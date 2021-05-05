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
import { createBoard } from "./actions/index";
import Form from './Components/Board/Form';

export default function App() {
  window.store = store;
  console.log(store.getState());
  console.log(store.getState().boards);

  const unsubscribe = store.subscribe( () => console.log('Updated state ', store.getState));
 
 /* store.dispatch( createBoard( {
    type: "board",
    id: "3",
    title: "TDs",
    notes: "",
    postits: [
      {
        type: "postit",
        board: "3",
        title: "TD 1",
        text: "TD React",
        visible: false,
        color: "#CCC",
      },],
  },
  
  ));*/
  console.log(store.getState());
  console.log(store.getState().boards);

  unsubscribe();

  return (
    <div className="app">
      <PrimarySearchAppBar boards={store.getState().boards} index={store.getState().index}  />
      <Switch>
        <Route exact path="/">
          <Board board={store.getState().boards} index={store.getState().index} />
        </Route>
        <Route exact path="/:id" >
          <Board board={store.getState().boards} index={store.getState().index} />
        </Route>
        <Route exact path='/update/:id' component={Form}></Route>
        <Route exact path="/add">
          <Form />
        </Route>
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

