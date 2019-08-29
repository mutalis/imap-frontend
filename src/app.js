import React from 'react'
import { EmailList } from './emailList'
import { DomainBox } from './domainBox'

import './styles.css'

const app = () => { 
  return (
    <>
      <DomainBox userId={77} />
      <EmailList domainName='1' />
    </>
  )
}

export default app
