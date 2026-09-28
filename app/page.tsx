'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FormState {
  firstName: string;
  lastName: string;
  address: string;
  commune: string;
  phone: string;
  email: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  address?: string;
  commune?: string;
  phone?: string;
  email?: string;
}

const N8N_WEBHOOK_URL = 'https://sofisou.app.n8n.cloud/webhook-test/al-pazzo-cotizacion';

const PIZZAS = [
  {
    name: 'Pomodoro',
    badge: 'Clásica',
    ingredients: 'Salsa de tomate, queso mozzarella y albahaca fresca.',
  },
  {
    name: 'Jamón & Queso',
    badge: 'Especial',
    ingredients: 'Salsa de tomate, queso mozzarella, queso granulado y prosciutto.',
  },
  {
    name: 'Pepperoni',
    badge: 'Favorita',
    ingredients: 'Salsa de tomate, queso mozzarella y pepperoni.',
  },
  {
    name: 'Mascarpone',
    badge: 'Gourmet',
    ingredients: 'Salsa de tomate, queso mozzarella, jamón serrano y mascarpone.',
  },
  {
    name: 'Mechada & Palta',
    badge: 'Firma',
    ingredients: 'Salsa de tomate, palta, carne mechada y queso mozzarella.',
  },
  {
    name: 'Quattro Formaggi',
    badge: 'Selección',
    ingredients: 'Salsa de tomate, queso mozzarella, queso azul, gouda y parmigiano.',
  },
  {
    name: 'Pesto',
    badge: 'Fresca',
    ingredients: 'Salsa de tomate, pesto, queso mozzarella y tomates cherry.',
  },
  {
    name: 'La Veggie',
    badge: 'Vegetariana',
    ingredients: 'Salsa de tomate, queso mozzarella, champiñones salteados, pimentón y cebolla.',
  },
  {
    name: 'La Trufada',
    badge: 'Especialidad',
    ingredients: 'Salsa de tomate, queso mozzarella, un toque de mascarpone, aceite de trufa y champiñones.',
  },
  {
    name: 'Carnívora',
    badge: 'Intensa',
    ingredients: 'Salsa de tomate, tocino, pepperoni, carne molida y prosciutto.',
  },
];

export default function Home() {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    address: '',
    commune: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    const trimmed = value.trim();
    switch (name) {
      case 'firstName':
        return trimmed ? undefined : 'Por favor ingresa tu nombre.';
      case 'lastName':
        return trimmed ? undefined : 'Por favor ingresa tu apellido.';
      case 'address':
        return trimmed ? undefined : 'Por favor ingresa tu dirección de domicilio.';
      case 'commune':
        return trimmed ? undefined : 'Por favor ingresa tu comuna.';
      case 'phone': {
        const clean = value.replace(/[\s\-\+\(\)]/g, '');
        return clean.length >= 8 && /^\d+$/.test(clean)
          ? undefined
          : 'Ingresa un número de teléfono válido (ej: +56 9 1234 5678).';
      }
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(trimmed)
          ? undefined
          : 'Ingresa un correo electrónico válido.';
      }
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormState;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormState;
    if (value.trim() !== '') {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasError = false;

    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) {
        newErrors[key] = err;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (hasError) {
      setSubmitSuccess(false);
      setSubmitError(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        nombre: formData.firstName.trim(),
        apellido: formData.lastName.trim(),
        direccion: formData.address.trim(),
        comuna: formData.commune.trim(),
        telefono: formData.phone.trim(),
        email: formData.email.trim(),
        fechaInscripcion: new Date().toISOString(),
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Respuesta del servidor no válida (${response.status})`);
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        commune: '',
        phone: '',
        email: '',
      });
    } catch (err) {
      console.error('Error al enviar webhook a n8n:', err);
      setSubmitError('Ocurrió un inconveniente al procesar tu solicitud. Por favor intenta nuevamente.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER / NAVEGACIÓN */}
      <header className="header" id="header">
        <div className="container">
          <nav className="header-nav">
            <a href="#" className="header-logo" aria-label="Al Pazzo Inicio">
              <Image
                src="/logo.jpeg"
                alt="Logo Al Pazzo"
                width={120}
                height={42}
                priority
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
              <span className="header-logo-text">Al Pazzo</span>
            </a>
            <a href="#formulario" className="btn btn-primary header-cta">
              Inscribirse
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Banquetería Boutique en Santiago
          </div>

          <div style={{ margin: '0 auto 24px auto', maxWidth: '220px' }}>
            <Image
              src="/logo.jpeg"
              alt="Logo Al Pazzo - Banquetería Boutique de Pizzas Artesanales"
              width={220}
              height={140}
              priority
              className="hero-logo-img"
            />
          </div>

          <h1 className="hero-title">
            Pizzas artesanales hechas para <span>compartir y celebrar</span>
          </h1>

          <p className="hero-description">
            Llevamos la experiencia gastronómica del horno artesanal a tus cumpleaños, aniversarios y encuentros privados. Una propuesta sabrosa, cercana y sin complicaciones.
          </p>

          <div className="hero-cta-group">
            <a href="#formulario" className="btn btn-primary">
              Inscribirse
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <span className="hero-subtext">Reserva con anticipación para coordinar la fecha de tu evento</span>
          </div>
        </div>
      </section>

      {/* QUÉ ES AL PAZZO / EXPERIENCIA */}
      <section className="experience-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag">La Experiencia</span>
            <h2 className="section-title">Celebrar alrededor del fuego</h2>
            <p className="section-subtitle">
              Al Pazzo combina inspiración italiana, preparación artesanal en vivo e ingredientes seleccionados para que disfrutes junto a tus invitados.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c1.1 0 2 .9 2 2v2.26c2.28.46 4 2.48 4 4.89V19c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-7.85c0-2.41 1.72-4.43 4-4.89V4c0-1.1.9-2 2-2z"></path>
                  <path d="M8.5 14h7"></path>
                </svg>
              </div>
              <h3 className="feature-title">Horneado Artesanal</h3>
              <p className="feature-text">
                Masa de fermentación cuidada, ingredientes de primera calidad y el toque inconfundible del horneado tradicional.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="feature-title">Pensado para Compartir</h3>
              <p className="feature-text">
                Formato dinámico y relajado, donde las pizzas se disfrutan calientes al centro para compartir en grupo.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="feature-title">Servicio Boutique</h3>
              <p className="feature-text">
                Atención cercana y coordinada en Santiago, adaptada a la escala y calidez de tu celebración privada.
              </p>
            </div>
          </div>

          <div className="occasions-box">
            <h3 className="occasions-title">Ideal para cualquier ocasión especial</h3>
            <div className="occasions-tags">
              <span className="occasion-tag">Cumpleaños</span>
              <span className="occasion-tag">Aniversarios</span>
              <span className="occasion-tag">Celebraciones Familiares</span>
              <span className="occasion-tag">Encuentros con Amigos</span>
              <span className="occasion-tag">Eventos de Empresa</span>
            </div>
          </div>
        </div>
      </section>

      {/* LE PIZZE (MENÚ OFICIAL) */}
      <section className="pizze-section" id="menu">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag">Nuestras Pizzas</span>
            <h2 className="section-title">Le Pizze</h2>
            <p className="section-subtitle">
              Recetas artesanales preparadas con ingredientes seleccionados. La única fuente oficial de nuestra banquetería.
            </p>
          </div>

          <div className="pizze-grid">
            {PIZZAS.map((pizza) => (
              <article key={pizza.name} className="pizza-card">
                <div>
                  <div className="pizza-header">
                    <h3 className="pizza-name">{pizza.name}</h3>
                    <span className="pizza-badge">{pizza.badge}</span>
                  </div>
                  <div>
                    <span className="pizza-ingredients-label">Ingredientes:</span>
                    <p className="pizza-ingredients">{pizza.ingredients}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="how-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag">Paso a Paso</span>
            <h2 className="section-title">Cómo coordinar tu evento</h2>
            <p className="section-subtitle">Inscribirte es el primer paso para organizar una celebración inolvidable.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Inscríbete</h3>
              <p className="step-desc">Completa el formulario con tus datos de contacto y la ubicación estimada de tu evento.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Coordinamos juntos</h3>
              <p className="step-desc">Te contactaremos para conocer los detalles, fecha y cantidad estimada de invitados.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Disfruta tu evento</h3>
              <p className="step-desc">Llevamos el sabor y la experiencia boutique de Al Pazzo directamente a tu celebración.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO DE INSCRIPCIÓN */}
      <section className="form-section" id="formulario">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <span className="section-tag">Inscripción de Contacto</span>
              <h2>Inscríbete para tu evento</h2>
              <p>Déjanos tus datos obligatorios y te contactaremos para coordinar tu celebración.</p>
            </div>

            {submitSuccess && (
              <div className="status-alert status-alert-info visible" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <div>
                  <strong>¡Inscripción recibida con éxito!</strong> Muchas gracias por registrarte. Te contactaremos a la brevedad para coordinar todos los detalles de tu evento.
                </div>
              </div>
            )}

            {submitError && (
              <div className="status-alert visible" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', color: 'var(--primary)' }} role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>{submitError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-grid form-grid-2col">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      Nombre <span className="form-label-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                      autoComplete="given-name"
                      placeholder="Ej: Mateo"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      required
                    />
                    {errors.firstName && <span className="form-error-msg visible">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Apellido <span className="form-label-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                      autoComplete="family-name"
                      placeholder="Ej: Rossi"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      required
                    />
                    {errors.lastName && <span className="form-error-msg visible">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Dirección de domicilio <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-input ${errors.address ? 'is-invalid' : ''}`}
                    autoComplete="street-address"
                    placeholder="Ej: Av. Providencia 1234, Depto 501"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.address && <span className="form-error-msg visible">{errors.address}</span>}
                </div>

                <div className="form-grid form-grid-2col">
                  <div className="form-group">
                    <label htmlFor="commune" className="form-label">
                      Comuna <span className="form-label-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="commune"
                      name="commune"
                      className={`form-input ${errors.commune ? 'is-invalid' : ''}`}
                      autoComplete="address-level2"
                      placeholder="Ej: Las Condes, Providencia..."
                      value={formData.commune}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      required
                    />
                    {errors.commune && <span className="form-error-msg visible">{errors.commune}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Teléfono <span className="form-label-required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                      autoComplete="tel"
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      required
                    />
                    {errors.phone && <span className="form-error-msg visible">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico <span className="form-label-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                    autoComplete="email"
                    placeholder="ejemplo@correo.cl"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.email && <span className="form-error-msg visible">{errors.email}</span>}
                </div>

                <div style={{ marginTop: '10px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    id="submitBtn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Inscribirme'}
                  </button>
                </div>
              </div>
            </form>

            <p className="form-notice">
              Tus datos serán utilizados únicamente para contactarte respecto a tu inscripción y la coordinación de tu evento.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER / CIERRE */}
      <footer className="footer">
        <div className="container">
          <Image
            src="/logo.jpeg"
            alt="Al Pazzo Logo"
            width={160}
            height={100}
            className="footer-logo-img"
          />
          <p className="footer-tagline">Celebrar alrededor de una gran pizza artesanal.</p>
          <div className="footer-cta-btn">
            <a href="#formulario" className="btn btn-primary">
              Inscribirse
            </a>
          </div>
          <p className="footer-copy">
            &copy; Al Pazzo - Banquetería Boutique de Pizzas Artesanales. Santiago, Chile.
          </p>
        </div>
      </footer>

      {/* STICKY BAR EN MÓVIL */}
      <div className="sticky-bar" id="stickyBar">
        <a href="#formulario" className="btn btn-primary">
          Inscribirse
        </a>
      </div>
    </>
  );
}
