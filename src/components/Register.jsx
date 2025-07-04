import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import bgImage from "../assets/bg.jpg";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [previewURL, setPreviewURL] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = (data) => {
    if (!data.bukti[0]) {
      toast.error("Bukti pembayaran wajib diunggah!");
      return;
    }

    toast.success("Form berhasil dikirim!");
    console.log("Data:", data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      if (file.size > maxSize) {
        toast.error("Ukuran file maksimal 2MB!");
        setPreviewURL(null);
        return;
      }

      setPreviewURL(URL.createObjectURL(file));
      setIsPDF(file.type === "application/pdf");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Form Registrasi
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md space-y-4"
        >
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              {...register("nama", { required: "Nama wajib diisi" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.nama && (
              <p className="text-sm text-red-600 mt-1">{errors.nama.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email tidak valid",
                },
              })}
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <input
              {...register("telepon", {
                required: "Telepon wajib diisi",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Nomor telepon tidak valid",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.telepon && (
              <p className="text-sm text-red-600 mt-1">
                {errors.telepon.message}
              </p>
            )}
          </div>

          {/* NIM */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIM
            </label>
            <input
              {...register("nim", {
                required: "NIM wajib diisi",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "NIM harus berupa angka",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.nim && (
              <p className="text-sm text-red-600 mt-1">{errors.nim.message}</p>
            )}
          </div>

          {/* Kelas dan Angkatan */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Kelas
              </label>
              <select
                {...register("kelas", { required: "Pilih kelas" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="">Pilih Kelas</option>
                <option value="A2">A2</option>
                <option value="B2">B2</option>
              </select>
              {errors.kelas && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.kelas.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Angkatan
              </label>
              <select
                {...register("angkatan", { required: "Pilih angkatan" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="">Pilih Angkatan</option>
                {[2022, 2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.angkatan && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.angkatan.message}
                </p>
              )}
            </div>
          </div>

          {/* Bukti Pembayaran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bukti Pembayaran
            </label>
            <label
              htmlFor="bukti"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 transition"
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
                {watch("bukti")?.[0]?.name ||
                  "Klik untuk unggah bukti pembayaran"}
              </span>
              <input
                id="bukti"
                type="file"
                {...register("bukti")}
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {previewURL && (
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
              >
                Lihat Preview {isPDF ? "PDF" : "Gambar"}
              </button>
            )}
          </div>

          {/* Modal Preview */}
          {showPreview && previewURL && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
                {isPDF ? (
                  <iframe
                    src={previewURL}
                    title="Preview PDF"
                    className="w-full h-[80vh] rounded"
                  />
                ) : (
                  <img
                    src={previewURL}
                    alt="Preview Bukti"
                    className="w-full rounded-md object-contain max-h-[80vh]"
                  />
                )}
              </div>
            </div>
          )}

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

export default Register;
