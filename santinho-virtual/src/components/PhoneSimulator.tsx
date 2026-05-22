import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  BookOpen, 
  Image as ImageIcon, 
  Sparkles, 
  ChevronLeft, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Wifi, 
  Battery, 
  Compass, 
  Calendar,
  Sparkle
} from "lucide-react";
import { SantinhoConfig, DEFAULT_SANTINHO } from "../types";

interface PhoneSimulatorProps {
  config: SantinhoConfig;
  activeScreen?: string; // Optional external override for live previewing
  onScreenChange?: (screen: string) => void;
}

// Helper to convert Google Drive share links to direct video streaming URLs
function getDirectVideoUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.includes("drive.google.com")) {
    const id = getDriveId(url);
    if (id) {
      return `https://docs.google.com/uc?export=download&id=${id}`;
    }
  }
  return url;
}

// Extract Google Drive ID
function getDriveId(url?: string): string | null {
  if (!url) return null;
  const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFile && matchFile[1]) {
    return matchFile[1];
  }
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return matchId[1];
  }
  return null;
}

export default function PhoneSimulator({ 
  config = DEFAULT_SANTINHO, 
  activeScreen: externalScreen,
  onScreenChange 
}: PhoneSimulatorProps) {
  // Navigation states: 'splash' | 'home' | 'biografia' | 'salmos' | 'galeria' | 'terco'
  const [internalScreen, setInternalScreen] = useState<string>("splash");
  const [muteSound, setMuteSound] = useState<boolean>(true);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [activeBead, setActiveBead] = useState<number>(0); // 0 to 11 (0 is Pai Nosso, 1-10 are Ave Marias, 11 is conclusion/Cross)
  const [timeStr, setTimeStr] = useState<string>("14:08");
  const [videoError, setVideoError] = useState<boolean>(false);

  // Reset video error on source url change
  useEffect(() => {
    setVideoError(false);
  }, [config.videoUrl]);

  const currentScreen = externalScreen || internalScreen;

  const setScreen = (scr: string) => {
    if (onScreenChange) {
      onScreenChange(scr);
    } else {
      setInternalScreen(scr);
    }
  };

  // Update clock time like a real phone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Automatic splash transition in demo if not controlled externally
  useEffect(() => {
    if (currentScreen === "splash" && !externalScreen) {
      const timer = setTimeout(() => {
        setScreen("home");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, externalScreen]);

  // List of prayers for the interactive Rosary (Terço)
  const tercoPrayers = [
    {
      title: "Oração Inicial - Pai Nosso",
      beadName: "Pai Nosso",
      text: "Pai Nosso, que estais no céu, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.",
      meditation: "Dedicamos esta dezena à memória eterna de Walker Cabral, para que sua alma repouse em luz e paz."
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      title: `Ave Maria - Ave ${i + 1}/10`,
      beadName: `Ave Maria ${i + 1}`,
      text: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",
      meditation: [
        "Lembramos com gratidão da sua presença amiga e acolhedora.",
        "Agradecemos pelos conselhos sábios e ensinamentos partilhados.",
        "Pelos momentos de alegria sincera nos almoços de domingo.",
        "Pela dedicação inabalável com que cuidou de toda a família.",
        "Pela honra e exemplo deixados através do seu serviço militar.",
        "Pelas risadas descontraídas nas tardes calmas de pescaria.",
        "Pela fé que cultivou e que agora fortalece nossos corações.",
        "Para que os anjos o recebam cantando hinos de glória celeste.",
        "Que a saudade que sentimos hoje se transforme em doce esperança.",
        "Pelo conforto espiritual de sua esposa, filhos, netos e amigos."
      ][i]
    })),
    {
      title: "Encerramento - Glória ao Pai & Salve Rainha",
      beadName: "Cruz da Salvação",
      text: "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre. Amém. Infinito Criador, dai-lhe o descanso eterno, e a luz perpétua o ilumine. Descanse em paz. Amém.",
      meditation: "O amor não termina com a partida física; ele se eterniza na memória do coração."
    }
  ];

  return (
    <div id="phone-container" className="relative mx-auto w-[335px] h-[670px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
      {/* Speaker and Camera Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
        <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
      </div>

      {/* Internal Phone Workspace */}
      <div className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col bg-slate-950 text-slate-800 font-sans select-none shadow-inner">
        
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 pt-1 flex justify-between items-center text-slate-800 z-40 text-xs font-medium bg-transparent pointer-events-none">
          <span>{timeStr}</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px] font-semibold opacity-95">5G</span>
            <Battery className="w-4 h-4 rotate-0" />
          </div>
        </div>

        {/* Ambient background matching Image 01 color palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E2D4F0] via-[#C9D6FF] to-[#D5E0F2] z-0 pointer-events-none opacity-100 transition-all duration-700"></div>

        {/* Dynamic Screens */}
        <div className="relative flex-1 flex flex-col z-10 pt-10 pb-4 h-full overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* SPLASH SCREEN (Image 01) */}
            {currentScreen === "splash" && (
              <motion.div
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6 h-full text-center"
              >
                {/* Solitary Header Space */}
                <div></div>

                {/* Angel Minimalist Logo */}
                <div className="relative my-auto flex flex-col items-center justify-center">
                  {/* Decorative glowing background */}
                  <div className="absolute w-44 h-44 bg-white/40 blur-2xl rounded-full -z-10 animate-pulse"></div>
                  
                  {/* Rays of light (Image 01) */}
                  <div className="absolute inset-0 w-56 h-56 -m-6 pointer-events-none animate-[spin_40s_linear_infinite]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-white/40 origin-top"
                        style={{
                          transform: `translate(-50%, -100%) rotate(${i * 30}deg) translate(0, -28px)`
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Angel SVG lineart */}
                  <div className="relative z-10 scale-105">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 text-indigo-950/80" fill="none" stroke="currentColor" strokeWidth="1.2">
                      {/* Halo */}
                      <ellipse cx="50" cy="18" rx="15" ry="4" stroke="#cca250" strokeWidth="1.8" className="animate-pulse" />
                      {/* Head */}
                      <circle cx="50" cy="29" r="8" stroke="currentColor" strokeWidth="1.2" fill="#fff" />
                      <path d="M44,25 C45,21 55,21 56,25 C58,30 42,30 44,25" fill="#e0cb9d" stroke="currentColor" strokeWidth="1" />
                      {/* Hands praying */}
                      <path d="M50,40 L47,48 L50,45 L53,48 Z" fill="currentColor" stroke="currentColor" />
                      {/* Body/Dress */}
                      <path d="M50,37 C45,43 41,52 41,68 L59,68 C59,52 55,43 50,37 Z" fill="#fff" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="50" y1="37" x2="50" y2="68" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                      {/* Left Wing */}
                      <path d="M41,40 C28,32 16,42 21,55 C16,52 12,56 14,64 C10,61 7,67 15,70 C24,74 34,70 41,62" fill="rgba(255,255,255,0.85)" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M37,45 C28,39 21,47 24,56 C20,54 17,57 19,63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                      {/* Right Wing */}
                      <path d="M59,40 C72,32 84,42 79,55 C84,52 88,56 86,64 C90,61 93,67 85,70 C76,74 66,70 59,62" fill="rgba(255,255,255,0.85)" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M63,45 C72,39 79,47 76,56 C80,54 83,57 81,63" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                    </svg>
                  </div>

                  {/* Brand Logo Header */}
                  <div className="mt-8 flex flex-col items-center">
                    {/* Tiny purple dove */}
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-violet-700/90 -mb-2 -ml-16 rotate-[-10deg]"
                    >
                      <svg viewBox="0 0 50 50" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M35,16 C29,18 26,14 20,19 C16,22 12,21 7,25 C5,26 3,29 5,31 C7,33 12,30 15,28 C12,32 11,37 14,39 C16,40 19,38 21,35 C20,39 22,42 25,42 C27,42 26,35 27,33 C30,33 33,35 35,33 C36,32 33,29 30,27 C32,25 36,23 36,20 C36,18 36,17 35,16" />
                        <circle cx="9.5" cy="24" r="0.8" fill="currentColor" />
                      </svg>
                    </motion.div>

                    <h1 className="text-3xl font-light tracking-[0.2em] text-[#332c52] font-sans">
                      SANTINHO
                    </h1>
                    <div className="w-32 h-[1px] bg-slate-900/40 my-1"></div>
                    <p className="text-sm tracking-[0.4em] text-[#42396b] font-sans font-medium uppercase">
                      VIRTUAL
                    </p>
                  </div>
                </div>

                {/* Footer loading text */}
                <span className="text-xs text-[#52447d]/75 font-medium tracking-wide animate-pulse">
                  Eternizando a memória de quem amamos...
                </span>
              </motion.div>
            )}

            {/* HOME SCREEN - THE MEMORIAL COVER (Image 02) */}
            {currentScreen === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-between py-6 px-5 h-full text-center"
              >
                {/* Header Call Out */}
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-script text-indigo-950 font-normal drop-shadow-sm">
                    Em memória
                  </h2>
                </div>

                {/* Profile Portrait (Styled frame mimicking Image 02) */}
                <div className="my-auto mx-auto w-44 h-64 bg-white p-2.5 shadow-xl rounded-sm transform rotate-[-1deg] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] flex flex-col justify-between">
                  <div className="w-full h-[88%] bg-slate-100 overflow-hidden rounded-[2px] relative border border-slate-200">
                    {config.videoUrl ? (
                      (config.videoUrl.includes("drive.google.com") && videoError) ? (
                        <iframe 
                          src={`https://drive.google.com/file/d/${getDriveId(config.videoUrl)}/preview`}
                          className="w-full h-full border-0 scale-[1.3] origin-center"
                          allow="autoplay"
                          title="Santinho Memorial Video"
                        />
                      ) : (
                        <video 
                          key={config.videoUrl}
                          src={getDirectVideoUrl(config.videoUrl)} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover"
                          onError={() => {
                            console.warn("Direct video stream error, falling back to Google Drive iframe preview.");
                            setVideoError(true);
                          }}
                        />
                      )
                    ) : (
                      <img 
                        src={config.photoUrl} 
                        alt={config.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top filter contrast-[1.02]"
                      />
                    )}
                    {/* Tender Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  <div className="h-[10%] flex items-center justify-center">
                    <span className="text-[10px] font-display text-indigo-950 tracking-wider">
                      ★ Amor Eterno ★
                    </span>
                  </div>
                </div>

                {/* Name and Dates */}
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-script text-indigo-950/90 leading-tight">
                    {config.name}
                  </h3>
                  <div className="flex flex-col text-xs text-slate-800 font-sans tracking-widest font-medium mt-1">
                    <span>{config.birthDate}</span>
                    <span className="flex items-center justify-center gap-1 font-semibold text-slate-900 mt-0.5">
                      † {config.deathDate}
                    </span>
                  </div>
                </div>

                {/* Elegant 2x2 Navigation Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 text-[11px] tracking-[0.2em] font-medium text-indigo-950/95 font-sans">
                  <button 
                    onClick={() => setScreen("biografia")}
                    className="py-2.5 px-1 bg-white/40 hover:bg-white/75 active:bg-white border border-[#4a3f75]/15 rounded-xl transition shadow-sm flex flex-col items-center justify-center gap-1 min-h-[50px]"
                  >
                    <BookOpen className="w-4 h-4 text-violet-800 opacity-80" strokeWidth={1.8} />
                    <span>BIOGRAFIA</span>
                  </button>
                  <button 
                    onClick={() => setScreen("salmos")}
                    className="py-2.5 px-1 bg-white/40 hover:bg-white/75 active:bg-white border border-[#4a3f75]/15 rounded-xl transition shadow-sm flex flex-col items-center justify-center gap-1 min-h-[50px]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-700 opacity-80" strokeWidth={1.8} />
                    <span>SALMOS</span>
                  </button>
                  <button 
                    onClick={() => setScreen("galeria")}
                    className="py-2.5 px-1 bg-white/40 hover:bg-white/75 active:bg-white border border-[#4a3f75]/15 rounded-xl transition shadow-sm flex flex-col items-center justify-center gap-1 min-h-[50px]"
                  >
                    <ImageIcon className="w-4 h-4 text-sky-800 opacity-80" strokeWidth={1.8} />
                    <span>GALERIA</span>
                  </button>
                  <button 
                    onClick={() => setScreen("terco")}
                    className="py-2.5 px-1 bg-white/40 hover:bg-white/75 active:bg-white border border-[#4a3f75]/15 rounded-xl transition shadow-sm flex flex-col items-center justify-center gap-1 min-h-[50px]"
                  >
                    <Heart className="w-4 h-4 text-rose-800 opacity-80" strokeWidth={1.8} />
                    <span>TERÇO</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 3: BIOGRAPHY TAB */}
            {currentScreen === "biografia" && (
              <motion.div
                key="biografia"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-between py-5 px-5 h-full"
              >
                {/* Custom Tab Header */}
                <div className="flex items-center justify-between border-b border-indigo-950/10 pb-1.5">
                  <button 
                    onClick={() => setScreen("home")}
                    className="flex items-center text-xs text-indigo-950 font-medium tracking-wider hover:opacity-80 transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <h4 className="text-xl font-script text-indigo-950">Biografia</h4>
                  <div className="w-6"></div> {/* Spacer for alignment */}
                </div>

                {/* Biography Scroll Container */}
                <div className="flex-1 overflow-y-auto pr-1 my-3 text-xs leading-relaxed text-slate-800 font-sans font-light scroll-smooth">
                  {/* Small Profile thumbnail */}
                  <div className="flex items-center gap-3 bg-white/20 p-2 rounded-xl mb-4 border border-[#4a3f75]/5">
                    <img 
                      src={config.photoUrl} 
                      alt={config.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-full border border-[#4a3f75]/10" 
                    />
                    <div>
                      <h5 className="font-semibold text-slate-950 text-[13px]">{config.name}</h5>
                      <p className="text-[10px] text-slate-700 font-medium">Legado eterno no coração de todos</p>
                    </div>
                  </div>

                  {/* Multi-paragraph custom text */}
                  {config.biography.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-[11px] text-justify space-y-2 first-letter:text-lg first-letter:font-serif first-letter:text-indigo-900 first-letter:font-semibold">
                      {paragraph}
                    </p>
                  ))}

                  <div className="text-center mt-6 pt-4 border-t border-indigo-950/5">
                    <p className="text-[10px] font-script text-indigo-900 text-lg">
                      "Combati o bom combate, acabei a carreira, guardei a fé."
                    </p>
                    <p className="text-[9px] tracking-widest text-slate-700 mt-1 uppercase font-semibold">2 Timóteo 4:7</p>
                  </div>
                </div>

                {/* Read aloud toggle simulator */}
                <div className="flex items-center justify-between bg-white/30 p-2.5 rounded-xl border border-indigo-950/10">
                  <span className="text-[10px] font-medium text-indigo-950/80">Homilia por Áudio (Demo)</span>
                  <button 
                    onClick={() => setMuteSound(!muteSound)}
                    className="p-1.5 rounded-full bg-violet-900/10 hover:bg-violet-900/20 text-violet-900 transition flex items-center gap-1"
                  >
                    {muteSound ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span className="text-[9px] px-1 font-semibold">Ouvir</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                        <span className="text-[9px] px-1 font-semibold bg-violet-900 text-white rounded-md">Tocar...</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: SALMOS TAB (Image 04) */}
            {currentScreen === "salmos" && (
              <motion.div
                key="salmos"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-5 h-full relative overflow-hidden"
              >
                {/* Full-bleed Sunset backdrop mimicking the sent photo */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#b45309] via-[#efa223] to-[#ebd27c]"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=600&auto=format&fit=crop" 
                    alt="Sunset tree silhouette"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 mix-blend-multiply filter contrast-125 brightness-[0.8]"
                  />
                  {/* Radial golden glow on center right */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(254,240,138,0.25),transparent_60%)]"></div>
                </div>

                {/* Back button overlay */}
                <div className="flex items-center justify-between z-10">
                  <button 
                    onClick={() => setScreen("home")}
                    className="flex items-center text-[10px] text-slate-900 font-bold tracking-wider bg-white/50 backdrop-blur-md py-1 px-2.5 rounded-full hover:bg-white/70 transition border border-black/5"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> Voltar
                  </button>
                  <div className="w-6"></div>
                </div>

                {/* Scripture - Calligraphic Style on right side to avoid tree trunk */}
                <div className="my-auto text-right w-full pr-4 pl-14 flex flex-col justify-center items-end gap-3 z-10 select-none">
                  {/* "Salmos" word in soft water blue script */}
                  <div className="font-script text-[#4e8bc9] text-[40px] tracking-wide leading-none pr-3 select-none">
                    Salmos
                  </div>
                  
                  {/* Calligraphic passage in 3 lines matching the image */}
                  <div className="flex flex-col gap-2 text-right">
                    <p className="text-[27px] font-script text-slate-900 leading-[1.3] font-medium tracking-wide">
                      O Senhor é a minha <br />
                      Luz e Salvação. <br />
                      A quem terei medo?
                    </p>
                    
                    {/* Source reference below on right-align */}
                    <span className="text-[10px] font-sans text-slate-800/80 font-bold tracking-[0.2em] uppercase pr-2">
                      27:1
                    </span>
                  </div>
                </div>

                {/* Bottom guidance hint */}
                <div className="text-center pb-2 z-10">
                  <span className="text-[10px] font-medium text-slate-900/60 tracking-wider">
                    "Guia-me pelas veredas da justiça"
                  </span>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: GALLERY TAB (Image 03) */}
            {currentScreen === "galeria" && (
              <motion.div
                key="galeria"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between h-full overflow-hidden"
              >
                {config.galleryImageUrl ? (
                  // Full-bleed Custom High-Fidelity Gallery image uploaded by the user matching the screenshot
                  <div className="relative w-full h-full">
                    {/* Float Voltar overlay */}
                    <button 
                      onClick={() => setScreen("home")}
                      className="absolute top-4 left-4 z-40 flex items-center text-[10px] text-slate-900 font-bold tracking-wider bg-white/70 backdrop-blur-md py-1 px-2.5 rounded-full hover:bg-white/90 transition border border-black/5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> Voltar
                    </button>
                    
                    {/* Full-bleed collage image */}
                    <img 
                      src={config.galleryImageUrl} 
                      alt="Galeria de Lembranças"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none" 
                    />
                  </div>
                ) : (
                  // Fallback polaroid scattered style
                  <div className="flex flex-col justify-between py-5 px-4 h-full relative">
                    {/* Tab Header */}
                    <div className="flex items-center justify-between border-b border-indigo-950/10 pb-1.5">
                      <button 
                        onClick={() => setScreen("home")}
                        className="flex items-center text-xs text-indigo-950 font-medium tracking-wider hover:opacity-80 transition"
                      >
                        <ChevronLeft className="w-4 h-4" /> Voltar
                      </button>
                      <h4 className="text-xl font-script text-indigo-950">Galeria</h4>
                      <span className="text-xs font-serif text-indigo-950/70 italic text-[11px]">Memórias</span>
                    </div>

                    {/* Grid Collage (Emulating polaroid scattered style from Image 03) */}
                    <div className="flex-1 my-3 overflow-y-auto pr-1 relative flex flex-col gap-4">
                      <p className="text-[10px] text-center text-indigo-950/75 tracking-wider font-medium bg-white/20 py-1 rounded-md border border-[#4a3f75]/5">
                        Selecione uma lembrança para ler a legenda
                      </p>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3.5 p-1">
                        {config.gallery.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            onClick={() => setActiveGalleryIndex(idx)}
                            className="bg-white p-2 shadow-md rounded-[1px] cursor-pointer hover:shadow-xl hover:scale-[1.03] transition duration-200 border border-slate-100 flex flex-col justify-between"
                            style={{
                              transform: `rotate(${item.rotation}deg)`
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden rounded-[1px]">
                              <img 
                                src={item.url} 
                                alt={item.caption}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale-[15%] saturate-125"
                              />
                            </div>
                            <div className="pt-1 text-[8px] font-serif text-slate-800 text-center truncate italic font-medium">
                              {item.caption}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Live Polaroid Modal Details Lightbox */}
                    <AnimatePresence>
                      {activeGalleryIndex !== null && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-slate-950/90 z-50 p-5 flex flex-col justify-center items-center"
                        >
                          <motion.div 
                            initial={{ scale: 0.85, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.85, y: 20 }}
                            className="bg-white p-4 pb-6 w-full max-w-[260px] shadow-2xl rounded-sm flex flex-col items-center gap-4"
                          >
                            <div className="relative w-full aspect-square bg-slate-50 overflow-hidden border border-slate-200">
                              <img 
                                src={config.gallery[activeGalleryIndex].url} 
                                alt="Zoomed"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="text-center font-serif text-slate-900 border-t border-slate-100 pt-3 w-full">
                              <p className="text-sm italic font-medium text-slate-800">
                                "{config.gallery[activeGalleryIndex].caption}"
                              </p>
                              <p className="text-[9px] font-sans font-semibold text-slate-500 uppercase tracking-widest mt-2">
                                Memória Registrada
                              </p>
                            </div>
                            <button 
                              onClick={() => setActiveGalleryIndex(null)}
                              className="mt-1 w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[10px] font-semibold uppercase tracking-wider transition"
                            >
                              Fechar
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer memory signature */}
                    <div className="text-center text-[10px] font-script text-indigo-900 pt-1">
                      "Sua presença iluminava nossas vidas"
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCREEN 6: TERÇO TAB (Image 05) */}
            {currentScreen === "terco" && (
              <motion.div
                key="terco"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col justify-between p-5 h-full relative overflow-hidden"
              >
                {/* Glowing Candle Rosary Backdrop matching Image 05 */}
                <div className="absolute inset-0 -z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1615672960655-1f953051bc27?q=80&w=600&auto=format&fit=crop" 
                    alt="Rosary candles background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.4] sepia-[0.35] saturate-[1.1] contrast-[1.1]"
                  />
                  {/* Ambient heat map to recreate Image 05 color tones */}
                  <div className="absolute inset-0 bg-yellow-950/20 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30"></div>
                </div>

                {/* Navigation Header */}
                <div className="flex items-center justify-between z-10 text-white">
                  <button 
                    onClick={() => {
                      setScreen("home");
                      setActiveBead(0);
                    }}
                    className="flex items-center text-xs font-medium tracking-wider bg-black/40 backdrop-blur-md py-1 px-2.5 rounded-full hover:bg-black/60 transition border border-white/5"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> Voltar
                  </button>
                  <h4 className="text-xl font-script text-yellow-100 drop-shadow-md">Rezando o Terço</h4>
                  <div className="w-6"></div>
                </div>

                {/* Interactive Rosary Beads Selector Component */}
                <div className="my-auto z-10 flex flex-col items-center gap-3">
                  
                  {/* Interactive Rosary Visual Representation (Dezena loop) */}
                  <div className="relative w-44 h-44 flex items-center justify-center bg-white/5 border border-white/10 rounded-full p-2 backdrop-blur-xs shadow-inner">
                    {/* Inner Cross and single master bead */}
                    <div className="absolute flex flex-col items-center justify-center gap-1 cursor-pointer">
                      {/* Cross decoration */}
                      <svg viewBox="0 0 24 24" className={`w-8 h-8 transition-all duration-300 ${activeBead === 11 ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] scale-110' : 'text-amber-100 opacity-80'}`} fill="currentColor" onClick={() => setActiveBead(11)}>
                        <path d="M11 2h2v6h6v2h-6v12h-2v-12H5V8h6V2z" />
                      </svg>
                      {/* Interactive resetting button */}
                      {activeBead > 0 && (
                        <button 
                          onClick={() => setActiveBead(0)} 
                          className="p-1 rounded-full bg-black/40 hover:bg-black/60 text-slate-300 font-semibold border border-white/10 shadow flex items-center gap-0.5"
                          title="Reiniciar Terço"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span className="text-[8px] tracking-wide font-sans">1/10</span>
                        </button>
                      )}
                    </div>

                    {/* Circular layout of Beads */}
                    {Array.from({ length: 11 }).map((_, idx) => {
                      // Circle placement logic
                      const totalElements = 11;
                      const angle = (idx / totalElements) * 2 * Math.PI - Math.PI / 2;
                      const radius = 62; // Distance from center 
                      const x = radius * Math.cos(angle);
                      const y = radius * Math.sin(angle);

                      const beadStyle = idx === 0 
                        ? "w-4 h-4 bg-amber-200 border-2 border-amber-600 rounded-full shadow" // Principal Bead
                        : idx === 10
                          ? "w-3.5 h-3.5 bg-blue-300 border-2 border-indigo-700 rounded-full shadow-lg" // The special distinctive blue bead from image!
                          : "w-3 h-3 bg-yellow-100 border border-slate-400 rounded-full shadow";

                      const isActive = activeBead === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveBead(idx)}
                          className={`absolute transition-all duration-300 ${beadStyle} transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:brightness-110 cursor-pointer ${
                            isActive 
                              ? "ring-4 ring-sky-400 scale-125 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" 
                              : "opacity-85"
                          }`}
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Active Bead text & Indicator bar */}
                  <span className="text-[10px] tracking-widest text-[#ebdcb5] uppercase font-semibold font-sans drop-shadow-sm bg-black/30 px-3 py-0.5 rounded-full border border-white/5">
                    {tercoPrayers[activeBead].beadName}
                  </span>

                  {/* Prayer Scrollable Container */}
                  <div className="w-full text-center px-2 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-h-[160px] overflow-y-auto flex flex-col justify-center">
                    <p className="text-[11px] leading-relaxed text-indigo-50 italic drop-shadow-sm font-sans font-light">
                      "{tercoPrayers[activeBead].text}"
                    </p>
                    <p className="text-[9px] text-[#cca250] font-sans font-semibold tracking-wider mt-2 bg-amber-500/10 px-1 py-0.5 rounded-md border border-amber-500/15">
                      ★ Meditação: {tercoPrayers[activeBead].meditation}
                    </p>
                  </div>

                  {/* Progress helper button */}
                  <button
                    onClick={() => setActiveBead((prev) => (prev + 1) % 12)}
                    className="w-full py-2.5 bg-white/95 text-slate-900 rounded-xl hover:bg-white text-xs font-semibold uppercase tracking-wider transition shadow-md active:translate-y-0.5"
                  >
                    Tocar na Próxima Conta
                  </button>
                </div>

                {/* Footer advice */}
                <div className="text-center pb-1">
                  <span className="text-[9px] font-light text-slate-300 drop-shadow-xs">
                    "O amor de Deus nos ampara até a eternidade."
                  </span>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

        {/* Home swipe indicator line (iPhone look) */}
        <div className="absolute bottom-1 right-0 left-0 flex justify-center pb-1 z-40 pointer-events-none">
          <div className="w-24 h-1 bg-slate-900/40 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
