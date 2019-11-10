import React from 'react'
import { usePaginationFragment } from 'react-relay/hooks'
// @ts-ignore
import graphql from 'babel-plugin-relay/macro'

import { Issues_repository$key } from './__generated__/Issues_repository.graphql'

interface Props {
  repository: Issues_repository$key
}

/**
 * Renders a list of issues for a given repository.
 */
export default function Issues(props: Props) {
  // Given a reference to a repository in props.repository, defines *what*
  // data the component needs about that repository. In this case we fetch
  // the list of issues starting at a given cursor (initially null to start
  // at the beginning of the issues list). See the usePaginationFragment()
  // docs: https://relay.dev/docs/en/experimental/api-reference#usepaginationfragment
  // for more details about how to use this hook to paginate over lists.
  const { data } = usePaginationFragment(
    graphql`
      fragment Issues_repository on Repository
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
          states: { type: "[IssueState!]", defaultValue: ["OPEN"] }
        )
        @refetchable(queryName: "IssuesPaginationQuery") {
        issues(after: $cursor, first: $count, states: $states)
          @connection(key: "Issues_issues") {
          edges {
            __id
            node {
              # Compose the data dependencies of child components
              # by spreading their fragments:
              id
              title
            }
          }
        }
      }
    `,
    props.repository,
  )

  return (
    <div className="issues">
      {data &&
        data.issues.edges!.map(edge => {
          if (edge == null || edge.node == null) return null

          return (
            <div className="issues-issue" key={edge.__id}>
              {edge.node.title}
            </div>
          )
        })}
    </div>
  )
}
