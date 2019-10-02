import { useState, useEffect } from 'react'
const fetch = require('node-fetch')

export const useFetch = (initialConfigApi={}) => {
  const [configApi, setConfigApi] = useState(initialConfigApi)  
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setData([])
    setError(null)

    const fetchData = ({url = '', resourceConfig = {}}, ignore) => {
      console.log('Url:', url)
      fetch(url, resourceConfig)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        console.log('Fetch Json response:',json)
        if (!ignore) setData(json)
      })
      .catch(errorMsg => {
        console.log('Fetch data errorMsg:',errorMsg)
        if (!ignore) setError(errorMsg)
      })
    }

    if (configApi.url) fetchData(configApi, ignore)
    return () => { ignore = true }
  }, [configApi] )

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  return [data, error, setConfigApi]
}
