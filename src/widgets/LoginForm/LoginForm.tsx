import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Eye, EyeOff, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuthStore } from '../../features/auth/model/authStore';

const schema = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(1, 'Обязательное поле'),
  rememberMe: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export const LoginForm = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rememberMe: false },
  });

  const usernameValue = watch('username');

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError(null);
      await login(values.username, values.password, values.rememberMe);
      navigate('/products');
    } catch {
      setServerError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7]">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-105 flex flex-col items-center">

        <div className="mb-4">
          <img src={logo} alt="logo" className="h-9 w-auto" />
        </div>

        <h1 className="text-[22px] font-bold text-gray-900 mb-1">Добро пожаловать!</h1>
        <p className="text-sm text-gray-400 mb-6">Пожалуйста, авторизируйтесь</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Логин</label>
            <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 transition-colors focus-within:border-blue-500 ${errors.username ? 'border-red-400' : 'border-gray-200'}`}>
              <User size={16} className="text-gray-400 shrink-0" />
              <input
                {...register('username')}
                placeholder="Логин"
                autoComplete="username"
                className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-300"
              />
              {usernameValue && (
                <button
                  type="button"
                  onClick={() => setValue('username', '')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Пароль</label>
            <div className={`flex items-center border rounded-lg px-3 py-2.5 gap-2 transition-colors focus-within:border-blue-500 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}>
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                autoComplete="current-password"
                className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password.message}</span>
            )}
          </div>

          {/* Запомнить */}
          <div className="flex items-center gap-2">
            <input
              {...register('rememberMe')}
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-500 cursor-pointer select-none">
              Запомнить данные
            </label>
          </div>

          {serverError && (
            <span className="text-red-500 text-sm text-center">{serverError}</span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg py-3 w-full transition-colors mt-1"
          >
            {isSubmitting ? 'Входим...' : 'Войти'}
          </button>

          <p className="text-center text-gray-400 text-sm">или</p>

          <p className="text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Создать
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};
