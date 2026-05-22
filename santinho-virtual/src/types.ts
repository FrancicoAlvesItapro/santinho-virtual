export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  rotation: number; // For styling polaroid style images dynamically
}

export interface SantinhoConfig {
  name: string;
  birthDate: string;
  deathDate: string;
  photoUrl: string;
  videoUrl?: string; // Link opcional para vídeo na tela inicial do celular
  biography: string;
  psalmReference: string;
  psalmText: string;
  gallery: GalleryItem[];
  galleryImageUrl?: string;
}

export const DEFAULT_SANTINHO: SantinhoConfig = {
  name: "Walker Cabral",
  birthDate: "08-02-1941",
  deathDate: "06-04-2023",
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", // Respectful warm photo of elder man
  biography: `Walker Cabral foi um homem cuja vida foi pautada pelo amor à família, honra ao dever e profunda fé espiritual. Nascido sob o sol de fevereiro de 1941, dedicou seus anos a construir pontes de afeto e a cultivar valores que hoje permanecem vivos no coração de todos que tiveram o privilégio de caminhar ao seu lado.

Como militar honrado, serviu à sua pátria com retidão e disciplina. Na simplicidade de uma tarde de pesca ou nas conversas entraslaçadas nos almoços em família, Walker irradiava sabedoria e acolhimento. Seu legado não é feito de riquezas materiais temporais, mas dos ensinamentos de ética, do riso compartilhado e do amparo silencioso que sempre ofereceu aos que amava.

Seu passamento espiritual em abril de 2023 nos deixou uma saudade imensa, mas também a certeza de que sua luz continuará brilhando de maneira eterna. Cada conselho proferido, cada gesto de carinho e cada prece compartilhada permanecem como sementes de bem em nossas vidas. Recordamos Walker não com o vazio da ausência, mas com a gratidão eterna de sua rica travessia terrena.`,
  psalmReference: "Salmos 27:1",
  psalmText: "O Senhor é a minha Luz e Salvação.\nA quem terei medo?",
  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop", // Fishing
      caption: "A paixão pelas pescarias e a calmaria da natureza.",
      rotation: -3
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=600&auto=format&fit=crop", // Elegant elder couple holding hands
      caption: "Sempre juntos: o amor e cumplicidade de uma vida inteira.",
      rotation: 4
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", // Younger army/military vintage looking portrait
      caption: "Orgulho e dedicação nos tempos de serviço militar.",
      rotation: -2
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop", // Warm father-son photo hug
      caption: "Abraço fraterno, o Porto seguro de uma família unida.",
      rotation: 3
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop", // Distinguished portrait, perhaps custom uniform
      caption: "Retidão, postura e exemplo para as novas gerações.",
      rotation: -4
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop", // Family gathering laughing around table
      caption: "Celebrando a vida rodeado das pessoas mais importantes.",
      rotation: 2
    }
  ]
};
