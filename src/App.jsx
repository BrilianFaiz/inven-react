import React, { useEffect, useState } from 'react'
import './App.css'
import { inventoryController } from './inventoryContoller'
import axios from 'axios';


function App() {

  const [users,setUsers] = useState([]);
  const API_URL = "http://localhost:3000/barang";
  
  useEffect(()=>{
    getAllData();
  },[]);
  
  async function getAllData(){
    const response =await axios.get(API_URL);
    setUsers(response.data);
  }

  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ id: null, name: '', stock: '' })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.stock) return

    if (form.id) {
      setItems(inventoryController.updateItem(items, form))
    } else {
      setItems(inventoryController.addItem(items, form))
    }

    setForm({ id: null, name: '', stock: '' })
  }

  const handleEdit = (item) => {
    setForm(item)
    setActiveMenu('input')
  }

  const handleDelete = (id) => {
    setItems(inventoryController.deleteItem(items, id))
  }

  return (
    <div className="container">

      <aside className="sidebar">
        <h2>Inventory App</h2>
        <button onClick={() => setActiveMenu('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveMenu('input')}>Input Barang</button>
      </aside>
      <main className="content">

        {activeMenu === 'dashboard' && (
  <div>
    <h2>Dashboard</h2>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {/* Hapus items.map, ganti pakai users.map di sini */}
        {users.map((user) => (
          <tr key={user.id}>
            {/* Pastikan .name dan .stock sesuai dengan key yang ada di file barang.json kamu */}
            <td>{user.name}</td> 
            <td>{user.stock}</td>
            <td>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {activeMenu === 'input' && (
          <div>
            <h2>{form.id ? 'Edit Barang' : 'Input Barang'}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nama Barang"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="number"
                placeholder="Stok"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />

              <button type="submit">
                {form.id ? 'Update' : 'Submit'}
              </button>
            </form>

          </div>
        )}

      </main>

    </div>
  )
}

export default App