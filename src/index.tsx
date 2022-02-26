import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MonsterDisplay } from './components/Monster/Monster';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <MonsterDisplay monsterIndex="adult-black-dragon" />
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
