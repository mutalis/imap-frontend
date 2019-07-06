import React from 'react'

export const DomainList = ({children: domains}) => {
  if (domains === undefined) domains = <tr><td>No domains</td></tr>
  return (
    <table>
    <thead>
      <tr>
        <th>Domain Name</th>
        <th>Quota used</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {domains}
    </tbody>
    </table>
  )
}
