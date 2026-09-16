import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { 
  Play, 
  Smartphone, 
  ShieldCheck, 
  Download, 
  ChevronDown, 
  FileText, 
  Users, 
  Lock, 
  QrCode, 
  Folder, 
  User, 
  Search, 
  Plus, 
  Fingerprint, 
  Zap, 
  Camera, 
  Image, 
  Send 
} from "lucide-react";
import "./Demonstracao.css";

interface FaqItem {
  pergunta: string;
  resposta: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    pergunta: "O aplicativo sincroniza em tempo real com a versão web do CentralDocs?",
    resposta:
      "Sim! Toda alteração feita no aplicativo mobile é refletida imediatamente no painel do navegador (e vice-versa). Você pode começar a escanear pelo celular e continuar organizando as pastas no computador sem nenhum delay.",
  },
  {
    pergunta: "Meus documentos ficam protegidos se eu perder ou tiver meu smartphone furtado?",
    resposta:
      "Absolutamente. O aplicativo exige autenticação biométrica (Face ID ou impressão digital) a cada abertura de tela sensível. Além disso, pelo painel Web do CentralDocs, você pode revogar a sessão do aparelho com apenas um clique, bloqueando o acesso imediatamente.",
  },
  {
    pergunta: "O assistente de inteligência artificial \"Doc\" está incluso no app mobile?",
    resposta:
      "Sim, sem custos adicionais nos planos compatíveis. O robô Doc está integrado nativamente na barra de tarefas inferior, permitindo perguntas por texto ou voz sobre dados contábeis, prazos e resumos de contratos em PDF.",
  },
  {
    pergunta: "Preciso de internet para visualizar arquivos baixados anteriormente?",
    resposta:
      "Não. Você pode marcar arquivos como \"Favoritos\" ou habilitar o \"Modo Offline\" para ter acesso irrestrito aos seus documentos críticos mesmo em aviões ou locais sem conectividade.",
  },
];

export default function Demonstracao() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scroll reveal observer effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToManual = () => {
    const el = document.getElementById("manual-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="demo-page">
      <Header />

      {/* ================= HERO DEMO ================= */}
      <section className="demo-hero">
        <div className="demo-container">
          <div className="demo-hero-grid">
            
            {/* Esquerda: Textos & CTAs */}
            <div className="reveal-on-scroll">
              <div className="demo-hero-badge">
                <Smartphone className="w-4 h-4" />
                <span>Conheça o App CentralDocs Mobile v2.4 • iOS & Android</span>
              </div>

              <h1 className="demo-hero-title">
                Tenha todos os seus documentos e <span className="gradient-text">IA no seu bolso</span>
              </h1>

              <p className="demo-hero-subtitle">
                Consulte contratos, escaneie notas e comprovantes via QR Code, aprove com biometria facial e tenha o assistente inteligente Doc pronto para esclarecer qualquer dúvida em segundos.
              </p>

              <div className="demo-hero-buttons">
                <button className="store-btn">
                  <Download className="w-4 h-4" />
                  <div>
                    <div className="text-[9px] opacity-80 uppercase">Disponível na</div>
                    <div className="text-xs font-bold">App Store</div>
                  </div>
                </button>

                <button className="store-btn">
                  <Download className="w-4 h-4" />
                  <div>
                    <div className="text-[9px] opacity-80 uppercase">Disponível no</div>
                    <div className="text-xs font-bold">Google Play</div>
                  </div>
                </button>

                <button onClick={scrollToManual} className="tour-btn">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Ver Tour Interativo</span>
                </button>
              </div>

              {/* Métrica / Prova Social */}
              <div className="demo-hero-metrics">
                <div className="metric-item">
                  <span className="metric-value">4.9 ★</span>
                  <span className="metric-label">Mais de 4.200 avaliações</span>
                </div>

                <div className="metric-item">
                  <span className="metric-value">+50.000</span>
                  <span className="metric-label">Downloads ativos</span>
                </div>

                <div className="metric-item">
                  <span className="metric-value">AES-256</span>
                  <span className="metric-label">Criptografia bancária</span>
                </div>
              </div>
            </div>

            {/* Direita: Mockup do Smartphone Interativo Hero */}
            <div className="reveal-on-scroll delay-200 phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="phone-header-notch">
                  <span>09:41</span>
                  <div className="phone-camera-pill"></div>
                  <span>100%</span>
                </div>

                <div className="phone-app-body">
                  <div className="phone-app-topbar">
                    <div className="phone-logo">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold text-xs">C</span>
                      CentralDocs
                    </div>
                    <div className="phone-sync-tag">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Sincronizado
                    </div>
                  </div>

                  <div className="phone-app-content">
                    <div className="phone-greeting-card">
                      <p>Bom dia, Nickinho</p>
                      <strong>Seu espaço corporativo está atualizado</strong>
                    </div>

                    <div className="phone-storage-card">
                      <div className="phone-storage-header">
                        <span>☁ Armazenamento Nuvem</span>
                        <span>82%</span>
                      </div>
                      <div className="phone-progress-bg">
                        <div className="phone-progress-fill" style={{ width: "82%" }}></div>
                      </div>
                      <div className="phone-storage-footer">
                        <span>12,4 GB de 15 GB usados</span>
                        <button className="phone-upgrade-btn">Upgrade</button>
                      </div>
                    </div>

                    <div className="phone-stats-row">
                      <div className="phone-stat-box">
                        <FileText className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="phone-stat-num">128</div>
                        <div className="phone-stat-lbl">Documentos</div>
                      </div>

                      <div className="phone-stat-box">
                        <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <div className="phone-stat-num">14</div>
                        <div className="phone-stat-lbl">Colaboradores</div>
                      </div>
                    </div>

                    <div className="phone-file-item">
                      <div className="phone-file-icon">PDF</div>
                      <div className="phone-file-info">
                        <div className="phone-file-name">Relatório Financeiro.pdf</div>
                        <div className="phone-file-meta">Modificado há 2h • 2.4 MB</div>
                      </div>
                      <span className="phone-tag">TRABALHO</span>
                    </div>
                  </div>

                  <div className="phone-bottom-nav">
                    <div className="phone-nav-btn active">
                      <FileText className="w-4 h-4" />
                      <span>Dashboard</span>
                    </div>
                    <div className="phone-nav-btn">
                      <Folder className="w-4 h-4" />
                      <span>Documentos</span>
                    </div>
                    <div className="phone-fab-btn">+</div>
                    <div className="phone-nav-btn">
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MANUAL INTERATIVO / SCREENS GRID ================= */}
      <section id="manual-section" className="demo-screens-section">
        <div className="demo-container">
          <div className="section-header-center reveal-on-scroll">
            <span className="section-badge">MANUAL INTERATIVO MOBILE</span>
            <h2 className="section-title">Explore as Principais Telas e Recursos</h2>
            <p className="section-subtitle">
              Desenvolvido meticulosamente para garantir facilidade de navegação, rapidez na captura de arquivos e segurança de nível corporativo na ponta dos dedos.
            </p>
          </div>

          {/* Grid de Telas 01 a 03 */}
          <div className="screens-grid">
            
            {/* TELA 01 */}
            <div className="screen-card reveal-on-scroll">
              <span className="screen-card-badge">TELA 01</span>
              <h3 className="screen-card-title">Login & Biometria Instantânea</h3>
              <p className="screen-card-desc">
                Validação facial e digital ultrarrápida. Elimine senhas complexas mantendo sua conta impenetrável.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-biometria-box">
                      <div className="biometria-icon-badge">
                        <Fingerprint className="w-7 h-7" />
                      </div>
                      <h4 className="biometria-title">Confirmação Biométrica</h4>
                      <p className="biometria-desc">
                        Use sua biometria para validar o acesso ao documento com segurança.
                      </p>
                      <button className="btn-biometria-primary">Validar Biometria</button>
                      <button className="btn-biometria-secondary">Entrar com senha</button>
                      <div className="biometria-crypto-tag">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Criptografia de ponta a ponta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 02 */}
            <div className="screen-card reveal-on-scroll delay-100">
              <span className="screen-card-badge">TELA 02</span>
              <h3 className="screen-card-title">Dashboard & Nuvem</h3>
              <p className="screen-card-desc">
                Acompanhe estatísticas, colaboradores ativos e consumo de espaço com sincronia em tempo real.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-dashboard-box">
                      <div className="mockup-dash-header">
                        <span className="text-[10px] font-bold text-slate-800">Bom dia, Nickinho</span>
                        <div className="mockup-user-avatar">N</div>
                      </div>
                      <div className="phone-greeting-card">
                        <p>Seu espaço foi <strong>atualizado.</strong></p>
                      </div>
                      <div className="phone-storage-card">
                        <div className="phone-storage-header">
                          <span>☁ Armazenamento</span>
                          <span>82%</span>
                        </div>
                        <div className="phone-progress-bg">
                          <div className="phone-progress-fill" style={{ width: "82%" }}></div>
                        </div>
                        <div className="phone-storage-footer">
                          <span>4,1 GB de 5 GB utilizados</span>
                        </div>
                      </div>
                      <div className="dash-stats-row">
                        <div className="dash-stat-card">
                          <div className="dash-stat-num">128</div>
                          <div className="dash-stat-lbl">Documentos</div>
                        </div>
                        <div className="dash-stat-card">
                          <div className="dash-stat-num">14</div>
                          <div className="dash-stat-lbl">Contribuidores</div>
                        </div>
                      </div>
                      <div className="dash-activity-title">
                        <span>Atividade recente</span>
                        <span style={{ color: '#2563eb', cursor: 'pointer' }}>Ver tudo</span>
                      </div>
                      <div className="dash-activity-item">
                        <strong>Curriculum.pdf</strong>
                        <span>Editado 2h</span>
                      </div>
                      <div className="dash-activity-item">
                        <strong>Relatório Fin. 4º Trim</strong>
                        <span>Sarah M.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 03 */}
            <div className="screen-card reveal-on-scroll delay-200">
              <span className="screen-card-badge">TELA 03</span>
              <h3 className="screen-card-title">Scanner & Leitor QR Code</h3>
              <p className="screen-card-desc">
                Digitalização rápida pela câmera para notas fiscais, contratos impressos e autenticação direta.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-scanner-box">
                      <div>
                        <div className="text-[11px] font-bold text-slate-800">Ler Documento</div>
                        <p className="text-[8px] text-slate-500 mt-1">
                          Aponte a câmera para o QR Code ou texto presente no documento impresso.
                        </p>
                      </div>
                      <div className="scanner-viewfinder">
                        <div className="scanner-laser"></div>
                        <QrCode className="w-10 h-10 text-slate-400 opacity-30" />
                      </div>
                      <div className="scanner-controls">
                        <Zap className="w-3.5 h-3.5 text-slate-400" />
                        <div className="scanner-shutter-btn">
                          <Camera className="w-4 h-4" />
                        </div>
                        <Image className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-[8px] text-slate-400">Toque no centro ou importe da galeria</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Grid de Telas 04 a 06 */}
          <div className="screens-grid">
            
            {/* TELA 04 */}
            <div className="screen-card reveal-on-scroll">
              <span className="screen-card-badge">TELA 04</span>
              <h3 className="screen-card-title">Organização & Pastas</h3>
              <p className="screen-card-desc">
                Filtros dinâmicos por categoria (Tudo, Pessoal, Trabalho) e visualização de extensões.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-pastas-box">
                      <div className="search-input-fake">
                        <Search className="w-3 h-3" />
                        <span>Pesquise seus arquivos...</span>
                      </div>
                      <div className="btn-add-doc-fake">
                        <Plus className="w-3 h-3" />
                        <span>Adicionar documento</span>
                      </div>
                      <div className="category-tags-row">
                        <span className="category-tag active">Tudo</span>
                        <span className="category-tag">Pessoal</span>
                        <span className="category-tag">Trabalho</span>
                      </div>
                      <div className="folder-file-row">
                        <div className="folder-file-info">
                          <span className="ext-badge">PDF</span>
                          <div className="folder-file-titles">
                            <strong>Relatório 4º Trimestre</strong>
                            <span>Modificado há 2h • 2.4 MB</span>
                          </div>
                        </div>
                        <span className="tag-label-pill trabalho">TRABALHO</span>
                      </div>
                      <div className="folder-file-row">
                        <div className="folder-file-info">
                          <span className="ext-badge">JPG</span>
                          <div className="folder-file-titles">
                            <strong>Passport_Scan_Front</strong>
                            <span>Modificado ontem • 1.1 MB</span>
                          </div>
                        </div>
                        <span className="tag-label-pill pessoal">PESSOAL</span>
                      </div>
                      <div className="folder-file-row">
                        <div className="folder-file-info">
                          <span className="ext-badge">XLS</span>
                          <div className="folder-file-titles">
                            <strong>Project Timeline v3</strong>
                            <span>Modificado há 3d • 840 KB</span>
                          </div>
                        </div>
                        <span className="tag-label-pill trabalho">TRABALHO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 05 */}
            <div className="screen-card reveal-on-scroll delay-100">
              <span className="screen-card-badge">TELA 05</span>
              <h3 className="screen-card-title">Assistente IA "Doc"</h3>
              <p className="screen-card-desc">
                Copiloto de inteligência artificial. Resuma PDFs longos, tire dúvidas fiscais e gere atas via chat.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-chat-box">
                      <div>
                        <div className="chat-bubble-bot">
                          ✨ Olá, eu sou o Doc! Como posso ajudar com seus arquivos hoje?
                        </div>
                        <div className="chat-bubble-user">
                          Doc, qual foi o total do Relatório Financeiro de Dezembro?
                        </div>
                        <div className="chat-doc-card">
                          <strong>✨ Resposta do Doc:</strong>
                          O total bruto foi de R$ 48.290,00 com margem operacional de 22,4%.
                        </div>
                      </div>
                      <div className="chat-input-fake">
                        <span>Pergunte ao Doc...</span>
                        <Send className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TELA 06 */}
            <div className="screen-card reveal-on-scroll delay-200">
              <span className="screen-card-badge">TELA 06</span>
              <h3 className="screen-card-title">Dados Pessoais & Configurações</h3>
              <p className="screen-card-desc">
                Preenchimento automático inteligente para contratos, chaves de endereço e perfil profissional.
              </p>

              <div className="screen-card-phone-container">
                <div className="phone-mockup phone-mockup-card">
                  <div className="phone-header-notch"><span>09:41</span></div>
                  <div className="phone-app-body">
                    <div className="mockup-profile-box">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: 'bold', color: '#0f172a' }}>
                        <span>Dados Pessoais</span>
                        <span style={{ color: '#2563eb', fontSize: '8px' }}>Perfil</span>
                      </div>
                      <p style={{ fontSize: '7px', color: '#94a3b8', margin: 0 }}>Mantenha suas informações sincronizadas.</p>
                      
                      <div className="profile-section-title">👤 INFORMAÇÕES BÁSICAS</div>
                      <div className="profile-field-group">
                        <label>Nome Completo</label>
                        <div className="profile-input-fake">Mini Nick</div>
                      </div>
                      <div className="profile-field-group">
                        <label>CPF</label>
                        <div className="profile-input-fake">000.000.000-00</div>
                      </div>
                      
                      <div className="profile-section-title">📍 ENDEREÇO RESIDENCIAL</div>
                      <div className="profile-field-group">
                        <label>Endereço</label>
                        <div className="profile-input-fake">Av. Paulista, Bela Vista</div>
                      </div>
                      
                      <button className="btn-save-profile">✓ Salvar Informações</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PASSO A PASSO ================= */}
      <section className="demo-steps-section">
        <div className="demo-container">
          <div className="section-header-center reveal-on-scroll">
            <span className="section-badge">PASSO A PASSO</span>
            <h2 className="section-title">Como Começar em Menos de 3 Minutos</h2>
            <p className="section-subtitle">
              Veja como é simples migrar ou integrar suas rotinas de documentos no smartphone.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card reveal-on-scroll">
              <div className="step-number-bubble">1</div>
              <h3 className="step-title">Baixe o Aplicativo</h3>
              <p className="step-desc">
                Disponível gratuitamente para iOS (iPhone/iPad) e Android. Basta pesquisar por CentralDocs na loja oficial do seu aparelho ou escanear o QR Code desta página.
              </p>
              <div className="step-tags">
                <span className="step-tag-pill">Disponível globalmente</span>
                <span className="step-tag-pill">App gratuito</span>
              </div>
            </div>

            <div className="step-card reveal-on-scroll delay-100">
              <div className="step-number-bubble">2</div>
              <h3 className="step-title">Faça Login ou Sincronize</h3>
              <p className="step-desc">
                Use a mesma conta criada no portal web. Todos os seus contratos, pastas corporativas e configurações de biometria serão importados instantaneamente via nuvem.
              </p>
              <div className="step-tags">
                <span className="step-tag-pill">Sincronia automática</span>
                <span className="step-tag-pill">Sem perda de dados</span>
              </div>
            </div>

            <div className="step-card reveal-on-scroll delay-200">
              <div className="step-number-bubble">3</div>
              <h3 className="step-title">Digitalize e Aprove</h3>
              <p className="step-desc">
                Aponte a câmera para recibos, use o assistente Doc para resumir termos legais e assine ou compartilhe documentos com proteção criptográfica ponta a ponta.
              </p>
              <div className="step-tags">
                <span className="step-tag-pill">Produtividade 100% móvel</span>
                <span className="step-tag-pill">Pronto para uso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="demo-faq-section">
        <div className="demo-container">
          <div className="section-header-center reveal-on-scroll">
            <span className="section-badge">PERGUNTAS FREQUENTES</span>
            <h2 className="section-title">Dúvidas sobre o CentralDocs Mobile</h2>
            <p className="section-subtitle">
              Respostas rápidas para as dúvidas mais comuns dos nossos usuários.
            </p>
          </div>

          <div className="faq-accordion-list reveal-on-scroll">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button onClick={() => toggleFaq(idx)} className="faq-question-btn">
                    <span>{faq.pergunta}</span>
                    <div className="faq-icon-toggle">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div className="faq-answer-content">
                    <p>{faq.resposta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="demo-cta-section">
        <div className="demo-container">
          <div className="cta-banner-card reveal-on-scroll">
            <div className="cta-banner-content">
              <span className="cta-version-badge">✨ Versão 2.4.1 Pronta para Instalar</span>
              <h2 className="cta-banner-title">
                Leve o controle total da sua empresa e dos seus documentos para o bolso.
              </h2>
              <p className="cta-banner-desc">
                Experimente gratuitamente e descubra porque mais de 50.000 profissionais confiam no CentralDocs Mobile para gerenciar suas vidas profissionais com tranquilidade.
              </p>

              <div className="cta-banner-buttons">
                <button className="store-btn">
                  <Download className="w-4 h-4" />
                  <div>
                    <div className="text-[9px] opacity-80 uppercase">Baixar na</div>
                    <div className="text-xs font-bold">App Store</div>
                  </div>
                </button>

                <button className="store-btn">
                  <Download className="w-4 h-4" />
                  <div>
                    <div className="text-[9px] opacity-80 uppercase">Disponível no</div>
                    <div className="text-xs font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="cta-qr-box">
              <div className="cta-qr-title">ESCANEAR COM A CÂMERA</div>
              <div className="qr-code-graphic">
                <div className="qr-corner-block"></div>
                <div className="qr-center-block"></div>
                <div className="qr-corner-block"></div>
                <div className="qr-center-block"></div>
                <div className="qr-corner-block"></div>
                <div className="qr-center-block"></div>
                <div className="qr-corner-block"></div>
                <div className="qr-center-block"></div>
                <div className="qr-corner-block"></div>
              </div>
              <div className="cta-qr-sub">Aponte e baixe agora</div>
              <div className="cta-qr-compat">Compatível com iOS 14+ e Android 9+</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
