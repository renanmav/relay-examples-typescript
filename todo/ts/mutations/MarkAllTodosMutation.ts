/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { commitMutation, graphql } from "react-relay"

import { TodoList_viewer } from "../__relay_artifacts__/TodoList_viewer.graphql"
import { Environment } from "relay-runtime"
import { MarkAllTodosMutation } from "../__relay_artifacts__/MarkAllTodosMutation.graphql"

const mutation = graphql`
  mutation MarkAllTodosMutation($input: MarkAllTodosInput!) {
    markAllTodos(input: $input) {
      changedTodos {
        id
        complete
      }
      viewer {
        id
        completedCount
      }
    }
  }
`

function getOptimisticResponse(
  complete: boolean,
  todos: TodoList_viewer["todos"],
  user: TodoList_viewer,
) {
  const payload: any = { user: { id: user.id } }
  if (todos && todos.edges) {
    payload.changedTodos = todos.edges
      .filter(edge => edge && edge.node && edge.node.complete !== complete)
      .map(edge => ({
        complete: complete,
        id: edge && edge.node && edge.node.id,
      }))
  }
  if (user.totalCount != null) {
    payload.user.completedCount = complete ? user.totalCount : 0
  }
  return {
    markAllTodos: payload,
  }
}

function commit(
  environment: Environment,
  complete: boolean,
  todos: TodoList_viewer["todos"],
  user: TodoList_viewer,
) {
  return commitMutation<MarkAllTodosMutation>(environment, {
    mutation,
    variables: {
      input: { complete },
    },
    optimisticResponse: getOptimisticResponse(complete, todos, user),
  })
}

export default { commit }
