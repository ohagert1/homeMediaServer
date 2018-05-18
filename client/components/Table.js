import React from 'react'
import { Link } from 'react-router-dom'
import { Table as BsTable } from 'react-bootstrap'

const Table = props => {
  return (
    <BsTable>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
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
              <td>{item.description}</td>
            </tr>
          )
        })}
      </tbody>
    </BsTable>
  )
}

export default Table
