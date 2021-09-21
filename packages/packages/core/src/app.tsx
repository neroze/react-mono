// import './styles.css'
// import React from 'react'
import { Provider } from 'mobx-react'
import { useStore } from './stores/getStore'

console.log('====', useStore)

interface AppType {
  config: any;
  // baseComponent: any;
  allRoutes: any;
}

const App: React.FC<AppType> = ({config, allRoutes}) => {
  const { stores } = config;
  return (
      <Provider {...stores} routes={allRoutes} />
  )
}

export default App;
