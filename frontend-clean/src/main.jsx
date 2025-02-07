import React from 'react'
import ReactDOM from 'react-dom/client'
import Tienda from './tienda'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-zinc-600 flex justify-center items-center w-screen h-screen overflow-hidden'>
      <Tienda />
    </div>
  </React.StrictMode>
)
