import React from 'react'
import { EmailBox } from './emailBox'
import { DomainBox } from './domainBox'

const app = () => { 
  return (
    <>
      <DomainBox userId={77} />
      <EmailBox domainName='1' />
    </>
  )
}

export default app
