import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Acessibilidade.css";

import {
  Eye,
  Keyboard,
  Volume2,
  Palette,
  CheckCircle,
  MousePointerClick,
} from "lucide-react";

function Acessibilidade() {
  const [perfilCor, setPerfilCor] = useState(() => {
    return localStorage.getItem("perfilCor") || "padrao";
  });

  useEffect(() => {
    document.body.classList.remove(
      "cor-padrao",
      "cor-monocromatico",
      "cor-protanopia",
      "cor-tritanopia"
    );
    document.body.classList.add(`cor-${perfilCor}`);
  }, [perfilCor]);

  function alterarPerfilCor(novoPerfil: string) {
    setPerfilCor(novoPerfil);
    localStorage.setItem("perfilCor", novoPerfil);
  }

  function redefinir() {
    alterarPerfilCor("padrao");
  }

  return (
    <div className="acessibilidade-page">
      <Header />

      <main className="acessibilidade-main">
        <section className="acessibilidade-hero">
          <span className="acessibilidade-breadcrumb">
            CentralDocs &gt; Acessibilidade
          </span>

          <div className="acessibilidade-hero-content">
            <div>
              <h1>Acessibilidade</h1>

              <p>
                Personalize sua experiência no CentralDocs para navegar com
                mais conforto, clareza e autonomia.
              </p>
            </div>

            <div className="acessibilidade-hero-card">
              <CheckCircle size={28} />

              <div>
                <strong>Experiência inclusiva</strong>
                <span>Recursos pensados para diferentes necessidades.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="acessibilidade-cards">
          <div className="acessibilidade-card">
            <div className="acessibilidade-card-title">
              <div className="acessibilidade-icon-box">
                <Eye size={22} />
              </div>

              <div>
                <h2>Visual</h2>
                <p>Ajustes para melhorar a leitura da interface.</p>
              </div>
            </div>

            <div className="acessibilidade-option">
              <div>
                <strong>Modo de alto contraste</strong>
                <p>Aumenta a visibilidade dos textos, botões e elementos.</p>
              </div>

              <label className="acessibilidade-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>

            <div className="acessibilidade-option">
              <div>
                <strong>Redução de movimento</strong>
                <p>Diminui animações e transições para mais conforto.</p>
              </div>

              <label className="acessibilidade-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>

          <div className="acessibilidade-card">
            <div className="acessibilidade-card-title">
              <div className="acessibilidade-icon-box">
                <Keyboard size={22} />
              </div>

              <div>
                <h2>Navegação</h2>
                <p>Opções para facilitar o uso pelo teclado.</p>
              </div>
            </div>

            <div className="acessibilidade-option">
              <div>
                <strong>Atalhos de teclado</strong>
                <p>Permite navegar rapidamente entre áreas importantes.</p>
              </div>

              <label className="acessibilidade-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>

            <div className="acessibilidade-option">
              <div>
                <strong>Cabeçalhos fixos</strong>
                <p>Mantém títulos e menus visíveis durante a navegação.</p>
              </div>

              <label className="acessibilidade-switch">
                <input type="checkbox" />
                <span></span>
              </label>
            </div>
          </div>
        </section>

        <section className="acessibilidade-banner">
          <div className="acessibilidade-banner-content">
            <span>Otimização de voz</span>

            <div className="acessibilidade-banner-title">
              <Volume2 size={30} />
              <h2>Leitor de tela avançado</h2>
            </div>

            <p>
              Compatível com tecnologias assistivas como NVDA, JAWS e
              VoiceOver, ajudando na leitura e navegação dos documentos.
            </p>

            <button type="button">
              Configurar narração
              <MousePointerClick size={18} />
            </button>
          </div>
        </section>

        <section className="acessibilidade-color-section">
          <div className="acessibilidade-section-title">
            <div className="acessibilidade-icon-box">
              <Palette size={22} />
            </div>

            <div>
              <h2>Perfis de cores</h2>
              <p>Escolha uma combinação visual mais confortável para você.</p>
            </div>
          </div>

          <div className="acessibilidade-colors">
            <button
              className={`acessibilidade-color-card ${
                perfilCor === "padrao" ? "active" : ""
              }`}
              type="button"
              onClick={() => alterarPerfilCor("padrao")}
            >
              <div className="acessibilidade-color azul"></div>
              <strong>Azul padrão</strong>
              <p>Padrão CentralDocs</p>
            </button>

            <button
              className={`acessibilidade-color-card ${
                perfilCor === "monocromatico" ? "active" : ""
              }`}
              type="button"
              onClick={() => alterarPerfilCor("monocromatico")}
            >
              <div className="acessibilidade-color escuro"></div>
              <strong>Monocromático</strong>
              <p>Maior contraste visual</p>
            </button>

            <button
              className={`acessibilidade-color-card ${
                perfilCor === "protanopia" ? "active" : ""
              }`}
              type="button"
              onClick={() => alterarPerfilCor("protanopia")}
            >
              <div className="acessibilidade-color laranja"></div>
              <strong>Protanopia</strong>
              <p>Adaptação vermelho-verde</p>
            </button>

            <button
              className={`acessibilidade-color-card ${
                perfilCor === "tritanopia" ? "active" : ""
              }`}
              type="button"
              onClick={() => alterarPerfilCor("tritanopia")}
            >
              <div className="acessibilidade-color verde"></div>
              <strong>Tritanopia</strong>
              <p>Adaptação azul-amarelo</p>
            </button>
          </div>
        </section>

        <div className="acessibilidade-actions">
          <button className="btn-resetar" type="button" onClick={redefinir}>
            Redefinir
          </button>

          <button
            className="btn-salvar"
            type="button"
            onClick={() => alterarPerfilCor(perfilCor)}
          >
            Salvar preferências
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Acessibilidade;