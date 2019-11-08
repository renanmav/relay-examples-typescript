/** eslint-disable-file */
import React from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import './index.css'
import RelayEnvironment from './RelayEnvironment'
import App from './Root'
import RoutingContext from './routing/RoutingContext'
import createRouter from './routing/createRouter'
import routes from './routes'

// Uses the custom router setup to define a router instanace that we can pass through context
// @ts-ignore
const router = createRouter(routes)

ReactDOM.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      <App />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>,
  document.getElementById('root'),
)
