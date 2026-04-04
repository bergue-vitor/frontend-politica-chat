import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginAsAdmin, loginAsUser } = useAuth();

  function handleLoginAdmin() {
    loginAsAdmin();
    navigate('/admin/users');
  }

  function handleLoginUser() {
    loginAsUser();
    navigate('/chat');
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLoginAdmin}>Entrar como Admin</button>
      <button onClick={handleLoginUser}>Entrar como User</button>
    </div>
  );
}