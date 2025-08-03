import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import SideBar from './Components/SideBar/SideBar'
import routes from './routes'
import useLocalTheme from './hooks/useLocalTheme'

function App() {
  let [localTheme, setLocalTheme] = useLocalTheme()

  const changeTheme = () => {
    // Determine the new theme based on the current localTheme
    const newTheme = localTheme === 'light' ? 'dark' : 'light';
    console.log('Attempting to change theme to:', newTheme, 'Setter:', setLocalTheme);

    // Update the state with the new theme
    setLocalTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // add or remove the 'dark' class in documentElement
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    console.log('Current localTheme:', localTheme);
    if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [localTheme])

  let router = useRoutes(routes)

  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-secondary">
      <SideBar theme={localTheme} changeTheme={changeTheme} />
      <div className="p-5 ml-auto w-full h-full sm:w-[calc(100%-16rem)]">
        {router}
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App