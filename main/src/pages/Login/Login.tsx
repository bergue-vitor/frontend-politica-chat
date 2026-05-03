import { useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    login({ email, password });
    navigate('/chat');
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
        </form>
      </section>
    </main>
  );
}
