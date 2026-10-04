'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const regex = /^[a-zA-Z0-9]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Регистрация успешна:', { email, password, gender, birthDate });
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setGender('');
    setBirthDate('');
    setIsGenderOpen(false);
  };

  const getPasswordValidation = () => {
    if (!password) return { text: '', color: 'transparent', isValid: false };

    if (password.length < 8 || password.length > 28) {
      return {
        text: "Пароль должен содержать от 8 до 28 символов",
        color: "#ff3333", // Адаптировано под темный фон
        isValid: false
      };
    }

    if (!regex.test(password)) {
      return {
        text: "Пароль должен содержать только латинские буквы и цифры (без пробелов)",
        color: "#ff3333",
        isValid: false
      };
    }

    return { text: "✔ Пароль подходит", color: "#00ff66", isValid: true };
  };

  const validation = getPasswordValidation();

  const isPasswordMatching = password === confirmPassword;
  const showConfirmError = confirmPassword.length > 0 && !isPasswordMatching;

  const isFormValid =
    email.trim() !== '' &&
    birthDate !== '' &&
    gender !== '' &&
    validation.isValid &&
    isPasswordMatching;

  return (
    <main className="neon-main-layout">
      <div className="neon-app-container">
        <header className="neon-app-header" style={{ gridTemplateColumns: "60px auto" }}>
          <Link href="/" className="neon-btn-link" style={{ fontSize: "20px", margin: "5px" }}>
            ←
          </Link>
          <h1 className="neon-header-title" style={{ paddingRight: "60px" }}>
            {isVisible ? 'Вход' : 'Регистрация'}
          </h1>
        </header>

        {/* ФОРМА ВХОДА */}
        <div className="neon-form-container" style={{ display: isVisible ? 'flex' : 'none' }}>
          <form className="neon-form" onSubmit={handleSubmit}>
            <div className="neon-input-group">
              <label htmlFor="email">Почта</label>
              <input
                id="email"
                type="email"
                placeholder="example@edu.gstu.by"
                className="neon-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="neon-input-group">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                placeholder="Введите пароль"
                className="neon-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="neon-submit-btn">Войти</button>

            <div className="neon-form-footer">
              Ещё нет аккаунта?{' '}
              <span className="neon-form-link" onClick={toggleVisibility}>
                Зарегистрироваться
              </span>
            </div>
          </form>
        </div>

        {/* ФОРМА РЕГИСТРАЦИИ */}
        <div className="neon-form-container" style={{ display: !isVisible ? 'flex' : 'none' }}>
          <form className="neon-form" onSubmit={handleSubmit}>
            <div className="neon-input-group">
              <label htmlFor="reg-email">Почта</label>
              <input
                id="reg-email"
                type="email"
                placeholder="example@edu.gstu.by"
                className="neon-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="neon-input-row">
              {/* Выбор Пола */}
              <div className="neon-input-group neon-gender-container">
                <label>Пол</label>
                <div
                  className="neon-input neon-gender-trigger"
                  onClick={() => setIsGenderOpen(prev => !prev)}
                >
                  <span style={{ color: gender ? '#fff' : '#6575a8' }}>
                    {gender || 'Выбрать'}
                  </span>
                  <span className="arrow">{isGenderOpen ? '▲' : '▼'}</span>
                </div>

                {isGenderOpen && (
                  <ul className="neon-gender-dropdown" onMouseLeave={() => setIsGenderOpen(false)}>
                    <li onClick={() => { setGender('М'); setIsGenderOpen(false); }}>Мужской (М)</li>
                    <li onClick={() => { setGender('Ж'); setIsGenderOpen(false); }}>Женский (Ж)</li>
                  </ul>
                )}
              </div>

              {/* Дата Рождения */}
              <div className="neon-input-group">
                <label htmlFor="reg-birthdate">Дата рождения</label>
                <input
                  id="reg-birthdate"
                  type="date"
                  className="neon-input"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ color: birthDate ? '#fff' : '#6575a8' }}
                />
              </div>
            </div>

            <div className="neon-input-group">
              <label htmlFor="reg-password">Пароль</label>
              <input
                id="reg-password"
                type="password"
                placeholder="Введите пароль"
                className="neon-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {validation.text && (
              <div className='neon-requirements' style={{ color: validation.color }}>
                {validation.text}
              </div>
            )}

            <div className="neon-input-group">
              <label htmlFor="reg-confirm-password">Повторите пароль</label>
              <input
                id="reg-confirm-password"
                type="password"
                placeholder="Повторите пароль"
                className="neon-input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {showConfirmError && (
              <div className="neon-requirements" style={{ color: '#ff3333' }}>
                Пароли не совпадают
              </div>
            )}

            <button type="submit" className="neon-submit-btn" disabled={!isFormValid}>
              Зарегистрироваться
            </button>

            <div className="neon-form-footer">
              Уже есть аккаунт?{' '}
              <div className="neon-form-link" onClick={toggleVisibility}>
                Войти
              </div>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}
