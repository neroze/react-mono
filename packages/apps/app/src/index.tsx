import { render } from 'react-dom'
import Kernal from '@lp/core/src/kernel'
import App from '@lp/core/src/app'

import { RootStore } from '@lp/core/src/stores/root';

interface MyAppI {
  config: any;
  baseComponent: any
}

// const App = () => {
//   return <div>I am App</div>
// }
//@ts-ignore
const MyApp: React.FC<MyAppI> = ({ config = { appName: 'Wild World' }, baseComponent }) => {
  const rootElement = document.getElementById('root')
  return render(<App config={config} baseComponent={baseComponent} />, rootElement)
}

const moduleRoutes = [import('./modules/home/routes'), import('./modules/register/routes')]

Kernal.processes.beforeStart = () => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      const stores = {
        root: RootStore.create()
      }
      console.log('----------- before start is resolve now')
      return resolve({
        appName: 'Boot App q111',
        stores
      })
    }, 1000)
  })
}
Kernal.start({}, MyApp, moduleRoutes)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
