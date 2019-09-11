import { useState, useEffect } from 'react'
const fetch = require('node-fetch')

export const useFetch = (configApi={}) => {
  const [config, setConfig] = useState(configApi)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let ignore = false
    setData([])
    setError(null)

    const fetchData = ({url = '', resource = {}}, ignore) => {
      console.log('Url:', url)
      fetch(url, resource)
      .then(checkStatus)
      .then(response => response.json())
      .then(json => {
        console.log('Json response:',json)
        if (!ignore) setData(json)
      })
      .catch(errorMsg => {
        console.log('Fetch data errorMsg:',errorMsg)
        if (!ignore) setError(errorMsg)
      })
    }

    if (config.url) fetchData(config, ignore)
    return () => { ignore = true }
  }, [config] )

  const checkStatus = response => {
    if (response.status === 200) return Promise.resolve(response)
    else return Promise.reject(new Error(response.statusText))
  }

  return [{data, error}, setConfig]
}


// const fetchData = async(config, ignore) => {
//   try {
//     console.log('Ass0:',config.url)
//     const response = await fetch(config.url,config.resource)
//     const json = await response.json()
//     console.log('Json response:',json)
//     if (!ignore) setData(json)
//     // console.log('BB:',data)
//   } catch (errorMsg) {
//     console.log('Fetch data errorMsg:',errorMsg)
//     if (!ignore) setError(errorMsg)
//   }
// }
// if (config.url) fetchData(config, ignore)
