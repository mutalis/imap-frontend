import React from 'react';

export default ({username='user', quota=0}) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{quota}</td>
    </tr>
  )
}
