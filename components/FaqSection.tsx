"use client";

import { FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
  benefits?: string[];
};

const faqItems: FaqItem[] = [
  {
    question: "Como o CACC pode me ajudar no dia a dia do curso?",
    answer: "O CACC é seu parceiro durante toda a graduação! Atuamos como ponte entre alunos e coordenação, oferecemos suporte acadêmico e criamos oportunidades de desenvolvimento profissional.",
    benefits: [
      "Resolução rápida de problemas com disciplinas e professores",
      "Acesso a materiais de estudo e monitoria",
      "Networking com empresas e profissionais da área",
      "Representação em reuniões importantes do curso"
    ]
  },
  {
    question: "Quais são os benefícios de participar ativamente do CACC?",
    answer: "Participar do CACC é uma oportunidade única de desenvolvimento pessoal e profissional! Você desenvolve habilidades essenciais para o mercado enquanto contribui para a comunidade acadêmica.",
    benefits: [
      "Desenvolvimento de soft skills (liderança, comunicação, trabalho em equipe)",
      "Experiência em gestão de projetos e eventos",
      "Networking com alunos de diferentes períodos",
      "Certificados para atividades complementares"
    ]
  },
  {
    question: "Como o CACC me ajuda a me preparar para o mercado de trabalho?",
    answer: "Facilitamos sua entrada no mercado através de diversas iniciativas que conectam você a oportunidades reais e desenvolvimento profissional.",
    benefits: [
      "Divulgação exclusiva de vagas de estágio e trainee",
      "Workshops com profissionais da área",
      "Visitas técnicas a empresas",
      "Preparação para processos seletivos"
    ]
  },
  {
    question: "Que tipo de apoio acadêmico o CACC oferece?",
    answer: "Oferecemos uma rede de suporte completa para ajudar você a ter sucesso nas disciplinas e no desenvolvimento de projetos acadêmicos.",
    benefits: [
      "Grupos de estudo para disciplinas difíceis",
      "Banco de provas e materiais anteriores",
      "Mentoria de alunos veteranos",
      "Workshops de tecnologias relevantes"
    ]
  },
  {
    question: "Como o CACC ajuda na integração dos calouros?",
    answer: "Temos um programa especial de acolhimento para garantir que você se sinta em casa desde o primeiro dia de aula!",
    benefits: [
      "Semana de recepção com atividades especiais",
      "Sistema de padrinhos/madrinhas",
      "Tour pelo campus e instalações",
      "Guia do calouro com dicas práticas"
    ]
  },
  {
    question: "Como o CACC contribui para a qualidade do curso?",
    answer: "Trabalhamos em parceria com a coordenação e departamento para garantir a excelência do curso e atender às necessidades dos estudantes.",
    benefits: [
      "Participação ativa nas decisões do colegiado",
      "Avaliação contínua da infraestrutura",
      "Sugestões de melhorias curriculares",
      "Feedback dos alunos para coordenação"
    ]
  }
];

const FaqSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container">
        <h2 className="mb-4 text-4xl font-bold text-center text-primary">Dúvidas Frequentes</h2>
        <p className="max-w-3xl mx-auto mb-16 text-lg text-center text-gray-700">
          Descubra como o CACC pode tornar sua experiência acadêmica mais rica e produtiva. 
          Aqui estão as respostas para as principais dúvidas dos alunos:
        </p>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqItems.map((item, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex items-center justify-between w-full text-left focus:outline-none"
              >
                <h3 className="text-xl font-medium text-gray-900">{item.question}</h3>
                <span className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-3">
                  <p className="mb-4 text-base text-gray-700">{item.answer}</p>
                  {item.benefits && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="mb-2 text-sm font-semibold text-primary">Benefícios principais:</p>
                      <ul className="pl-5 space-y-2 list-disc text-sm text-gray-600">
                        {item.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 