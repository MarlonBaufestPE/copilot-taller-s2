import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Welcome = () => {
  const { user, logout } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const data = await authService.getProtectedData();
        setProtectedData(data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-surface bg-neutral shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-text-secondary text-xl font-medium">
            FlowOps Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="text-text-primary text-sm font-medium hover:text-text-secondary transition-colors duration-150"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {/* Welcome Card */}
          <div className="card">
            <div className="text-center py-8">
              <h1 className="text-5xl md:text-6xl font-medium text-text-secondary tracking-tight mb-4">
                ¡Bienvenido!
              </h1>
              <p className="text-text-primary text-lg font-light">
                Has iniciado sesión exitosamente
              </p>
            </div>
          </div>

          {/* User Info Card */}
          <div className="card-glass p-6">
            <h3 className="text-text-secondary text-xl font-medium mb-4">
              Información del Usuario
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-surface">
                <span className="label-text">Usuario:</span>
                <span className="text-text-secondary font-medium">
                  {user?.username || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-surface">
                <span className="label-text">Estado:</span>
                <span className="text-text-secondary font-medium">
                  Autenticado
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="label-text">Sesión:</span>
                <span className="text-text-secondary font-medium">
                  Activa
                </span>
              </div>
            </div>
          </div>

          {/* Protected Data Card */}
          <div className="card-glass p-6">
            <h3 className="text-text-secondary text-xl font-medium mb-4">
              Datos Protegidos
            </h3>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-text-primary text-sm">Cargando datos...</p>
              </div>
            ) : protectedData ? (
              <div className="bg-surface/50 rounded-lg p-4">
                <p className="text-text-primary text-sm font-light mb-2">
                  <span className="font-medium">Usuario:</span> {protectedData.username}
                </p>
                <p className="text-text-primary text-sm font-light">
                  <span className="font-medium">Mensaje:</span> {protectedData.message}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-primary text-sm">No se pudieron cargar los datos</p>
              </div>
            )}
          </div>

          {/* Actions Card */}
          <div className="card-glass p-6">
            <h3 className="text-text-secondary text-xl font-medium mb-4">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleLogout}
                className="btn-primary"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-surface text-text-secondary rounded-full px-10 py-2.5 font-medium text-sm leading-5 tracking-wide transition-all duration-150 ease-in-out hover:bg-surface/80"
              >
                Actualizar Datos
              </button>
            </div>
          </div>

          {/* Token Info */}
          <div className="card-glass p-6">
            <h3 className="text-text-secondary text-xl font-medium mb-4">
              Información de Seguridad
            </h3>
            <div className="bg-tertiary/20 border border-tertiary rounded-lg p-4">
              <p className="text-text-primary text-xs font-light">
                ⚡ Tu sesión está protegida con JWT (JSON Web Token)
              </p>
              <p className="text-text-primary text-xs font-light mt-2">
                🔒 El token expira en 5 minutos (300 segundos)
              </p>
              <p className="text-text-primary text-xs font-light mt-2">
                🔄 Serás redirigido al login automáticamente si el token expira
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-text-primary text-xs font-light">
            FlowOps - Surgical Precision © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
