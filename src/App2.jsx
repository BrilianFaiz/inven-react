import React, { useEffect, useState } from 'react'
import './App.css'
import { inventoryController } from './inventoryContoller'
import axios from 'axios';


function App() {

  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [users, setUsers] = useState([]);
  const [name,setName] = useState('');
  const [stok,setStok] = useState('');
  const [kondisi,setKondisi] = useState('');
  const [warna,setWarna] = useState('');
  const [userEdit,setUserEdit] = useState('');
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
      await axios.post(API_URL, { nama: name, stok: stok, color: warna, kondisi: kondisi}); 
      
      // Kosongkan inputan setelah berhasil
      setName('');
      setStok('');
      setWarna('');
      setKondisi(''); // Gunakan huruf besar 'S' sesuai deklarasi useState
      
      // Ambil data terbaru untuk me-refresh tabel
      getAllData(); 
      setActiveMenu('dashboard'); // Kembali ke tampilan dashboard setelah simpan
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
    
    getAllData();
  }

  //function menampilkan edit data
  function editData(data){
    setUserEdit(data);
    setName(data.nama);
    setStok(data.stok);
    setWarna(data.color);
    setKondisi(data.kondisi);
    setActiveMenu('input');
  }

  //fungsi update data
  //fungsi update data
  async function updateData(e){
    e.preventDefault(); // Tetap pertahankan ini ya!
    if (!name || !stok){
      alert("Nama dan Stok harus diisi!");
      return;
    }
    try {
      await axios.put(API_URL+"/"+userEdit.id, { nama: name, stok: stok, color: warna,kondisi: kondisi }); 
      
      // Kosongkan inputan setelah berhasil
      setName('');
      setStok(''); 
      setWarna('');
      setKondisi('');
      setUserEdit(''); // <--- TAMBAHKAN BARIS INI
      
      // Ambil data terbaru untuk me-refresh tabel
      getAllData(); 
      setActiveMenu('dashboard'); // Kembali ke tampilan dashboard
    } catch (error) {
      console.error("Gagal mengupdate data:", error);
    }
  }

  //fungsi handle clicker di submit, biar bisa satu tombol untuk edit dan post
  async function handleClick(e){
    e.preventDefault(); 
      if(userEdit){
        await updateData(e);
      }else{
        await addData(e);
      }

  }
  function batal(){
    setName('');
    setStok(''); 
    setWarna('');
    setUserEdit('');
    setKondisi('');
    setActiveMenu('dashboard');
  }
  async function deletData(id) {
    const response = await axios.delete(API_URL+"/"+id);
    getAllData();
  }

  
  

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

  // const handleEdit = (item) => {
  //   setForm(item)
  //   setActiveMenu('input')
  // }

  

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
                  <th>Warna</th>
                  <th>Kondisi</th>
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
                    <td>{user.color}</td>
                    <td>{user.kondisi}</td>
                    <td>
                      <button onClick={() => editData(user)}>Edit</button>
                      <button onClick={() => deletData(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* tombol fitur untuk ekspor ke excel */}
            <button>eksport json ke excel</button>
          </div>
        )}
        {activeMenu === 'input' && (
          <div>
           <h2>{userEdit ? 'Edit Barang' : 'Input Barang'}</h2>

            <form onSubmit={handleClick}>
              <input
                type="text"
                id='in nama barang'
                placeholder="Nama Barang"
                value={name} // Gunakan state name
                onChange={(e) => setName(e.target.value)} // Langsung update string name-nya
              />

              <input
                type="text"
                id='in stok'
                placeholder="Stok"
                value={stok} // Gunakan state stok
                onChange={(e) => setStok(e.target.value)} // Langsung update string stok-nya
              />

              <input type="text"
              placeholder='Warna'
              id='in warna' 
              value={warna} 
              onChange={(e)=>setWarna(e.target.value)} />

              <label >
                <input type="radio"
                placeholder='Kondisi'
                id='in kondisi' 
                value="Good" 
                onChange={(e)=>setKondisi(e.target.value)} />
              Good</label>

              <label >
                <input type="radio"
                placeholder='Kondisi'
                id='in kondisi' 
                value="Bad" 
                onChange={(e)=>setKondisi(e.target.value)} />
              Bad</label>
              
              <button type="submit">
                {userEdit?'edit':'tambah data'}  
              </button>
              <button type='button' onClick={()=>{setName('');setStok('');setWarna('');setKondisi('')}}>
                kosongkan data</button>
              <button type='button'onClick={batal}>
                batal</button>
              
            </form>

          </div>
        )}

      </main>

    </div>
  )
}

export default App