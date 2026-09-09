import { useEffect, useState } from "react";
import logo from "../../assets/img/LogoCentralDocsNova.png";
import logoBranca from "../../assets/img/LogoCentralDocsBranca.png";
import authVisual from "../../assets/img/cadastro-visual-centraldocs.png";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const [temaEscuro, setTemaEscuro] = useState(() =>
    document.body.classList.contains("tema-escuro")
  );

  useEffect(() => {
    const verificarTema = () => {
      setTemaEscuro(document.body.classList.contains("tema-escuro"));
    };

    verificarTema();

    const observer = new MutationObserver(verificarTema);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-form-area">
          <img
            src={temaEscuro ? logoBranca : logo}
            alt="CentralDocs"
            className="auth-logo"
          />

          {children}
        </div>

        <div className="auth-image-area">
          <img
            src={authVisual}
            alt="Ilustração CentralDocs"
            className="auth-visual"
          />
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;