import React, { useState } from "react";
import bgImage from "../assets/bg.jpg"; // pastikan file ada

const App = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    nim: "",
    kelas: "",
    angkatan: "",
    bukti: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bukti") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Terkirim:", formData);
    alert("Form berhasil dikirim!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Form Registrasi
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={formData.nim}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kelas
            </label>
            <select
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Pilih Kelas</option>
              <option value="A">A2</option>
              <option value="B">B2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Angkatan
            </label>
            <select
              name="angkatan"
              value={formData.angkatan}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Pilih Angkatan</option>
              {[...Array(7)].map((_, i) => {
                const year = 2019 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bukti Pembayaran
            </label>
            <input
              type="file"
              name="bukti"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
              className="mt-1 block w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
