import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, X, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    login({ email, password });
    navigate('/chat');
  }

  function handleRequestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setIsRequestOpen(false);
      setRequestSent(false);
      setRequestName('');
      setRequestEmail('');
    }, 2000);
  }

  function handleCloseRequest() {
    setIsRequestOpen(false);
    setRequestName('');
    setRequestEmail('');
    setRequestSent(false);
  }

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Apresentação">
        <div className="login-brand">
          <span className="login-brand-icon">
            <ShieldCheck size={18} strokeWidth={1.9} />
          </span>
          <div>
            <strong>Assistente de Políticas</strong>
            <span>Baseado em normas internas</span>
          </div>
        </div>
        <div className="login-pill">
          <LockKeyhole size={15} strokeWidth={1.8} />
          Acesso seguro para colaboradores
        </div>
        <div className="login-copy">
          <h1>Consulte políticas internas com clareza e segurança.</h1>
          <p>
            Entre no ambiente adequado para acessar respostas orientadas por
            documentos, normas e processos oficiais da empresa.
          </p>
        </div>
      </section>

      <section className="login-panel" aria-label="Entrar">
        <form className="login-card" onSubmit={handleSubmit}>
          <header className="login-card-header">
            <h2>Entrar</h2>
            <p>Acesse sua conta corporativa para continuar para o assistente.</p>
          </header>
          <label className="login-field">
            <span>E-mail corporativo</span>
            <div className="login-input-shell">
              <input type="email" name="email" placeholder="nome@empresa.com" required />
              <Mail size={17} strokeWidth={1.8} />
            </div>
          </label>
          <label className="login-field">
            <span>Senha</span>
            <div className="login-input-shell">
              <input type="password" name="password" placeholder="Digite sua senha" required />
              <LockKeyhole size={17} strokeWidth={1.8} />
            </div>
          </label>
          <button type="submit" className="login-submit">
            Entrar no assistente
            <ArrowRight size={17} strokeWidth={1.9} />
          </button>

          <div className="login-footer-links">
            <button type="button" className="login-link">Esqueci minha senha</button>
            <button type="button" className="login-link" onClick={() => setIsRequestOpen(true)}>
              solicitar acesso
            </button>
          </div>
        </form>
      </section>

      {/* Modal Solicitar Acesso */}
      {isRequestOpen && (
        <div className="login-modal-backdrop" onClick={handleCloseRequest}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="login-modal-close"
              onClick={handleCloseRequest}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {requestSent ? (
              <div className="login-modal-success">
                <p>Solicitação enviada com sucesso!</p>
                <span>Em breve você receberá um retorno.</span>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit}>
                <h2 className="login-modal-title">Solicitar acesso</h2>
                <p className="login-modal-desc">
                  Preencha os dados abaixo para enviar sua solicitação de acesso à plataforma.
                </p>

                <label className="login-field">
                  <span>Nome completo</span>
                  <div className="login-input-shell">
                    <input
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={requestName}
                      onChange={e => setRequestName(e.target.value)}
                      required
                    />
                  </div>
                </label>

                <label className="login-field" style={{ marginTop: '14px' }}>
                  <span>E-mail corporativo</span>
                  <div className="login-input-shell">
                    <input
                      type="email"
                      placeholder="nome@empresa.com"
                      value={requestEmail}
                      onChange={e => setRequestEmail(e.target.value)}
                      required
                    />
                    <Mail size={17} strokeWidth={1.8} />
                  </div>
                </label>

                <button type="submit" className="login-submit" style={{ marginTop: '22px' }}>
                  Enviar solicitação
                  <Send size={15} strokeWidth={1.9} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}