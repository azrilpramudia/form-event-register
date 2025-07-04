import { useState } from "react";
import bgImage from "../assets/bg.jpg";
import toast from "react-hot-toast";

const App = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    nim: "",
    kelas: "",
    angkatan: "",
    bukti: null,
    previewURL: null,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [fileError] = useState("");

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
          {/* Nama Lengkap */}
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

          {/* Email */}
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

          {/* Nomor Telepon */}
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

          {/* NIM */}
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

          <div className="flex gap-4">
            {/* Kelas */}
            <div className="w-1/2">
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

            {/* Angkatan */}
            <div className="w-1/2">
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
                {[...Array(3)].map((_, i) => {
                  const year = 2022 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bukti Pembayaran
            </label>

            <label
              htmlFor="bukti"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 transition"
              onClick={() => {
                if (formData.previewURL) setShowPreview(true);
              }}
            >
              <svg
                className="w-6 h-6 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9m-3-2h4m0 0v4"
                />
              </svg>
              <span>
                {formData.bukti
                  ? formData.bukti.name
                  : "Klik untuk unggah bukti pembayaran"}
              </span>
              <input
                id="bukti"
                type="file"
                name="bukti"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const maxSize = 2 * 1024 * 1024; // 2MB

                  if (file) {
                    if (file.size > maxSize) {
                      toast.error("Ukuran file maksimal 2MB!");
                      setFormData({
                        ...formData,
                        bukti: null,
                        previewURL: null,
                      });
                      e.target.value = "";
                      return;
                    }

                    const fileURL = URL.createObjectURL(file);
                    setFormData({
                      ...formData,
                      bukti: file,
                      previewURL: file.type.startsWith("image")
                        ? fileURL
                        : null,
                    });
                  }
                }}
                required
                className="hidden"
              />
            </label>
            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}

            {/* Modal Preview Gambar */}
            {showPreview && formData.previewURL && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                  >
                    &times;
                  </button>
                  <img
                    src={formData.previewURL}
                    alt="Preview Bukti"
                    className="w-full rounded-md object-contain max-h-[80vh]"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
