import JSResource, { Result } from './JSResource'
import { preloadQuery } from 'react-relay/hooks'
import RelayEnvironment from './RelayEnvironment'

const routes = [
  {
    component: JSResource('Root', () => import('./Root') as Promise<Result>),
    prepare: () => {},
  },
]

export default routes
