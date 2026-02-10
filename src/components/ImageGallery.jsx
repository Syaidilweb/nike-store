import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function ImageGallery({ images, productName, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:bg-white/10 p-3 rounded-full transition z-10"
        aria-label="Close gallery"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Product Name */}
      <div className="absolute top-6 left-6 text-white z-10">
        <h3 className="text-2xl font-bold">{productName}</h3>
        <p className="text-gray-400 text-sm mt-1">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Main Content */}
      <div
        className="relative w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <div className="relative aspect-square bg-white/5 rounded-3xl overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain animate-imageSlide"
            key={currentIndex}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition text-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-6 flex gap-3 justify-center overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  idx === currentIndex
                    ? "ring-4 ring-white scale-110"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes imageSlide {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-imageSlide {
          animation: imageSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}