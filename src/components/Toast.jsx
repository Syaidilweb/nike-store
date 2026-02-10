import { useEffect } from "react"
import { CheckCircle, X, AlertCircle, Info, ShoppingBag } from "lucide-react"

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const configs = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Success",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    error: {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Error",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500"
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      title: "Info",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500"
    },
    cart: {
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "Added to Cart",
      iconBg: "bg-black/10",
      iconColor: "text-black"
    }
  }

  const config = configs[type]

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideInFromBottom">
      <div className="bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[360px] max-w-md">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`${config.iconBg} ${config.iconColor} p-2.5 rounded-xl flex-shrink-0 animate-scaleIn`}>
            {config.icon}
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-0.5">
            <h4 className="font-semibold text-sm text-gray-900 mb-1">
              {config.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black rounded-full animate-progress"
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-delay: 0.1s;
          animation-fill-mode: backwards;
        }
        
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  )
}