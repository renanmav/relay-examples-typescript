import {
  createBrowserHistory,
  BrowserHistoryBuildOptions,
  Location,
} from 'history'
import {
  matchRoutes,
  RouteConfig as DefaultRouteConfig,
  MatchedRoute,
} from 'react-router-config'

interface RouteConfig extends DefaultRouteConfig {
  prepare: (params: {}) => {}
}
interface CustomMatchedRoute<T> extends MatchedRoute<T> {
  route: RouteConfig
}

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a prepare() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 */
export default function createRouter(
  routes: RouteConfig[],
  options: BrowserHistoryBuildOptions,
) {
  // Initialize history
  const history = createBrowserHistory(options)

  // Find the initial match and prepare it
  const initialMatches = matchRoute(routes, history.location)
  const initialEntries = prepareMatches(initialMatches)
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes: RouteConfig[], location: Location) {
  const matchedRoutes = (matchRoutes(
    routes,
    location.pathname,
  ) as unknown) as CustomMatchedRoute<{}>[]

  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error('No route for ' + location.pathname)
  }
  return matchedRoutes
}

/**
 * Load the data for the matched route, given the params extracted from the route
 */
function prepareMatches(matches: CustomMatchedRoute<{}>[]) {
  return matches.map(match => {
    const { route, match: matchData } = match
    const prepared = route.prepare(matchData.params)
    // @ts-ignore
    const Component = route.component.get()
    if (Component == null) {
      // @ts-ignore
      route.component.load() // eagerly load
    }
    return { component: route.component, prepared, routeData: matchData }
  })
}
