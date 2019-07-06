import React from 'react'

export const Domain = ({domainname='the domain name', quota=0}) => (
    <tr>
      <td data-testid='domainname'>{domainname}</td>
      <td>{quota}</td>
    </tr>
)
