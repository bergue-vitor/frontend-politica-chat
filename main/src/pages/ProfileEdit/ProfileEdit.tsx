import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Save, Eye, EyeOff, X } from 'lucide-react';
import '../../styles/profile-edit.css';

export default function ProfileEdit() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSaved(false);
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!currentPassword) {
      setPasswordError('Informe a senha atual.');
      return;
    }
    if (!newPassword) {
      setPasswordError('Informe a nova senha.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      return;
    }
    // updatePassword(currentPassword, newPassword) — chame sua função aqui
    setPasswordSaved(true);
    setTimeout(() => handleCloseModal(), 2000);
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
                <input type="text" className="profile-input" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required />
              </div>
            </div>
            <div className="profile-field">
              <label className="profile-label">E-mail</label>
              <div className="profile-input-wrapper">
                <Mail size={15} className="profile-input-icon" />
                <input type="email" className="profile-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="profile-card-title">Senha</h2>
            <p className="profile-card-desc">Mantenha sua conta segura com uma senha forte</p>
            <button type="button" className="profile-btn-change-password" onClick={() => setShowPasswordModal(true)}>
              <Lock size={14} />
              Alterar senha
            </button>
          </div>

          {saved && <div className="profile-success">Perfil atualizado com sucesso!</div>}

          <div className="profile-actions">
            <button type="button" className="profile-btn-cancel" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit" className="profile-btn-save">
              <Save size={15} />
              Salvar alterações
            </button>
          </div>
        </form>
      </div>

      {/* ── Modal: Alterar Senha ── */}
      {showPasswordModal && (
        <div className="profile-modal-overlay" onClick={handleCloseModal}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div className="profile-modal-title-group">
                <div className="profile-modal-icon">
                  <Lock size={18} />
                </div>
                <h2 className="profile-modal-title">Alterar Senha</h2>
              </div>
              <button type="button" className="profile-modal-close" onClick={handleCloseModal}>
                <X size={16} />
              </button>
            </div>

            <form className="profile-modal-form" onSubmit={handleSavePassword}>
              <div className="profile-field">
                <label className="profile-label">Senha atual</label>
                <div className="profile-input-wrapper">
                  <Lock size={15} className="profile-input-icon" />
                  <input type={showCurrent ? 'text' : 'password'} className="profile-input" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" />
                  <button type="button" className="profile-eye-btn" onClick={() => setShowCurrent(o => !o)}>
                    {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="profile-field">
                <label className="profile-label">Nova senha</label>
                <div className="profile-input-wrapper">
                  <Lock size={15} className="profile-input-icon" />
                  <input type={showNew ? 'text' : 'password'} className="profile-input" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" />
                  <button type="button" className="profile-eye-btn" onClick={() => setShowNew(o => !o)}>
                    {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="profile-field">
                <label className="profile-label">Confirmar nova senha</label>
                <div className="profile-input-wrapper">
                  <Lock size={15} className="profile-input-icon" />
                  <input type={showConfirm ? 'text' : 'password'} className="profile-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                  <button type="button" className="profile-eye-btn" onClick={() => setShowConfirm(o => !o)}>
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {passwordError && <p className="profile-error">{passwordError}</p>}
              {passwordSaved && <div className="profile-success">Senha alterada com sucesso!</div>}

              <div className="profile-modal-actions">
                <button type="button" className="profile-btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className="profile-btn-save" disabled={passwordSaved}>
                  <Save size={15} />
                  Salvar senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}