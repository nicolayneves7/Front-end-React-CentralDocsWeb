import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/LogoCentralDocsNova.png";
import logoBranca from "../../assets/img/LogoCentralDocsBranca.png";
import MenuLateral from "../MenuLateral/MenuLateral";

type HeaderProps = {
  exibirMenuLateral?: boolean;
  exibirNav?: boolean;
  exibirBusca?: boolean;
};

function Header({
  exibirMenuLateral = true,
  exibirNav = true,
  exibirBusca = true,
}: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
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

  const token = localStorage.getItem("token");
  const usuarioSalvo = localStorage.getItem("usuario");

  // Tratamento seguro para o JSON do localStorage
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  // Se o usuário estiver logado (possui token), exibimos o menu lateral, navegação e busca
  const deveExibirMenuLateral = Boolean(token) || exibirMenuLateral;
  const deveExibirNav = Boolean(token) || exibirNav;
  const deveExibirBusca = Boolean(token) || exibirBusca;

  function abrirMenu() {
    setMenuAberto(true);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  function handlePesquisar(e: React.FormEvent) {
    e.preventDefault();

    if (!pesquisa.trim()) {
      return;
    }

    console.log("Pesquisando por:", pesquisa);
  }

  return (
    <>
      {deveExibirMenuLateral && (
        <MenuLateral aberto={menuAberto} fecharMenu={fecharMenu} />
      )}

      <header className="header">
        <div className="container-header">
          <div className="header-left">
            {deveExibirMenuLateral && (
              <button
                className="menu-btn"
                aria-label="Abrir menu"
                onClick={abrirMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}

            <Link to="/" className="header-brand">
              <img
                src={temaEscuro ? logoBranca : logo}
                alt="CentralDocs Logo"
                className="logo-img"
              />
            </Link>
          </div>

          {deveExibirNav && (
            <nav className="header-nav">
              <ul className="nav-lista">
                <li>
                  <Link to="/documentos">Documentos</Link>
                </li>

                <li>
                  <Link to="/Institucional">Sobre nós</Link>
                </li>

                <li>
                  <Link to="/recentes">Recentes</Link>
                </li>
              </ul>
            </nav>
          )}

          <div className="header-acoes">
            {deveExibirBusca && (
              <form className="pesquisa-box" onSubmit={handlePesquisar}>
                <span className="search-icon">⌕</span>

                <input
                  type="text"
                  placeholder="Digite o que você procura..."
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </form>
            )}

            {!token ? (
              <Link to="/login" className="btn-login-header">
                Entrar
              </Link>
            ) : (
              <div className="perfil-header">
                <div className="perfil-avatar">
                  {usuario?.nome?.charAt(0).toUpperCase() ||
                    usuario?.Nome?.charAt(0).toUpperCase() ||
                    "U"}
                </div>

                <div className="perfil-info">
                  <span>Olá,</span>
                  <strong>{usuario?.nome || usuario?.Nome || "Usuário"}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;