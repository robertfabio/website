"use client";

import { FC, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeedbackForm: FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Using form data instead of JSON for better compatibility
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('https://formspree.io/f/xgegdvnj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormState({
          name: '',
          email: '',
          type: 'suggestion',
          message: ''
        });
      } else {
        throw new Error(responseData.error || 'Falha ao enviar o formulário');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, verifique sua conexão e tente novamente. ' +
        'Se o problema persistir, você pode entrar em contato diretamente por email.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Feedback e Sugestões</h3>
      
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-4"
        >
          <p className="text-white mb-4">
            Obrigado pelo seu feedback! Sua mensagem foi enviada com sucesso.
          </p>
          <button
            onClick={resetForm}
            className="text-white/80 hover:text-white underline text-sm"
          >
            Enviar outro feedback
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-4"
            >
              <p className="text-white mb-2">{errorMessage}</p>
              <a
                href="mailto:fabio.filho25453@alunos.ufersa.edu.br"
                className="text-white/80 hover:text-white underline text-sm"
              >
                Enviar por email diretamente
              </a>
            </motion.div>
          )}
          
          <div>
            <label htmlFor="name" className="block mb-2 text-sm sm:text-base">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 text-sm sm:text-base"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm sm:text-base">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 text-sm sm:text-base"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="type" className="block mb-2 text-sm sm:text-base">
              Tipo de Feedback
            </label>
            <select
              id="type"
              name="type"
              value={formState.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 text-sm sm:text-base"
              disabled={status === 'submitting'}
            >
              <option value="suggestion">Sugestão</option>
              <option value="interest">Interesse em Participar</option>
              <option value="question">Dúvida</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm sm:text-base">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1000}
              rows={4}
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 text-sm sm:text-base"
              disabled={status === 'submitting'}
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-white text-primary font-semibold rounded hover:bg-white/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Enviar Feedback
                <FaArrowRight size={16} />
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm; 