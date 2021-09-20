// import './styles.css'
// import React from 'react'
import { Provider } from 'mobx-react'
import { useStore } from './stores/getStore'

console.log('====', useStore)

interface AppType {
  config: any;
  baseComponent: any;
}

const App: React.FC<AppType> = ({config, baseComponent}) => {
  const { stores } = config;
  return (
      <Provider {...stores}>
        {baseComponent()}
      </Provider>
  )
}

export default App;
