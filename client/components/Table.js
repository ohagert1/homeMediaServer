import React from 'react'
import { Link } from 'react-router-dom'

const Table = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {props.media.map(item => {
          return (
            <tr key={item.id}>
              <td>
                <Link
                  to={`${props.mediaPath}/${item.id}`}
                  onClick={() => props.clickHandle(item.id)}
                >
                  {item.title}
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
