import React from 'react'
import { usePreloadedQuery } from 'react-relay/hooks'
// @ts-ignore
import graphql from 'babel-plugin-relay/macro'

import { IssueDetailRootQuery } from './__generated__/IssueDetailRootQuery.graphql'
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes'

interface Props {
  prepared: {
    issueDetailQuery: PreloadedQuery<IssueDetailRootQuery>
  }
}

/**
 * The root component for the issue detail route.
 */
export default function IssueDetailRoot(props: Props) {
  // Defines *what* data the component needs via a query. The responsibility of
  // actually fetching this data belongs to the route definition: it calls
  // preloadQuery() with the query and variables, and the result is passed
  // on props.prepared.issueDetailQuery - see src/routes.js
  const { node: issue } = usePreloadedQuery(
    graphql`
      query IssueDetailRootQuery($id: ID!) {
        node(id: $id) {
          ... on Issue {
            title
            number
            author {
              login
              avatarUrl
            }
            body
            closed
            url
          }
        }
      }
    `,
    props.prepared.issueDetailQuery,
  )
  if (issue == null) {
    return 'Issue not found'
  }

  return (
    <div className="issue">
      <div className="issue-title">
        #{issue.number} - {issue.title} - {issue.closed ? 'Closed' : 'Open'}
        <a
          href={issue.url as string}
          className="issue-title-github-link"
          title="Issue on Github"
        >
          View on Github
        </a>
      </div>
    </div>
  )
}
