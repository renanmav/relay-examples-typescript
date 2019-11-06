/** eslint-disable-file */
import React from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import './index.css'
import RelayEnvironment from './RelayEnvironment'
import App from './App'
import RoutingContext from './routing/RoutingContext'
import createRouter from './routing/createRouter'

// Uses the custom router setup to define a router instanace that we can pass through context
// const router = createRouter()

ReactDOM.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    {/* <RoutingContext.Provider value={router}> */}
    <App />
    {/* </RoutingContext.Provider> */}
  </RelayEnvironmentProvider>,
  document.getElementById('root'),
)
