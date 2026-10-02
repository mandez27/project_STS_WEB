'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(''); // Стейт для даты рождения
  const [gender, setGender] = useState(''); // Хранит выбранное значение ('М' или 'Ж')
  const [isGenderOpen, setIsGenderOpen] = useState(false); // Отвечает за открытие списка
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
        color: "#ff0000",
        isValid: false
      };
    }

    if (!regex.test(password)) {
      return {
        text: "Пароль должен содержать только латинские буквы и цифры (без пробелов)",
        color: "#ff0000",
        isValid: false
      };
    }

    return { text: "✔ Пароль подходит", color: "#00aa00", isValid: true };
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
    <main style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      margin: 0
    }}>
      <style>{`
        .app-container {
          height: 100vh;
          width: 100%;
          max-width: 600px;
          background-color: #ffffff;
          display: grid;
          grid-template-rows: 60px auto;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .app-header {
          display: grid;
          grid-template-columns: 60px auto;
          border-bottom: 1px solid #eee;
        }
        .header-title {
          margin: 0;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justifyContent: center;
          padding-right: 60px; 
        }
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          padding: 20px;
          height: 100%;
          box-sizing: border-box; 
        }
        .register-form {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .input-group label {
          font-size: 0.9rem;
          color: #555;
        }
        .form-input {
          height: 45px;
          padding: 0 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: #0070f3;
        }
        
        .form-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        .form-row .input-group:first-child {
          flex: 1;
        }
        .form-row .input-group:last-child {
          flex: 2;
        }

        .gender-container {
          position: relative;
        }
        .gender-trigger {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          cursor: pointer;
          background-color: #fff;
          user-select: none;
        }
        .gender-trigger:hover {
          border-color: #a6a6a6;
        }
        .gender-trigger .arrow {
          font-size: 0.7rem;
          color: #888;
        }
        
        .gender-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 5px 0;
          margin: 2px 0 0 0;
          list-style: none;
          z-index: 99;
        }
        .gender-dropdown li {
          padding: 10px 12px;
          font-size: 0.9rem;
          cursor: pointer;
          color: #333;
          transition: background-color 0.15s;
        }
        .gender-dropdown li:hover {
          background-color: #f5f5f5;
          color: #0070f3;
        }

        .submit-btn {
          height: 45px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #0056b3;
        }
        /* Стили для неактивного состояния кнопки */
        .submit-btn:disabled {
          background-color: #cccccc;
          color: #888888;
          cursor: not-allowed;
        }
        
        .form-footer {
          margin-top: 15px;
          font-size: 0.85rem;
          color: #666;
          text-align: center;
        }
        .form-link {
          color: #0070f3;
          text-decoration: none;
          cursor: pointer;
        }
        .form-link:hover {
          text-decoration: underline;
        }
        .password-requirements {
          font-size: 0.8rem;
          margin-top: 4px;
          line-height: 1.3;
        }
      `}</style>

      <div className="app-container">
        <header className="app-header">
          <Link href="/" style={{
            backgroundColor: "#999",
            color: "#fff",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: 'none',
            cursor: "pointer"
          }}>
            ←
          </Link>
          <h1 className="header-title">{isVisible ? 'Вход' : 'Регистрация'}</h1>
        </header>

        {/* ФОРМА ВХОДА */}
        <div className="form-container" style={{ display: isVisible ? 'flex' : 'none' }}>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Почта</label>
              <input
                id="email"
                type="email"
                placeholder="example@edu.gstu.by"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                placeholder="Введите пароль"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Войти</button>

            <div className="form-footer">
              Ещё нет аккаунта?{' '}
              <span className="form-link" onClick={toggleVisibility}>
                Зарегистрироваться
              </span>
            </div>
          </form>
        </div>

        {/* ФОРМА РЕГИСТРАЦИИ */}
        <div className="form-container" style={{ display: !isVisible ? 'flex' : 'none' }}>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="reg-email">Почта</label>
              <input
                id="reg-email"
                type="email"
                placeholder="example@edu.gstu.by"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              {/* Выбор Пола */}
              <div className="input-group gender-container">
                <label>Пол</label>
                <div
                  className="form-input gender-trigger"
                  onClick={() => setIsGenderOpen(prev => !prev)}
                >
                  <span style={{ color: gender ? '#000' : '#999' }}>
                    {gender || 'Выбрать'}
                  </span>
                  <span className="arrow">{isGenderOpen ? '▲' : '▼'}</span>
                </div>

                {isGenderOpen && (
                  <ul className="gender-dropdown" onMouseLeave={() => setIsGenderOpen(false)}>
                    <li onClick={() => { setGender('М'); setIsGenderOpen(false); }}>Мужской (М)</li>
                    <li onClick={() => { setGender('Ж'); setIsGenderOpen(false); }}>Женский (Ж)</li>
                  </ul>
                )}
              </div>

              {/* Дата Рождения */}
              <div className="input-group">
                <label htmlFor="reg-birthdate">Дата рождения</label>
                <input
                  id="reg-birthdate"
                  type="date"
                  className="form-input"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ color: birthDate ? '#000' : '#999' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-password">Пароль</label>
              <input
                id="reg-password"
                type="password"
                placeholder="Введите пароль"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {validation.text && (
              <div className='password-requirements' style={{ color: validation.color }}>
                {validation.text}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="reg-confirm-password">Повторите пароль</label>
              <input
                id="reg-confirm-password"
                type="password"
                placeholder="Повторите пароль"
                className="form-input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {showConfirmError && (
              <div className="password-requirements" style={{ color: '#ff0000' }}>
                Пароли не совпадают
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={!isFormValid}>
              Зарегистрироваться
            </button>

            <div className="form-footer">
              Уже есть аккаунт?{' '}
              <div className="form-link" onClick={toggleVisibility}>
                Войти
              </div>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}
