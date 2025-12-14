import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Lock, User } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="glass-card p-10 rounded-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-brand-accent/10 rounded-full">
            <Lock className="w-8 h-8 text-brand-accent" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-8">Вход в Админку</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Логин</label>
            <div className="relative">
              <User className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-brand-black/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-brand-accent"
                placeholder="Имя пользователя"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-brand-accent"
                placeholder="Введите пароль"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Проверка...' : 'Войти'}
          </Button>
        </form>
      </div>
    </Section>
  );
};