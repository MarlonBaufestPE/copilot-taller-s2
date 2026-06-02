import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    setLoading(false);
    
    if (result.success) {
      navigate('/welcome');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="card-glass p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium text-text-secondary tracking-tight mb-2">
              Bienvenido
            </h1>
            <p className="text-text-primary text-sm font-light">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="label-text block mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Ingresa tu usuario"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="label-text block mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-secondary/20 border border-secondary rounded-lg p-3">
                <p className="text-text-secondary text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 pt-6 border-t border-surface">
            <p className="text-text-primary text-xs text-center mb-2 font-medium">
              Credenciales de prueba:
            </p>
            <div className="bg-surface/50 rounded-lg p-3 text-left">
              <p className="text-text-primary text-xs font-light">
                <span className="font-medium">Usuario:</span> admin
              </p>
              <p className="text-text-primary text-xs font-light">
                <span className="font-medium">Contraseña:</span> admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-text-primary text-xs font-light">
            FlowOps - Surgical Precision
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
