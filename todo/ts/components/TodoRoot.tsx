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

import React from "react"
import { useLazyLoadQuery, graphql } from "react-relay/hooks"

import { TodoRootQuery } from "../__relay_artifacts__/TodoRootQuery.graphql"

import TodoApp from "./TodoApp"

const TodoRoot = () => {
  const { viewer } = useLazyLoadQuery<TodoRootQuery>(
    graphql`
      query TodoRootQuery {
        viewer {
          ...TodoApp_viewer
        }
      }
    `,
    {},
  )

  return <TodoApp viewer={viewer!} />
}

const TodoRootWrapper = () => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <TodoRoot />
    </React.Suspense>
  )
}

export default TodoRootWrapper
