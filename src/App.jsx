import React, { useEffect, useState } from 'react'
import './App.css'
import { inventoryController } from './inventoryContoller'
import axios from 'axios';


function App() {

  const [users, setUsers] = useState([]);
  const [name,setName] = useState('');
  const [stok,setStok] = useState('');
  const API_URL = "http://localhost:3000/barang";

  useEffect(() => {
    getAllData();
  }, []);

  //Display Data
  async function getAllData() {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  }

  //tambah data
  async function addData(e){
    e.preventDefault();
    if (!name || !stok){
      alert("Nama dan Stok harus diisi!");
      return;
    }
    try {
      // Pastikan property name yang dikirim sesuai dengan backend/json server
      // Json servermu pakai "nama" dan "stok"
      await axios.post(API_URL, { nama: name, stok: stok }); 
      
      // Kosongkan inputan setelah berhasil
      setName('');
      setStok(''); // Gunakan huruf besar 'S' sesuai deklarasi useState
      
      // Ambil data terbaru untuk me-refresh tabel
      getAllData(); 
      setActiveMenu('dashboard'); // Kembali ke tampilan dashboard setelah simpan
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
    
    getAllData();
  }

  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ id: null, name: '', stock: '' })

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (!form.name || !form.stock) return

  //   if (form.id) {
  //     setItems(inventoryController.updateItem(items, form))
  //   } else {
  //     setItems(inventoryController.addItem(items, form))
  //   }

  //   setForm({ id: null, name: '', stock: '' })
  // }

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
                    <td>{user.nama}</td>
                    <td>{user.stok}</td>
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

            <form onSubmit={addData}>
              <input
                type="text"
                placeholder="Nama Barang"
                value={name} // Gunakan state name
                onChange={(e) => setName(e.target.value)} // Langsung update string name-nya
              />

              <input
                type="text"
                placeholder="Stok"
                value={stok} // Gunakan state stok
                onChange={(e) => setStok(e.target.value)} // Langsung update string stok-nya
              />

              <button type="submit">
                simpan
              </button>
            </form>

          </div>
        )}

      </main>

    </div>
  )
}

export default App