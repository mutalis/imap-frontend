import React from 'react'
import { EmailList } from './emailList'
import { DomainBox } from './domainBox'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { useDarkMode } from './useDarkMode'
import { FormControlLabel, Switch } from '@material-ui/core'

import './styles.css'

const themeObject = {
  palette: {
    type: 'dark'
  }
}

const App = () => { 
  const [theme, toggleDarkMode] = useDarkMode(themeObject)

  const themeConfig = createMuiTheme(theme)
  console.log('ThemeConfig:',themeConfig)
  return (
    <ThemeProvider theme={themeConfig}>
      <FormControlLabel
        control={
          <Switch onChange={toggleDarkMode} />
        }
        label="Toggle Theme"
      />
      <DomainBox userId={77} />
      <EmailList domainName='1' />
    </ThemeProvider>
  )
}

export default App
