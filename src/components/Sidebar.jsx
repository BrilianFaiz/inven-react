import React from 'react'
import '../App.css'


export default function ({setActiveMenu}) {
  
  return (
        <aside className="sidebar">
        <h2>Inventory App</h2>
        <button onClick={() => setActiveMenu('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveMenu('input')}>Input Barang</button>
      </aside>
    
  )
}
