import "./Header.css";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/LogoCentralDocsNova.png";
import logoBranca from "../../assets/img/LogoCentralDocsBranca.png";
import MenuLateral from "../MenuLateral/MenuLateral";

type HeaderProps = {
  exibirMenuLateral?: boolean;
  exibirNav?: boolean;
  exibirBusca?: boolean;
};

type PaginaSearch = {
  titulo: string;
  rota: string;
  categoria: string;
  palavrasChave: string[];
};

const PAGINAS_SISTEMA: PaginaSearch[] = [
  { titulo: "Início / Home", rota: "/", categoria: "Navegação", palavrasChave: ["inicio", "home", "principal", "centraldocs"] },
  { titulo: "Meus Documentos", rota: "/documentos", categoria: "Documentos", palavrasChave: ["documentos", "documento", "arquivos", "pastas", "meus documentos", "lista"] },
  { titulo: "Cadastrar Novo Documento", rota: "/documentos/novo", categoria: "Documentos", palavrasChave: ["cadastrar", "novo", "adicionar", "enviar", "upload", "criar documento"] },
  { titulo: "Demonstração Mobile", rota: "/demonstracao", categoria: "Recursos", palavrasChave: ["demonstracao", "mobile", "app", "tour", "recursos", "celular"] },
  { titulo: "Sobre Nós / Institucional", rota: "/institucional", categoria: "Empresa", palavrasChave: ["sobre", "institucional", "empresa", "nos", "quem somos"] },
  { titulo: "Perfil do Usuário", rota: "/perfil", categoria: "Conta", palavrasChave: ["perfil", "conta", "usuario", "meus dados", "foto"] },
  { titulo: "Acessibilidade", rota: "/acessibilidade", categoria: "Configurações", palavrasChave: ["acessibilidade", "tema", "daltónico", "contraste", "cores", "protanopia", "tritanopia", "escuro"] },
  { titulo: "Perguntas Frequentes / FAQ", rota: "/perguntas-frequentes", categoria: "Ajuda", palavrasChave: ["faq", "perguntas", "frequentes", "duvidas", "ajuda", "suporte"] },
  { titulo: "Configurações", rota: "/configuracoes", categoria: "Configurações", palavrasChave: ["configuracoes", "configuracao", "ajustes", "preferencias"] },
  { titulo: "Login / Entrar", rota: "/login", categoria: "Conta", palavrasChave: ["login", "entrar", "acesso"] },
  { titulo: "Cadastro / Criar Conta", rota: "/cadastro", categoria: "Conta", palavrasChave: ["cadastro", "registrar", "criar conta"] },
  { titulo: "Recuperar Senha", rota: "/esqueceu-senha", categoria: "Conta", palavrasChave: ["esqueceu", "senha", "recuperar", "redefinir"] },
];

function Header({
  exibirMenuLateral = true,
  exibirNav = true,
  exibirBusca = true,
}: HeaderProps) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(() =>
    document.body.classList.contains("tema-escuro")
  );
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setDropdownAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const token = localStorage.getItem("token");
  const usuarioSalvo = localStorage.getItem("usuario");
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const deveExibirMenuLateral = Boolean(token) || exibirMenuLateral;
  const deveExibirNav = Boolean(token) || exibirNav;
  const deveExibirBusca = Boolean(token) || exibirBusca;

  const resultadosBusca = pesquisa.trim()
    ? PAGINAS_SISTEMA.filter((pag) => {
        const termo = pesquisa.toLowerCase().trim();
        const tituloMatch = pag.titulo.toLowerCase().includes(termo);
        const palavraMatch = pag.palavrasChave.some((p) => p.includes(termo));
        return tituloMatch || palavraMatch;
      })
    : [];

  function irParaRota(rota: string) {
    navigate(rota);
    setPesquisa("");
    setDropdownAberto(false);
  }

  function handlePesquisar(e: React.FormEvent) {
    e.preventDefault();

    if (!pesquisa.trim()) {
      return;
    }

    if (resultadosBusca.length > 0) {
      irParaRota(resultadosBusca[0].rota);
    } else {
      irParaRota("/documentos");
    }
  }

  function abrirMenu() {
    setMenuAberto(true);
  }

  function fecharMenu() {
    setMenuAberto(false);
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
              </ul>
            </nav>
          )}

          <div className="header-acoes">
            {deveExibirBusca && (
              <div className="pesquisa-wrapper" ref={searchContainerRef}>
                <form className="pesquisa-box" onSubmit={handlePesquisar}>
                  <span className="search-icon">⌕</span>

                  <input
                    type="text"
                    placeholder="Digite o que você procura..."
                    value={pesquisa}
                    onChange={(e) => {
                      setPesquisa(e.target.value);
                      setDropdownAberto(true);
                    }}
                    onFocus={() => setDropdownAberto(true)}
                  />
                </form>

                {dropdownAberto && pesquisa.trim().length > 0 && (
                  <div className="pesquisa-dropdown">
                    {resultadosBusca.length > 0 ? (
                      resultadosBusca.map((item, idx) => (
                        <div
                          key={idx}
                          className="pesquisa-item-result"
                          onClick={() => irParaRota(item.rota)}
                        >
                          <span className="pesquisa-item-title">{item.titulo}</span>
                          <span className="pesquisa-item-tag">{item.categoria}</span>
                        </div>
                      ))
                    ) : (
                      <div className="pesquisa-item-result empty">
                        <span className="pesquisa-item-title">Nenhuma página encontrada</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
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