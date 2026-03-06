// components/AppLoader.tsx
export default function AppLoader() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
            <img src="/byteBazaar.png" alt="logo" className="w-20 h-20 animate-pulse" />
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}