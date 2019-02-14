import React from 'react';

export default({children: emails}) => {
  if (emails === undefined) emails = <tr><td>No emails</td></tr>
  return (
    <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Quota Used</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {emails}
    </tbody>
    </table>
  )
}
