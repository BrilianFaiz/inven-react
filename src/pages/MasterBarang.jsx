import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import BarangTable from '../components/BarangTable'
import BarangForm from '../components/BarangForm'


function MasterBarang() {
    
  const [users, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState('dashboard')
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

  console.log(activeMenu);
    return (
  <div>
    <Sidebar setActiveMenu={setActiveMenu} />

    {activeMenu === 'dashboard' && (
      <BarangTable
        users={users}
        editData={editData}
        deletData={deletData}
      />
    )}

    {activeMenu === 'input' && (
      <BarangForm
        name={name}
        setName={setName}
        stok={stok}
        setStok={setStok}
        warna={warna}
        setWarna={setWarna}
        kondisi={kondisi}
        setKondisi={setKondisi}
        userEdit={userEdit}
        handleClick={handleClick}
        batal={batal}
      />
    )}
  </div>
)
}

export default MasterBarang