import React, { useState, useEffect } from 'react'
import { Domain } from './domain'
import { DomainForm } from './domainForm'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useFetch } from './useFetch'
import { domainValidationRules } from './domainValidationRules'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { EmailList } from './emailList'

const fetch = require('node-fetch')

export const DomainList = ({userId=''}={}) => {
  const [error, setSearchError] = useState({})
  const initialDomain = {id: null, domainName: '', emailQuota: 0}
  const [domain, setDomain] = useState(initialDomain)
  const [domainAction, setDomainAction] = useState('')
  const [query, setQuery] = useState('')
  const [fetchData, fetchError, setConfigApi] = useFetch({})
  const [domains, setDomains] = useState([])

  const validate = domainValidationRules('domainsearch')

  useEffect(() => {
    setDomains(fetchData)
  }, [fetchData] )

  useEffect(() => {
    let url = ''
    query==='' ? url = `https://my-json-server.typicode.com/mutalis/imap-frontend/users/${userId}/domains`
    : url = `https://my-json-server.typicode.com/mutalis/imap-frontend/users/${userId}/domains?domainName=${query}`

    setConfigApi({url, resourceConfig: {}})
  }, [query, userId, setConfigApi] )

  const modifyDomainUrl = domainId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/${domainId}`
    return R.partial(fetch, [url])
  }

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  const deleteDomain = domainId => {
    const config = {
      method: 'DELETE',
    }
    modifyDomainUrl(domainId)(config)
    .then(checkStatus)
    .then(response => {
      console.log(response.text())
      if (response.status === 200) setDomains(domains.filter(domain => domain.id !== domainId))
    })
    .catch(error => console.log('Delete domain error:',error))
  }

  const initializeDomain = (id, domainName, emailQuota) => {
    setDomain({id, domainName, emailQuota})
    setDomainAction('update')
  }

  const domainComponents = () => domains.map(({id, domainName, emailQuota}) => {
    const domainProps = {
      key: id,
      id,
      domainName,
      emailQuota,
      initializeDomain,
      deleteDomain,
    }
    return <Domain {...domainProps} />
  })

  const domainFormProps = {
    initialDomain: domain,
    domains,
    setDomains,
    createDomain: domainAction === 'create' ? true: false,
    setDomainAction,
  }

  return (
    
    <div className="container">
      <Router>
      { fetchError && <Typography align="center" variant="h7">Network connection failure</Typography>}
      <TextField
        type="text" 
        autoComplete="off"
        name="query"
        onChange={e => {setQuery(e.target.value); setSearchError(validate({search: query}))} }
        label={error.search ? error.search : 'Search by Domain Name'}
        fullWidth
        value={query}
        error={Boolean(error.search)}
      />
      <Typography align="center" variant="h5">Domain List</Typography>
      { (domainAction !== '') ? ( <DomainForm {...domainFormProps} />) :
        ( <AddCircleIcon style={{ color: 'green', float: 'right' }} onClick={() => {setDomain(initialDomain);setDomainAction('create')}} />)
      }
      
        {domainComponents()}
        <Switch>
        <Route path="/test.org">
          <EmailList domainId='2' />
        </Route>
        </Switch>
      </Router>
      
    </div>
  )
}
