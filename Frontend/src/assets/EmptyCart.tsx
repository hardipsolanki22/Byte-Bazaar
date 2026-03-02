import { useNavigate } from "react-router-dom"

const EmptyCartSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" fill="none" className="w-full h-full">
        {/* Background circle */}
        <circle cx="200" cy="160" r="130" fill="#F0F4FF" opacity="0.6" />

        {/* Cart body */}
        <rect x="120" y="130" width="160" height="110" rx="16" fill="#E2E8FF" stroke="#A5B4FC" strokeWidth="2.5" />

        {/* Cart top opening */}
        <path d="M130 130 Q200 100 270 130" stroke="#A5B4FC" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Cart handle */}
        <path d="M155 130 L140 85 L105 75" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="102" cy="73" r="6" fill="#6366F1" />

        {/* Wheels */}
        <circle cx="155" cy="248" r="14" fill="white" stroke="#A5B4FC" strokeWidth="2.5" />
        <circle cx="155" cy="248" r="6" fill="#A5B4FC" />
        <circle cx="245" cy="248" r="14" fill="white" stroke="#A5B4FC" strokeWidth="2.5" />
        <circle cx="245" cy="248" r="6" fill="#A5B4FC" />

        {/* Cart bottom curve */}
        <path d="M120 220 Q200 240 280 220" stroke="#A5B4FC" strokeWidth="2" fill="none" />

        {/* Sad face inside cart */}
        <circle cx="200" cy="175" r="28" fill="white" stroke="#C7D2FE" strokeWidth="2" />
        <circle cx="191" cy="169" r="3" fill="#6366F1" />
        <circle cx="209" cy="169" r="3" fill="#6366F1" />
        <path d="M191 184 Q200 178 209 184" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Floating sparkles */}
        <g opacity="0.7">
            <path d="M320 80 L323 88 L331 91 L323 94 L320 102 L317 94 L309 91 L317 88 Z" fill="#A5B4FC" />
            <path d="M75 100 L77 105 L82 107 L77 109 L75 114 L73 109 L68 107 L73 105 Z" fill="#6366F1" opacity="0.5" />
            <path d="M340 180 L342 184 L346 186 L342 188 L340 192 L338 188 L334 186 L338 184 Z" fill="#C7D2FE" />
            <circle cx="88" cy="190" r="4" fill="#A5B4FC" opacity="0.6" />
            <circle cx="310" cy="130" r="3" fill="#6366F1" opacity="0.4" />
            <circle cx="330" cy="220" r="5" fill="#C7D2FE" opacity="0.7" />
        </g>

        {/* Dashed lines */}
        <line x1="155" y1="160" x2="175" y2="160" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="225" y1="160" x2="245" y2="160" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="155" y1="200" x2="245" y2="200" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
)

const EmptyCart = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full flex items-center justify-center text-center min-h-screen px-4">
            <div className="flex flex-col items-center gap-4 max-w-sm w-full">

                {/* SVG Illustration */}
                <div className="w-48 h-40 sm:w-64 sm:h-52 md:w-72 md:h-60">
                    <EmptyCartSVG />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700">
                        Your cart is empty
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400">
                        Looks like you haven't added anything yet.
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all duration-150 text-white text-sm sm:text-base font-medium rounded-full shadow-md shadow-indigo-200"
                >
                    Start Shopping
                </button>
            </div>
        </div>
    )
}

export default EmptyCart