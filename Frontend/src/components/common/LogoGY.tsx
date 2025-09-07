import React, { useEffect, useRef } from 'react'

// type Props = {}

const LogoGY: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;
            const particle = document.createElement("div");
            particle.className =
                "absolute w-1 h-1 rounded-full bg-orange-500 animate-particle";
            particle.style.left =
                Math.random() * containerRef.current.offsetWidth + "px";
            particle.style.top = containerRef.current.offsetHeight + "px";
            particle.style.animationDelay = Math.random() * 2 + "s";
            containerRef.current.appendChild(particle);
            setTimeout(() => particle.remove(), 4000);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-center min-h-full bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden p-4 rounded-3xl"
        >
            {/* Decorative border */}
            <div className="absolute -inset-5 rounded-xl border-2 border-transparent animate-borderPulse bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 [background-clip:border-box] z-0">
                <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800" />
            </div>

            {/* Background floating elements */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-orange-600/10 to-orange-300/10 animate-float top-1/5 left-[10%]" />
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-orange-600/10 to-orange-300/10 animate-float delay-2000 bottom-[30%] left-[20%]" />
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600/10 to-orange-300/10 animate-float delay-4000 top-[70%] right-[15%]" />

            {/* Ornaments */}
            <div className="absolute top-3 left-3 text-orange-500 text-2xl animate-spin-slow">❋</div>
            <div className="absolute top-3 right-3 text-orange-500 text-2xl animate-spin-slow-reverse">❋</div>
            <div className="absolute bottom-3 left-3 text-orange-500 text-2xl animate-spin-slow">❋</div>
            <div className="absolute bottom-3 right-3 text-orange-500 text-2xl animate-spin-slow-reverse">❋</div>

            {/* Main Content */}
            <div className="relative text-center z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-widest bg-gradient-to-r from-orange-600 via-orange-400 to-orange-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradientShift animate-textGlow [text-shadow:0_0_30px_rgba(255,107,53,0.5)] transition-transform hover:scale-105">
                    GAUDIYA
                    <br />
                    YUBOSHAKTI
                </h1>
                <p className="text-white text-sm md:text-lg tracking-[0.3em] mt-4 opacity-90 animate-fadeInOut">
                    গৌড়ীয় যুবশক্তি
                </p>
            </div>

            {/* Extra Styles for animations */}
            <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes textGlow {
          from { text-shadow: 0 0 20px rgba(255,107,53,0.3); }
          to { text-shadow: 0 0 40px rgba(255,107,53,0.8), 0 0 60px rgba(255,179,71,0.4); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg);} to { transform: rotate(0deg);} }
        @keyframes particle {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        .animate-gradientShift { animation: gradientShift 3s ease-in-out infinite; }
        .animate-textGlow { animation: textGlow 2s ease-in-out infinite alternate; }
        .animate-fadeInOut { animation: fadeInOut 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-borderPulse { animation: borderPulse 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 8s linear infinite; }
        .animate-particle { animation: particle 4s linear infinite; }
      `}</style>
        </div>
    );
}

export default LogoGY