import React from 'react'
import { History, Location } from 'history'
import { match } from 'react-router'
import { RouteConfig as DefaultRouteConfig } from 'react-router-config'

export type Prepared = () => void

export interface RouteComponentType extends Entry {
  children?: JSX.Element
}
export interface Route {
  location: Location
  entries: Entry[]
}

export interface Entry extends DefaultRouteConfig {
  prepared: Prepared
  routeData: match<{}>
}

export interface Router {
  history: History<any>
  get: () => Route
  preloadCode: (pathname: string) => void
  preload: (pathname: string) => void
  subscribe: (callback: (arg: Route) => void) => () => void
}

const RoutingContext = React.createContext<Router | null>(null)

/**
 * A custom context instance for our router type
 */
export default RoutingContext
