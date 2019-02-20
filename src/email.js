import React from 'react'

export default ({username='user name', quota=0}) => (
    <tr>
      <td data-testid="username">{username}</td>
      <td>{quota}</td>
    </tr>
)
