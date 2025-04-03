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
      const response = await fetch('https://formspree.io/f/xgegdvnj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setStatus('success');
        setFormState({
          name: '',
          email: '',
          type: 'suggestion',
          message: ''
        });
      } else {
        throw new Error('Falha ao enviar o formulário');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          <p className="text-white">
            Obrigado pelo seu feedback! Sua mensagem foi enviada com sucesso.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-4">
              <p className="text-white">{errorMessage}</p>
            </div>
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
              'Enviando...'
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