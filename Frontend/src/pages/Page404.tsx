import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/lightswind/button";

export default function NotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown <= 0) { navigate("/"); return; }
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">

            {/* ── 404 Number ── */}
            <h1 className="text-[96px] sm:text-[140px] font-black text-slate-200 leading-none tracking-tighter select-none">
                404
            </h1>

            {/* ── Icon ── */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center -mt-4 mb-6">
                <img src="/shopping-cart.png" alt="cart" className="w-full h-full" />
            </div>

            {/* ── Heading ── */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 text-center">
                Page Not Found
            </h2>

            {/* ── Description ── */}
            <p className="text-slate-500 text-sm sm:text-base text-center max-w-sm leading-relaxed mb-8">
                The page you're looking for doesn't exist, was moved, or is temporarily unavailable.
            </p>

            {/* ── Actions ── */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center mb-10">
                <Button
                    variant="github"
                    onClick={() => navigate("/")}
                    className="cursor-pointer"
                //   className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm transition-colors duration-200 cursor-pointer"
                >
                    Go Home
                </Button>
                <Button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                //   className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors duration-200 cursor-pointer"
                >
                    ← Go Back
                </Button>
            </div>

            {/* ── Countdown ── */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center font-mono font-bold text-slate-500 text-[10px]">
                    {countdown}
                </div>
                <span>Redirecting to home...</span>
            </div>

        </div>
    );
}