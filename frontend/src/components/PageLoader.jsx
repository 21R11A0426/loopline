import { SwitchCamera } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/themeSelect'

const PageLoader = () => {
  const {theme}=useThemeStore;
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
      <SwitchCamera className='animate-spin size-20 text-primary'/>
    </div>
  )
}

export default PageLoader
