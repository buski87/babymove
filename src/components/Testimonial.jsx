import client1 from '../assets/testimonios/client1.webp';
import client2 from '../assets/testimonios/client2.webp';
import client3 from '../assets/testimonios/client3.webp';

const testimonials = [
  {
    name: 'Laura Martínez',
    role: 'Mamá primeriza',
    comment: 'El carrito llegó rápido, se nota la calidad en los materiales.',
    image: client1,
  },
  {
    name: 'Ana Pérez',
    role: 'Madre de dos',
    comment: 'Buscaba seguridad y comodidad, y este carrito lo tiene todo.',
    image: client2,
  },
  {
    name: 'Carlos Gómez',
    role: 'Papá moderno',
    comment: 'Fácil de montar y súper ligero, ideal para ciudad.',
    image: client3,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-20 bg-white" id="testimonios">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Testimonios</h2>
        <p className="text-gray-600 mt-4">Opiniones reales de nuestros clientes satisfechos.</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl shadow text-center">
            <img
              src={t.image}
              alt={t.name}
              className="w-12 h-12 rounded-full mb-4 object-cover mx-auto"
            />
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
            <p className="text-gray-600 text-sm mt-2">“{t.comment}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
