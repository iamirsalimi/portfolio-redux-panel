import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import SideBar from './Components/SideBar/SideBar'
import routes from './routes'
function App() {
  let router = useRoutes(routes)

  return (
    <div className="flex flex-col sm:flex-row">
      <SideBar />
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
