import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  BookOpen, 
  Image as ImageIcon, 
  Sparkles, 
  CloudOff, 
  Users, 
  Sparkle, 
  Check, 
  ChevronRight, 
  ShieldCheck,
  Award,
  Mail,
  User,
  Phone,
  HelpCircle
} from "lucide-react";
import { DEFAULT_SANTINHO } from "./types";
import PhoneSimulator from "./components/PhoneSimulator";
import AngelLogo from "./components/AngelLogo";
import HeaderBrandBanner from "./components/HeaderBrandBanner";
// @ts-ignore
import imageHeader from "./assets/images/regenerated_image_1779289232856.png";
// @ts-ignore
import imageDemo from "./assets/images/regenerated_image_1779411133237.jpg";

const headerSantinhoConfig = {
  ...DEFAULT_SANTINHO,
  photoUrl: imageHeader,
};

const demoSantinhoConfig = {
  ...DEFAULT_SANTINHO,
  photoUrl: imageHeader,
  videoUrl: "https://drive.google.com/file/d/1eJgZgNbpw3dlDGSIK4OUlKBGRDyQoyBW/view?usp=share_link",
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string>("home");

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMemorialName, setFormMemorialName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ section state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: "O que é o Santinho Virtual?",
      a: "É uma homenagem digital interativa dedicada a preservar a história de quem amamos diretamente no celular. Ele substitui os tradicionais santinhos de papel por um aplicativo executável completo e independente, que reúne biografia, fotos com movimento, salmos e um terço completamente interativo."
    },
    {
      q: "Ele funciona sem internet?",
      a: "Sim! O Santinho Virtual é um aplicativo executável standalone desenvolvido para rodar 100% de forma offline. Uma vez instalado no celular ou computador, ele dispensa qualquer conexão de rede, estando disponível a qualquer momento para consolar seu coração."
    },
    {
      q: "As fotos antigas realmente ganham vida?",
      a: "Sim. Através de tratamento por inteligência artificial generativa, fotos antigas e estáticas de família recebem movimentos naturais de olhar, expressões e sorrisos leves, fornecendo uma representação afetiva de extremo carinho."
    },
    {
      q: "Como faço para encomendar para um familiar?",
      a: "Basta preencher o formulário de proposta no final desta página. Nossa equipe de acolhimento entrará em contato via WhatsApp para recolher os dados básicos, biografia e fotografias. Nós cuidaremos de 100% da criação e montagem, entregando o executável pronto para rodar."
    },
    {
      q: "Posso alterar ou fazer upgrades após instalado?",
      a: "Não. O aplicativo é entregue totalmente completo de uma única vez, contendo todas as imagens, textos históricos e orações integradas na compilação. Por ser um programa nativo fechado que prioriza a estabilidade e a privacidade, não há painel de edição web ou opções futuras de upgrade."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans scroll-smooth">
      
      {/* SECTION 1.5: FULL WIDTH BRAND BANNER */}
      <div className="w-full overflow-hidden select-none border-b border-slate-200">
        <img 
          src={imageHeader} 
          alt="Santinho Virtual Banner" 
          className="w-full h-auto block object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* SECTION 1: TOP BAR NAV */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo and name removed at user's request */}
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 mx-auto">
            <a href="#proposta" className="hover:text-indigo-600 transition">O CONCEITO</a>
            <a href="#tecnologia" className="hover:text-indigo-600 transition">RECURSOS</a>
            <a href="#demonstracao" className="hover:text-indigo-600 transition">CONHEÇA O APP</a>
            <a href="#precos" className="hover:text-indigo-600 transition">MÉTODO E VALORES</a>
            <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          </div>
        </div>
      </nav>

      {/* SECTION 2: HERO BANNER (SLEEK INTERFACE THEME) */}
      <header className="relative py-12 md:py-20 px-6 overflow-hidden bg-slate-50 border-b border-slate-200">
        {/* Subtle decorative glow to mimic modern professional design */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-12 right-10 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-3xl -z-10 animate-bounce duration-[15s]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero texts (Sleek layout) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight">
              A homenagem <span className="text-indigo-600">eterna</span>, completa e offline.
            </h1>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Desenvolvemos tributos digitais refinados entregues como um aplicativo executável completo e de instalação única. Sem conexões web ou assinaturas: uma experiência offline intocável para preservar a memória familiar, com terço interativo, biografia literária e fotos vivas por inteligência artificial.
            </p>

            {/* Quick benefits items styled in sleek containers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left text-xs font-semibold text-[#1e293b]">
              <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
                <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Executável 100% Offline</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
                <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Fotos com Movimento I.A.</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
                <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Terço Interativo Dedicado</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 border border-slate-200 rounded-xl shadow-xs">
                <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Instalação Única e Completa</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mt-4">
              <a 
                href="#demonstracao" 
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
              >
                CONHECER O APLICATIVO
              </a>
              <a 
                href="#pedido" 
                className="w-full sm:w-auto px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition text-center"
              >
                Valores e Como Solicitar
              </a>
            </div>
          </div>

          {/* Interactive Hero Phone Simulator (Styled container window mimicking Right Visual Column) */}
          <div className="lg:col-span-5 flex justify-center z-10 w-full p-2">
            <div className="w-full max-w-[370px] bg-white p-4 rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-200/50 flex items-center justify-center">
              <img 
                src={imageDemo} 
                alt="Celular Memorial" 
                className="w-full h-auto object-contain rounded-[1.8rem]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </header>



      {/* SECTION 3: THE ORIGINAL CONCEPT & CORE PROPOSITION */}
      <section id="proposta" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column with beautiful descriptive text illustrating the PDF words */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-indigo-600">
              <span className="w-10 h-[1.5px] bg-indigo-600"></span>
              <span className="text-xs font-bold tracking-wider uppercase font-sans">Acolhimento da Saudade</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              Honrar a memória não pode ficar presa a um deslocamento físico diário ou datas isoladas
            </h2>
            
            <div className="text-slate-600 space-y-4 leading-relaxed font-light text-sm md:text-base">
              <p className="border-l-4 border-indigo-600 pl-4 py-1.5 italic bg-indigo-50/30 text-slate-800 rounded-r-md">
                "Com o mundo cada vez mais digital, a forma de honrar a memória de nossos entes queridos não pode ficar presa ao ato do deslocamento ao local da sepultura ou a visita do dia dos finados."
              </p>
              
              <p>
                A vida corrida e as distâncias geográficas muitas vezes nos impedem de estar presentes no local de repouso físico dos nossos entes queridos. O <strong>Santinho Virtual</strong> surge para preencher esse espaço de carinho e reconexão.
              </p>
              
              <p>
                A lembrança física, muitas vezes, está equivocadamente atrelada somente ao patrimônio material que um ente falecido deixa como herança física. Entretanto, sabemos que <strong>o verdadeiro legado deixado é invisível aos olhos:</strong> feito dos ensinamentos éticos, das emoções partilhadas e dos valores morais que essa pessoa transmitiu com carinho a todos com quem conviveu em sua caminhada terrena.
              </p>
            </div>
          </div>

          {/* Side Graphic Collage (Visual tribute to family values) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 shadow-md rounded-[1.5rem] border border-slate-200 flex flex-col gap-3">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit text-indigo-600 border border-indigo-100">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mt-1">Conexão Familiar</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Reaproxima as gerações ao compartilhar preces e lembranças sobre os que já partiram, unindo toda a família.
              </p>
            </div>

            <div className="bg-white p-6 shadow-md rounded-[1.5rem] border border-slate-200 flex flex-col gap-3 translate-y-6">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit text-indigo-600 border border-indigo-100">
                <CloudOff className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mt-1">Sempre Offline</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                "Sem necessidade de conexão com internet, simples, fácil, intuitivo, a seu alcance toda hora que bater aquela saudade."
              </p>
            </div>

            <div className="bg-white p-6 shadow-md rounded-[1.5rem] border border-slate-200 flex flex-col gap-3">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit text-indigo-600 border border-indigo-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mt-1">Fotos Vivas</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                "Ele reúne fotos antigas que ganham vida com movimento suave por inteligência artificial, trazendo acalento e emoção."
              </p>
            </div>

            <div className="bg-white p-6 shadow-md rounded-[1.5rem] border border-slate-200 flex flex-col gap-3 translate-y-6">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit text-indigo-600 border border-indigo-100">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mt-1">Amparo Espiritual</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Orações que oferecem amparo profundo à alma de quem partiu, trazendo resignação ao coração daqueles que ficam.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: EXECUTABLE SHOWCASE (O APLICATIVO ENTREGUE COMPLETO) */}
      <section id="demonstracao" className="py-20 bg-slate-100 border-t border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">DEMONSTRAÇÃO REAL</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Conheça o Aplicativo do Seu Ente Querido
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-light">
              Nossa equipe cria, revisa e compila 100% da homenagem em um arquivo executável definitivo, entregando uma solução pronta e polida de ponta a ponta para a sua família.
            </p>
          </div>

          {/* Centered Demonstration Video Player */}
          <div className="max-w-[360px] mx-auto w-full mb-8">
            <div className="aspect-[9/16] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white relative">
              <iframe
                src="https://drive.google.com/file/d/135qqfkApYOxQUk3HENv8kwi4_R1ZoaAR/preview"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Demonstração do Aplicativo Memorial"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full">
            
            {/* Workflow & Executable Concept Panel */}
            <div className="flex flex-col justify-center gap-8 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> ENTREGA FÁCIL E PRONTA PARA RODAR
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Como funciona o nosso serviço?
                </h3>
                <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                  Para garantir total serenidade à sua família durante o luto, o Santinho Virtual não tem painéis complexos para você mesmo montar na internet. Entregamos a homenagem pronta e polida de ponta a ponta.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                
                {/* Pillar 1 */}
                <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl max-h-[48px] border border-indigo-100 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Sem Ferramentas de Criação ou Ajustes</h4>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                      Nós cuidamos de toda a diagramação, redação das crônicas familiares, escrita das datas de passagem e seleção das canções/orações preferidas. Nenhuma simulação técnica é necessária de sua parte.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl max-h-[48px] border border-indigo-100 flex items-center justify-center">
                    <CloudOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">100% Offline e Seguro</h4>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                      A homenagem é compilada como um aplicativo executável para celulares ou computadores. Uma vez instalado perpetuamente no aparelho, não precisa de internet ou servidores remotos para abrir. Seus dados e memórias permanecem locais.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl max-h-[48px] border border-indigo-100 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Todas as Imagens Integradas com Movimento por I.A.</h4>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                      Nossa equipe trata, restaura e embeleza suas fotos antigas de família de uma só vez, aplicando inteligência artificial para criar expressões faciais delicadas de acalento antes de gerar o executável final completo.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl max-h-[48px] border border-indigo-100 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Instalação Única, Sem Planos de Upgrade</h4>
                    <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                      Livre de assinaturas recorrentes, anúncios ou limitações progressivas. O software é fechado, definitivo e eterno. Compre apenas uma vez, sem opção de upgrade ou taxas escondidas no futuro.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: FAREWELL TECHNOLOGY BENEFITS */}
      <section id="tecnologia" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          
          <div className="text-center flex flex-col gap-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#4f46e5] uppercase">CONFORTO ESPIRITUAL</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-950">Recursos Exclusivos de Amparo</h2>
            <p className="text-sm md:text-base text-slate-600 font-light">
              Desenvolvemos cada aba baseados nas maiores dores de quem vivencia o luto, oferecendo apoio moral e religioso através da beleza das composições digitais.
            </p>
          </div>

          {/* Bento-grid of resources detailed with images structures */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Polaroid Gallery & I.A. movement */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between">
              <div className="p-6 flex-1 flex flex-col gap-4" id="tech-card-galeria">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Galeria de Lembranças</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">
                    "Ele reúne biografia/mensagem, fotos antigas que ganham vida com movimento suave por inteligência artificial." Exiba recordações no estilo clássico de Polaroids com legendas personalizadas para reavivar os melhores momentos.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: Psalms & Tree background */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between">
              <div className="p-6 flex-1 flex flex-col gap-4" id="tech-card-salmos">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Salmos e Mensagens de Fé</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">
                    "O Senhor é a minha Luz e Salvação. A quem terei medo? 27:1". Apresente passagens bíblicas confortantes contra paisagens crepusculares elegantes, trazendo amparo visual e resiliência à alma nos instantes de dor e luto.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Rosary and Candles prayer engine */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between">
              <div className="p-6 flex-1 flex flex-col gap-4" id="tech-card-terco">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Terço Interativo</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-light">
                    "Independentemente da religião, o ato de rezar após a morte de alguém é uma poderosa ferramenta de despedida." Permitirá que os usuários rezem o terço tocando nas contas e lendo as orações direto do visor com tranquilidade e fé.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Concluding philosophical statement from PDF */}
          <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col gap-5 max-w-4xl">
              <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">Eternizando o Legado</span>
              <p className="text-lg md:text-xl font-serif italic leading-relaxed text-indigo-50">
                "Ele reúne biografia/mensagem, fotos antigas que ganham vida com movimento por inteligência artificial, orações que oferecem amparo espiritual à alma de quem partiu, ajudando-a na transição ou purificação, além de trazer conforto, paz e resignação aos corações enlutados."
              </p>
              <div className="w-16 h-[2px] bg-indigo-500"></div>
              <p className="text-xs text-slate-400 leading-normal max-w-2xl font-light">
                "Independentemente da religião, o ato de rezar após a morte de alguém é uma poderosa ferramenta de despedida, servindo para honrar a memória de quem partiu, aceitar a finitude da vida e lidar com o luto através da fé."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: PRODUCT PRICING LISTINGS */}
      <section id="precos" className="py-20 bg-slate-100 border-t border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">PROPOSTA DE VALOR</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Taxa de Confecção e Compilação</h2>
            <p className="text-sm md:text-base text-slate-500 font-light">
              Seguindo nosso compromisso de transparência e respeito, o memorial é criado e enviado de uma única vez. Não há assinaturas, anúncios ou cobranças futuras por upgrades de software.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto w-full">
            
            {/* Column 1: The Single Complete Package Content (Polished Card) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 border-2 border-indigo-600 shadow-xl flex flex-col justify-between relative animate-none">
              <span className="absolute top-0 right-10 transform -translate-y-1/2 bg-indigo-600 text-white font-bold text-[9px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow">
                PACOTE INTEGRAL DEFINITIVO
              </span>
              
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Plano Completo</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">Homenagem Memorial Exclusiva</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Sua história e as fotos da pessoa amada organizadas, restauradas e compiladas profissionalmente como software standalone.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-slate-100 my-1"></div>

                <ul className="text-xs text-slate-700 flex flex-col gap-3 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span><strong>Capa Memorativa com Datas e Foto Principal</strong></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span><strong>Biografia Literária Profissional Expandida</strong> (sem limite de linhas)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span><strong>Galeria Memorial Completa</strong> (disposta em formato polaroid de época)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span><strong>Tratamento e Restauração Digital</strong> de fotografias gastas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span className="text-indigo-600"><strong>Fotos de Família com Movimentos I.A.</strong> (Expressão espontânea)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span><strong>Painel Seletor de Salmos e Mensagens de Fé</strong> confortantes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] mt-0.5" />
                    <span className="text-indigo-950"><strong>Terço Virtual Bead-by-Bead Intuitivo</strong> para amparo espiritual</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <a 
                  href="#pedido" 
                  onClick={() => setFormMemorialName("Solicitação de Memorial Executável Único (Completo - R$ 249)")}
                  className="w-full block py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold tracking-wider text-center transition-all duration-300"
                >
                  SOLICITAR MONTAGEM COMPLETA
                </a>
              </div>
            </div>

            {/* Column 2: Total Transparency */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 border border-slate-800 shadow-md flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Compromisso Santinho</span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">Sem Custos Escondidos</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Acreditamos que preservar o legado espiritual de falecidos exige sinceridade técnica e financeira. Por esse motivo, modelamos nossa entrega de forma ética:
                  </p>
                </div>

                <div className="flex flex-col gap-5 mt-2">
                  <div className="border-l-2 border-indigo-500 pl-4 py-1">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Unidade Físico-Digital</h4>
                    <p className="text-[11px] text-slate-300 font-light mt-1">
                      O aplicativo já vem compilado com todas as fotos e biografias enviadas no ato. Não há dependências online e nenhuma manutenção é cobrada.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-indigo-500 pl-4 py-1">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Instalado uma única vez</h4>
                    <p className="text-[11px] text-slate-300 font-light mt-1">
                      Ele funciona eternamente de maneira offline, protegendo as recordações familiares contra quedas de servidores terceiros ou hospedagem.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-500 pl-4 py-1">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Sem Opção de Upgrade</h4>
                    <p className="text-[11px] text-slate-300 font-light mt-1">
                      Não existem planos com recursos bloqueados de forma intencional para forçar compras posteriores. O Santinho chega completo de fábrica.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Total à vista (Taxa única):</span>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-xs font-semibold">R$</span>
                  <span className="text-4xl font-bold font-serif">249</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: DEMAND FORM (PROPOSAL TO BUY A SANTINHO) */}
      <section id="pedido" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-200 flex flex-col gap-8 relative overflow-hidden">
          
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">ACOLHIMENTO INDIVIDUAL</span>
            <h2 className="text-3xl font-bold text-slate-950">Solicite a Criação da Homenagem</h2>
            <p className="text-xs md:text-sm text-slate-500 font-light mt-1">
              Envie-nos os dados básicos. Nossa equipe entrará em contato via WhatsApp / E-mail para coletar os detalhes e construir a homenagem perfeita para sua querida saudade.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
               <motion.form 
                key="form"
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-4 text-xs font-medium text-slate-700"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold uppercase tracking-wide flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> Seu Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: Francisco Alves"
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold uppercase tracking-wide flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> Seu E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="Ex: seuemail@provedor.com"
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold uppercase tracking-wide flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> Celular / WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Ex: (85) 99999-9999"
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 focus:outline-none bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold uppercase tracking-wide flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-slate-400" /> Nome do Plano de Interesse</label>
                    <input 
                      type="text" 
                      value={formMemorialName}
                      onChange={(e) => setFormMemorialName(e.target.value)}
                      placeholder="Ex: Plano Lembrança da Alma (R$ 249)"
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-650 focus:ring-1 focus:ring-indigo-650 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-55/40 rounded-xl border border-indigo-100 text-slate-600 font-light text-[11px] leading-relaxed">
                  🔒 Garantia de Respeito e Privacidade: Seus dados estão protegidos. Nunca compartilharemos nomes, fotos ou dados biográficos de homenageados com terceiros sem consentimento.
                </div>

                <button 
                  type="submit"
                  className="mt-4 py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition shadow-lg shadow-indigo-100 active:translate-y-0.5"
                >
                  ENVIAR SOLICITAÇÃO COMPATÍVEL
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="confirmation"
                className="text-center py-12 flex flex-col items-center gap-4 animate-[fade-in_0.5s_ease]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200/50">
                  <ShieldCheck className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Solicitação Recebida com Carinho</h3>
                <p className="text-xs text-slate-600 max-w-md leading-relaxed font-light">
                  Prezado(a) <b>{formName}</b>, registramos sua intenção de plano para a homenagem de Walker Cabral ou do seu ente escolhido. Nossa equipe de acolhimento humanizado enviará um WhatsApp para <b>{formPhone}</b> em poucos minutos para orientar sobre o envio de fotografias adicionais e texto final. Obrigado pela confiança!
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormName("");
                    setFormEmail("");
                    setFormPhone("");
                  }}
                  className="mt-6 py-2 px-6 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                >
                  Fazer Outro Pedido
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* SECTION 8: FAQ PORTFOLIO */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center justify-center gap-1">
              <HelpCircle className="w-4.5 h-4.5" /> Dúvidas Frequentes
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-950">Respondendo com Transparência</h2>
            <p className="text-xs md:text-sm text-slate-500 font-light">
              Entendemos que o processo de homenagem envolve muitas questões emocionais e técnicas. Veja abaixo as respostas rápidas.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden transition duration-250"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-semibold text-slate-800 text-xs md:text-sm flex items-center justify-between hover:bg-slate-50/50 transition focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-xl font-light text-indigo-600 transition duration-300 transform ${isOpen ? "rotate-45" : ""}`}>
                      ＋
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-500 font-light leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left text-xs">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <span className="font-display tracking-[0.15em] font-semibold text-lg text-white">
                SANTINHO<span className="text-xs font-light tracking-[0.3em] ml-1.5 text-indigo-400">VIRTUAL</span>
              </span>
            </div>
            <p className="max-w-sm text-slate-400 font-light mt-1">
              Homenageando com honestidade, inovação, afeto e profunda fé espiritual. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Canais de Ajuda</span>
            <span className="text-slate-400 font-light">E-mail: contato@santinhovirtual.com.br</span>
            <span className="text-slate-400 font-light">WhatsApp: (85) 99999-9999</span>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-slate-400 font-light">© 2026 Santinho Virtual Ltda.</p>
            <p className="text-slate-505 text-[10px]">Cofre Memorial da Família — Desenvolvido com carinho e acolhimento.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
