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
import { Router, Route, Entry, Prepared } from './RoutingContext'

interface RouteConfig extends DefaultRouteConfig {
  prepare: (params: {}) => Prepared
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
  options?: BrowserHistoryBuildOptions,
) {
  // Initialize history
  const history = createBrowserHistory(options)

  // Find the initial match and prepare it
  const initialMatches = matchRoute(routes, history.location)
  const initialEntries = prepareMatches(initialMatches)
  let currentEntry = {
    location: history.location,
    entries: initialEntries,
  }

  // maintain a set of subscribers to the active entry
  let nextId = 0
  const subscribers = new Map()

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanup = history.listen((location, action) => {
    if (location.pathname === currentEntry.location.pathname) {
      return
    }
    const matches = matchRoute(routes, location)
    const entries = prepareMatches(matches)
    const nextEntry = {
      location,
      entries,
    }
    currentEntry = nextEntry
    subscribers.forEach(cb => cb(nextEntry))
  })

  // The actual object that will be passed on the RoutingContext.
  const context: Router = {
    history,
    get() {
      return currentEntry
    },
    preloadCode(pathname: string) {
      // preload just the code for a route, without storing the result
      const matches = matchRoutes(routes, pathname)
      // @ts-ignore
      matches.forEach(({ route }) => route.component.load())
    },
    preload(pathname: string) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname) as CustomMatchedRoute<{}>[]
      prepareMatches(matches)
    },
    subscribe(cb: (arg: Route) => void) {
      const id = nextId++
      const dispose = () => {
        subscribers.delete(id)
      }
      subscribers.set(id, cb)
      return dispose
    },
  }

  // Return both the context object and a cleanup function
  return { cleanup, context }
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
function prepareMatches(matches: CustomMatchedRoute<{}>[]): Entry[] {
  return matches.map(match => {
    const { route, match: matchData } = match
    const prepared = route.prepare(matchData.params)
    // @ts-ignore
    const Component = route.component.get()
    if (Component == null) {
      // @ts-ignore
      route.component.load() // eagerly load
    }
    return {
      component: route.component,
      prepared: prepared,
      routeData: matchData,
    }
  })
}
