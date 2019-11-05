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
import { Environment } from "relay-runtime"

import { Todo_todo } from "../__relay_artifacts__/Todo_todo.graphql"
import { Todo_viewer } from "../__relay_artifacts__/Todo_viewer.graphql"
import { ChangeTodoStatusMutation } from "../__relay_artifacts__/ChangeTodoStatusMutation.graphql"

const mutation = graphql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
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
  todo: Todo_todo,
  user: Todo_viewer,
) {
  const userPayload: { id: string; completedCount: number } = {
    id: user.id,
    completedCount: 0,
  }
  if (user.completedCount != null) {
    userPayload.completedCount = complete
      ? user.completedCount + 1
      : user.completedCount - 1
  }
  return {
    changeTodoStatus: {
      todo: {
        complete: complete,
        id: todo.id,
      },
      viewer: userPayload,
    },
  }
}

function commit(
  environment: Environment,
  complete: boolean,
  todo: Todo_todo,
  user: Todo_viewer,
) {
  return commitMutation<ChangeTodoStatusMutation>(environment, {
    mutation,
    variables: {
      input: { complete, id: todo.id },
    },
    optimisticResponse: getOptimisticResponse(complete, todo, user),
  })
}

export default { commit }
