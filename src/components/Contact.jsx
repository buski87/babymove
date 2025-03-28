import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef();
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("🔍 ENV values:", {
      service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setIsSent(true);
      })
      .catch((error) => {
        console.error('Error al enviar:', error.text);
        setLoading(false);
      });
  };

  return (
    <section id="contacto" className="px-6 py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Contacto</h2>
        <p className="text-gray-600 mt-2">¿Tienes dudas? Escríbenos y te responderemos pronto.</p>
      </div>

      {isSent ? (
        <div className="max-w-xl mx-auto text-center p-8 bg-green-50 border border-green-200 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-green-700">¡Mensaje enviado correctamente!</h3>
          <p className="mt-2 text-gray-700">Nos pondremos en contacto en menos de 24h.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="max-w-xl mx-auto space-y-6 bg-gray-50 p-6 rounded-xl shadow"
        >
          <div>
            <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="reply_to" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="reply_to"
              id="reply_to"
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      )}
    </section>
  );
}
