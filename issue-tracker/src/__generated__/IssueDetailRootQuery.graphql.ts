/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type IssueDetailRootQueryVariables = {
  id: string
}
export type IssueDetailRootQueryResponse = {
  readonly node: {
    readonly title?: string
    readonly number?: number
    readonly author?: {
      readonly login: string
      readonly avatarUrl: unknown
    } | null
    readonly body?: string
    readonly closed?: boolean
    readonly url?: unknown
  } | null
}
export type IssueDetailRootQuery = {
  readonly response: IssueDetailRootQueryResponse
  readonly variables: IssueDetailRootQueryVariables
}

/*
query IssueDetailRootQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on Issue {
      title
      number
      author {
        __typename
        login
        avatarUrl
        ... on Node {
          id
        }
      }
      body
      closed
      url
    }
    id
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'id',
        type: 'ID!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: 'title',
      args: null,
      storageKey: null,
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: 'number',
      args: null,
      storageKey: null,
    },
    v4 = {
      kind: 'ScalarField',
      alias: null,
      name: 'login',
      args: null,
      storageKey: null,
    },
    v5 = {
      kind: 'ScalarField',
      alias: null,
      name: 'avatarUrl',
      args: null,
      storageKey: null,
    },
    v6 = {
      kind: 'ScalarField',
      alias: null,
      name: 'body',
      args: null,
      storageKey: null,
    },
    v7 = {
      kind: 'ScalarField',
      alias: null,
      name: 'closed',
      args: null,
      storageKey: null,
    },
    v8 = {
      kind: 'ScalarField',
      alias: null,
      name: 'url',
      args: null,
      storageKey: null,
    },
    v9 = {
      kind: 'ScalarField',
      alias: null,
      name: '__typename',
      args: null,
      storageKey: null,
    },
    v10 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'IssueDetailRootQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0 /*: any*/,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'node',
          storageKey: null,
          args: v1 /*: any*/,
          concreteType: null,
          plural: false,
          selections: [
            {
              kind: 'InlineFragment',
              type: 'Issue',
              selections: [
                v2 /*: any*/,
                v3 /*: any*/,
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'author',
                  storageKey: null,
                  args: null,
                  concreteType: null,
                  plural: false,
                  selections: [v4 /*: any*/, v5 /*: any*/],
                },
                v6 /*: any*/,
                v7 /*: any*/,
                v8 /*: any*/,
              ],
            },
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'IssueDetailRootQuery',
      argumentDefinitions: v0 /*: any*/,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'node',
          storageKey: null,
          args: v1 /*: any*/,
          concreteType: null,
          plural: false,
          selections: [
            v9 /*: any*/,
            v10 /*: any*/,
            {
              kind: 'InlineFragment',
              type: 'Issue',
              selections: [
                v2 /*: any*/,
                v3 /*: any*/,
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'author',
                  storageKey: null,
                  args: null,
                  concreteType: null,
                  plural: false,
                  selections: [
                    v9 /*: any*/,
                    v4 /*: any*/,
                    v5 /*: any*/,
                    v10 /*: any*/,
                  ],
                },
                v6 /*: any*/,
                v7 /*: any*/,
                v8 /*: any*/,
              ],
            },
          ],
        },
      ],
    },
    params: {
      operationKind: 'query',
      name: 'IssueDetailRootQuery',
      id: null,
      text:
        'query IssueDetailRootQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Issue {\n      title\n      number\n      author {\n        __typename\n        login\n        avatarUrl\n        ... on Node {\n          id\n        }\n      }\n      body\n      closed\n      url\n    }\n    id\n  }\n}\n',
      metadata: {},
    },
  }
})()
;(node as any).hash = 'e19918a2ba239e3bb285379bc344c3ef'
export default node
