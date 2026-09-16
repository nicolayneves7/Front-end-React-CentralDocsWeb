import { Link } from "react-router-dom";
import "./Hero.css";
import roboImg from "../../assets/img/ChatGPT Image 23 de abr. de 2026, 15_03_20.png";

function Hero() {
  return (
    <section className="hero">
      <div className="container-hero">
        <div className="hero-left">
          <div className="badge-seguranca">
            <span className="dot"></span>
            Segurança Institucional
          </div>

          <h1 className="hero-title">
            Organize seus documentos em um só lugar
          </h1>

          <p className="hero-description">
            A plataforma definitiva para gestão documental corporativa. Proteja
            seus dados sensíveis com criptografia de ponta e organize fluxos de
            trabalho com precisão cirúrgica.
          </p>

          <div className="hero-buttons">
            <Link to="/demonstracao" className="btn-primary">Baixar o app agora!</Link>

            <Link to="/demonstracao" className="btn-secondary">
              <span className="icon-circle">⦿</span>
              Ver demonstração
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="card-visual">
            <img
              src={roboImg}
              alt="Mascote Robô CentralDocs"
              className="robot-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;