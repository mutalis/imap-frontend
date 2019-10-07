import React, { useState, useEffect } from 'react'
import { DomainList } from './domainList'
import { Domain } from './domain'

export const DomainBox = ({userId=99}) => {
  const [domains, setDomains] = useState([])

  useEffect(() => {
    getDomains(userId)
  }, [userId] )

  const getDomains = userId => {
    const domains = [{id: 1, domainname: 'domain name 1', quota: 10}, {id: 2, domainname: 'domain name 2', quota: 20}]
    setDomains(domains)
  }

  const domainComponents = () => domains.map(domain => <Domain key={domain.id} domainname={domain.domainname} quota={domain.quota} />)
  return (
    <DomainList>
      {domainComponents()}
    </DomainList>
  )
}
