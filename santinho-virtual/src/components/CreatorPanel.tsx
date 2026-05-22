import { useState, useTransition } from "react";
import { 
  Heart, 
  BookOpen, 
  Image as ImageIcon, 
  Sparkles, 
  Edit, 
  Check, 
  Plus, 
  Trash2, 
  Smartphone, 
  LifeBuoy, 
  Calendar, 
  FileText, 
  User, 
  ArrowRight,
  Eye
} from "lucide-react";
import { SantinhoConfig, DEFAULT_SANTINHO } from "../types";

interface CreatorPanelProps {
  config: SantinhoConfig;
  onChange: (newConfig: SantinhoConfig) => void;
  onScreenChange: (screen: string) => void;
  activeScreen: string;
}

const MEMORIAL_PRESETS = [
  {
    name: "Walker Cabral",
    label: "Walker Cabral (Original Demo)",
    config: DEFAULT_SANTINHO
  },
  {
    name: "Ana Maria de Souza",
    label: "Ana Maria de Souza (Exemplo Feminino)",
    config: {
      name: "Ana Maria de Souza",
      birthDate: "15-10-1946",
      deathDate: "19-02-2024",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop", // Respectful warm photo of elder woman
      biography: `Ana Maria de Souza foi o pilar de ternura e união de nossa família. Professora primária por vocação, dedicou mais de 40 anos a alfabetizar crianças nas redes públicas brasileiras com afinco e amor ímpar. Sempre ensinou que o conhecimento é a chave que liberta o espírito.

Além de sua valiosa missão educadora, Ana foi mãe exemplar de três filhos e avó de cinco netos, que cresceram ouvindo suas cantigas e saboreando seus famosos bolos de canela nas tardes festivas de sábado. Sua casa estava sempre florida, um reflexo direto de sua alma alegre que via poesia em cada detalhe diário.

Seu passamento em fevereiro de 2024 abre um imenso vazio, mas os valores de compaixão, união familiar, e devoção à caridade que ela semeou em nós florescem de forma inabalável. Recordaremos de suas risadas e abraços acolhedores para sempre.`,
      psalmReference: "Salmos 23:1",
      psalmText: "O Senhor é o meu Pastor.\nNada me faltará.",
      gallery: [
        {
          id: "w1",
          url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop", // garden
          caption: "Cultivando orquídeas com o amor de sempre.",
          rotation: -2
        },
        {
          id: "w2",
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop", // old books, teaching
          caption: "Uma vida inteira dedicada à educação e à docência.",
          rotation: 3
        },
        {
          id: "w3",
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop", // family
          caption: "Seu maior sorriso era cercada por todos nós.",
          rotation: -1
        }
      ]
    }
  }
];

export default function CreatorPanel({ 
  config, 
  onChange, 
  onScreenChange, 
  activeScreen 
}: CreatorPanelProps) {
  const [activeTab, setActiveTab] = useState<"info" | "bio" | "gallery" | "psalms">("info");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [, startTransition] = useTransition();

  const handleInputChange = (field: keyof SantinhoConfig, value: unknown) => {
    startTransition(() => {
      onChange({
        ...config,
        [field]: value
      });
    });
  };

  const handleApplyPreset = (presetConfig: SantinhoConfig) => {
    onChange(presetConfig);
    onScreenChange("home");
    setSuccessMsg("Preset carregado com sucesso!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddGalleryItem = () => {
    const newId = String(Date.now());
    const newItem = {
      id: newId,
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop", // Default nature/serene photo
      caption: "Nova Memória Registrada",
      rotation: Math.floor(Math.random() * 8) - 4 // Random rotation between -4 and +4 degrees
    };
    handleInputChange("gallery", [...config.gallery, newItem]);
  };

  const handleRemoveGalleryItem = (id: string) => {
    const updatedGallery = config.gallery.filter(item => item.id !== id);
    handleInputChange("gallery", updatedGallery);
  };

  const handleUpdateGalleryItemCaption = (id: string, newCaption: string) => {
    const updatedGallery = config.gallery.map(item => {
      if (item.id === id) {
        return { ...item, caption: newCaption };
      }
      return item;
    });
    handleInputChange("gallery", updatedGallery);
  };

  const handleUpdateGalleryItemUrl = (id: string, newUrl: string) => {
    const updatedGallery = config.gallery.map(item => {
      if (item.id === id) {
        return { ...item, url: newUrl };
      }
      return item;
    });
    handleInputChange("gallery", updatedGallery);
  };

  return (
    <div id="creator-panel" className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-950/5 flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-violet-800">
          <Smartphone className="w-5 h-5" />
          <span className="text-xs font-semibold tracking-wider font-sans uppercase">Personalizador em Tempo Real</span>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-[#1a1530] mt-1">Crie o seu Santinho Virtual</h3>
        <p className="text-sm text-slate-500 font-sans mt-1">
          Simule os campos para ver imediatamente o funcionamento em nosso aplicativo à direita.
        </p>
      </div>

      {/* Select Presets */}
      <div className="bg-[#f7f6fc] p-4 rounded-2xl border border-indigo-950/5 flex flex-col gap-2.5">
        <label className="text-xs font-bold text-[#332a5c] uppercase tracking-wider font-sans block">
          Modelos de Demonstração
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          {MEMORIAL_PRESETS.map((preset, index) => {
            const isSelected = config.name === preset.config.name;
            return (
              <button
                key={index}
                onClick={() => handleApplyPreset(preset.config)}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded-xl transition text-left flex items-center justify-between border ${
                  isSelected 
                    ? "bg-violet-900 border-violet-900 text-white shadow-md font-semibold" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{preset.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
        {successMsg && (
          <span className="text-[11px] text-emerald-600 font-semibold animate-pulse block">
            {successMsg}
          </span>
        )}
      </div>

      {/* Simulator Direct Screen Controller */}
      <div className="border border-indigo-950/10 p-4 rounded-2xl">
        <label className="text-xs font-bold text-[#332a5c] uppercase tracking-wider font-sans block mb-2.5">
          Atalhos de Visualização (Simular Telas)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-[10px] font-semibold text-[#322a57]">
          <button 
            onClick={() => onScreenChange("splash")}
            className={`py-1.5 px-1 rounded-lg border transition text-center ${activeScreen === "splash" ? "bg-violet-100 border-violet-400 font-bold" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
          >
            Abertura
          </button>
          <button 
            onClick={() => onScreenChange("home")}
            className={`py-1.5 px-1 rounded-lg border transition text-center ${activeScreen === "home" ? "bg-violet-100 border-violet-400 font-bold" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
          >
            Capa
          </button>
          <button 
            onClick={() => onScreenChange("biografia")}
            className={`py-1.5 px-1 rounded-lg border transition text-center ${activeScreen === "biografia" ? "bg-violet-100 border-violet-400 font-bold" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
          >
            Biografia
          </button>
          <button 
            onClick={() => onScreenChange("salmos")}
            className={`py-1.5 px-1 rounded-lg border transition text-center ${activeScreen === "salmos" ? "bg-violet-100 border-violet-400 font-bold" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
          >
            Salmos
          </button>
          <button 
            onClick={() => onScreenChange("galeria")}
            className={`py-1.5 px-1 rounded-lg border transition text-center ${activeScreen === "galeria" ? "bg-violet-100 border-violet-400 font-bold" : "bg-slate-50 hover:bg-slate-100 border-slate-200"}`}
          >
            Galeria
          </button>
        </div>
      </div>

      {/* Tabs navigation for configuration fields */}
      <div className="flex border-b border-slate-200 gap-1 mt-1 text-xs">
        <button
          onClick={() => {
            setActiveTab("info");
            onScreenChange("home");
          }}
          className={`pb-2.5 px-2.5 border-b-2 font-medium transition flex items-center gap-1.5 ${
            activeTab === "info" 
              ? "border-violet-800 text-violet-800 font-bold" 
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <User className="w-3.5 h-3.5" /> Informações
        </button>
        <button
          onClick={() => {
            setActiveTab("bio");
            onScreenChange("biografia");
          }}
          className={`pb-2.5 px-2.5 border-b-2 font-medium transition flex items-center gap-1.5 ${
            activeTab === "bio" 
              ? "border-violet-800 text-violet-800 font-bold" 
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Biografia
        </button>
        <button
          onClick={() => {
            setActiveTab("gallery");
            onScreenChange("galeria");
          }}
          className={`pb-2.5 px-2.5 border-b-2 font-medium transition flex items-center gap-1.5 ${
            activeTab === "gallery" 
              ? "border-violet-800 text-violet-800 font-bold" 
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Galeria ({config.gallery.length})
        </button>
        <button
          onClick={() => {
            setActiveTab("psalms");
            onScreenChange("salmos");
          }}
          className={`pb-2.5 px-2.5 border-b-2 font-medium transition flex items-center gap-1.5 ${
            activeTab === "psalms" 
              ? "border-violet-800 text-violet-800 font-bold" 
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Salmos
        </button>
      </div>

      {/* Config Form Elements */}
      <div className="flex-1 flex flex-col gap-4 text-xs">
        
        {/* TAB 1: CARD DATA INFO */}
        {activeTab === "info" && (
          <div className="flex flex-col gap-4 animate-[fade-in_0.2s_ease]">
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wide">Nome Completo</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none font-medium text-slate-900 shadow-sm"
                placeholder="Ex. Walker Cabral"
              />
            </div>

            {/* Date Inputs Split */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Nascimento
                </label>
                <input
                  type="text"
                  value={config.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-900 shadow-sm"
                  placeholder="08-02-1941"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Falecimento
                </label>
                <input
                  type="text"
                  value={config.deathDate}
                  onChange={(e) => handleInputChange("deathDate", e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-900 shadow-sm font-semibold text-rose-900"
                  placeholder="06-04-2023"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wide">Foto de Perfil (Endereço de Imagem URL)</label>
              <input
                type="text"
                value={config.photoUrl}
                onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-800 font-mono text-[10px] shadow-sm"
              />
              <p className="text-[10px] text-slate-500 leading-tight">
                Dica: Cole o link de qualquer imagem hospedada na web para exibir. Recomenda-se orientação de retrato/vertical.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: BIOGRAPHY */}
        {activeTab === "bio" && (
          <div className="flex flex-col gap-4 animate-[fade-in_0.2s_ease]">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> Texto de Tributo à Biografia
              </label>
              <textarea
                rows={8}
                value={config.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-900 leading-relaxed shadow-sm resize-none font-sans"
                placeholder="Escreva sobre a pessoa falecida, contando suas memórias, virtudes, legados e passagens marcantes..."
              />
              <span className="text-[10px] text-slate-500 text-right">
                Suporta parágrafos. Use salto duplo de linha para separar.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY EDITING */}
        {activeTab === "gallery" && (
          <div className="flex flex-col gap-4 animate-[fade-in_0.2s_ease]">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div>
                <b className="text-slate-800">Fotos da Galeria ({config.gallery.length})</b>
                <p className="text-[10px] text-slate-500">Adicione e comente memórias para gerar o visual polaroid.</p>
              </div>
              <button
                onClick={handleAddGalleryItem}
                className="py-1.5 px-3 bg-violet-800 hover:bg-violet-900 text-white rounded-lg flex items-center gap-1 font-semibold transition"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {config.gallery.map((item, index) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-950">Foto #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveGalleryItem(item.id)}
                      className="text-rose-600 hover:text-rose-800 transition"
                      title="Excluir item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-12 bg-slate-200 overflow-hidden rounded border border-slate-300 flex-shrink-0">
                      <img 
                        src={item.url} 
                        alt="item" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <input
                        type="text"
                        value={item.caption}
                        onChange={(e) => handleUpdateGalleryItemCaption(item.id, e.target.value)}
                        className="w-full p-1.5 bg-white border border-slate-200 rounded focus:border-violet-800 focus:outline-none text-[11px]"
                        placeholder="Escreva a legenda..."
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => handleUpdateGalleryItemUrl(item.id, e.target.value)}
                        className="w-full p-1 text-slate-500 border border-slate-200 rounded font-mono text-[9px] truncate"
                        placeholder="Link da imagem..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PSALM SELECTION */}
        {activeTab === "psalms" && (
          <div className="flex flex-col gap-4 animate-[fade-in_0.2s_ease]">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wide">Referência Bíblica</label>
              <input
                type="text"
                value={config.psalmReference}
                onChange={(e) => handleInputChange("psalmReference", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-900 shadow-sm"
                placeholder="Ex. Salmo 27:1"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-slate-800 uppercase tracking-wide">Versículo e Frase de Fé</label>
              <textarea
                rows={4}
                value={config.psalmText}
                onChange={(e) => handleInputChange("psalmText", e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-violet-800 focus:outline-none text-slate-900 leading-relaxed shadow-sm font-sans resize-none"
                placeholder="Ex. O Senhor é a minha luz e a minha salvação; de quem terei temor?"
              />
            </div>
          </div>
        )}

      </div>

      {/* CTA helper */}
      <div className="pt-4 border-t border-slate-200 text-center">
        <span className="text-[11px] text-slate-600 font-medium">
          Dica: No aplicativo à direita, clique em qualquer botão do celular para navegar!
        </span>
      </div>

    </div>
  );
}
