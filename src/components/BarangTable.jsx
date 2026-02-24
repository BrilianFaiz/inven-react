import React from 'react'
import '../App.css'

export default function BarangTable({
  users,editData,deletData
}) {

    return (
    <div className='tabel barang'>
       
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
        </div>
  )
}
