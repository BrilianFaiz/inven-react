import React from 'react'
import '../App.css'


export default function BarangForm({setName,name,stok,setStok,warna,setWarna,userEdit,setKondisi,handleClick,batal})  {
  
    return (
      <div className='barangForm'>
        
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
              <br />
              <button type='button' onClick={()=>{setName('');setStok('');setWarna('');setKondisi('')}}>
                kosongkan data</button>
                <br />
              <button type='button'onClick={batal}>
                batal</button>
              
            </form>

          </div>
        
      </div>
    )
  }




