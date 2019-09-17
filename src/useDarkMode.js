import { useState } from 'react'

export const useDarkMode = (themeObject={
  palette: {
    type: 'dark'
  }
}) => {
  const [theme, setTheme] = useState(themeObject)

  const { palette: {type}} = theme

  const toggleDarkMode = () => {
    const newTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(newTheme)
  }
  return [theme, toggleDarkMode]
}
