import { useState } from "react"

export default function ProductModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)

  if (!open) return null

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setName("")
    setPrice("")
    setStock("")
    setImageFile(null)
    setPreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!imageFile) {
      alert("Gambar wajib diupload!")
      return
    }

    onSubmit({
      id: Date.now(),
      name,
      price: Number(price),
      stock: Number(stock),
      image: preview,
      images: [preview],
      description: "Produk terbaru",
    })

    resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          Tambah Produk
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Produk"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Harga"
            className="w-full border px-4 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Stok"
            className="w-full border px-4 py-2 rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <img
              src={preview}
              className="w-full h-40 object-cover rounded-lg border"
            />
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
