import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import '../../styles/profile-edit.css';

export default function ProfileEdit() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <button type="button" className="profile-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Voltar
          </button>
          <div>
            <h1 className="profile-title">Editar Perfil</h1>
            <p className="profile-subtitle">Gerencie suas informações pessoais e senha</p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>

          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <User size={36} strokeWidth={1.5} />
            </div>
            <div>
              <p className="profile-avatar-name">{user.name}</p>
              <p className="profile-avatar-role">{user.role === '2' ? 'Administrador' : 'Usuário'}</p>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="profile-card-title">Informações Pessoais</h2>

            <div className="profile-field">
              <label className="profile-label">Nome</label>
              <div className="profile-input-wrapper">
                <User size={15} className="profile-input-icon" />
                <input
                  type="text"
                  className="profile-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            <div className="profile-field">
              <label className="profile-label">E-mail</label>
              <div className="profile-input-wrapper">
                <Mail size={15} className="profile-input-icon" />
                <input
                  type="email"
                  className="profile-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="profile-card-title">Alterar Senha</h2>
            <p className="profile-card-desc">Deixe em branco para manter a senha atual</p>

            <div className="profile-field">
              <label className="profile-label">Senha atual</label>
              <div className="profile-input-wrapper">
                <Lock size={15} className="profile-input-icon" />
                <input
                  type={showCurrent ? 'text' : 'password'}
                  className="profile-input"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="profile-eye-btn" onClick={() => setShowCurrent(o => !o)}>
                  {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label className="profile-label">Nova senha</label>
              <div className="profile-input-wrapper">
                <Lock size={15} className="profile-input-icon" />
                <input
                  type={showNew ? 'text' : 'password'}
                  className="profile-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="profile-eye-btn" onClick={() => setShowNew(o => !o)}>
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label className="profile-label">Confirmar nova senha</label>
              <div className="profile-input-wrapper">
                <Lock size={15} className="profile-input-icon" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="profile-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="profile-eye-btn" onClick={() => setShowConfirm(o => !o)}>
                  {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="profile-error">{error}</p>}
          {saved && <div className="profile-success">Perfil atualizado com sucesso!</div>}

          <div className="profile-actions">
            <button type="button" className="profile-btn-cancel" onClick={() => navigate(-1)}>
              Cancelar
            </button>
            <button type="submit" className="profile-btn-save">
              <Save size={15} />
              Salvar alterações
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}


