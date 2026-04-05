import { useEffect } from 'react';
import { Moon, Sun, ChevronDown, ChevronUp, Check, Copy } from 'lucide-react';
import { siteData } from '../data';
import { useState } from 'react';

// Reusable Components
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const cleanText = text.replace("▶ BİTİRİCİ CEVAP\n", "").replace("▶ REFLEKS CEVAP\n", "").replace(/"/g, "");
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="copy-btn no-print" onClick={handleCopy} title="Metni Kopyala">
      {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
    </button>
  );
};

const Accordion = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="tactic-accordion">
      <button className="tactic-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="tactic-body">{content}</div>}
    </div>
  );
};

const Home = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => {
  const [activeSection, setActiveSection] = useState('argumanlar');

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['argumanlar', 'curutmeler', 'tuzak'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 400) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="animate-on-scroll fade-up no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          <img src="/logo.png" alt="Paradigma Logo" style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '4px' }} />
          PARADİGMA.
        </div>
        <div className="nav-links">
          <a href="#argumanlar">Argümanlar</a>
          <a href="#curutmeler">Çürütmeler</a>
          <a href="/kaynaklar">Kaynaklar</a>
          <button onClick={() => setDarkMode(!darkMode)} title="Karanlık Mod">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="/docs/munazara.pdf" target="_blank" className="pdf-btn">PDF İndir</a>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="tagline animate-on-scroll slide-right delay-100">MÜNAZARA EL KİTABI</div>
          <h1 className="hero-title animate-on-scroll slide-right delay-200">
            {siteData.title} <br /><span>{siteData.titleHighlight}</span><br />{siteData.titleEnd}
          </h1>
          <p className="hero-desc animate-on-scroll slide-right delay-300">{siteData.subtitle}</p>
          <a href="#argumanlar" className="hero-btn animate-on-scroll slide-right delay-400 no-print">
            Argümanlara geç →
          </a>
        </div>
        <div className="hero-right">
          <div className="dark-card animate-on-scroll slide-left delay-300">
            <div className="dark-tag">BİZİM TEZİMİZ</div>
            <p>{siteData.tez}</p>
          </div>
          <div className="dark-card animate-on-scroll slide-left delay-500" style={{ opacity: 0.7 }}>
            <div className="dark-tag" style={{ color: '#888' }}>KARŞI TEZ</div>
            <p style={{ textDecoration: 'line-through' }}>{siteData.karsiTez}</p>
          </div>
        </div>
      </div>

      <div className="layout-container">
        {/* Sticky Sidebar ToC */}
        <div className="toc-sidebar no-print">
          <h4>İçindekiler</h4>
          <ul className="toc-list">
            <li><a href="#argumanlar" className={activeSection === 'argumanlar' ? 'active' : ''}>1. Ana Argümanlar</a></li>
            <li><a href="#curutmeler" className={activeSection === 'curutmeler' ? 'active' : ''}>2. Çürütme Blokları</a></li>
            <li><a href="#tuzak" className={activeSection === 'tuzak' ? 'active' : ''}>3. Kritik Tuzaklar</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <section id="argumanlar" style={{ marginBottom: '6rem' }}>
            <h2 className="section-title animate-on-scroll fade-up"><span style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>01</span> Neden İnsanın Yerini Alamaz?</h2>
            
            {siteData.arguments.map((arg) => (
              <div className="arg-card animate-on-scroll fade-up" key={arg.id}>
                <div className="arg-header">
                  <div className="arg-number">{arg.id}</div>
                  <div>
                    <div className="arg-tag">{arg.tag}</div>
                    <h3 className="arg-title">{arg.title}</h3>
                  </div>
                </div>
                <div className="arg-content">
                  <div className="arg-text">
                    {/* dangerouslySetInnerHTML is used here to render the HTML tags inside strings like <sup><a href="...">[1]</a></sup> safely. */}
                    {arg.text.map((p, idx) => (
                      <p key={idx} style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: p }}></p>
                    ))}
                    
                    <div className="black-box">
                      <CopyButton text={arg.bitirici} />
                      <div className="black-box-title">▶ BİTİRİCİ CEVAP</div>
                      <p>{arg.bitirici.replace("▶ BİTİRİCİ CEVAP\n", "")}</p>
                    </div>
                  </div>
                  {arg.analoji && (
                    <div className="arg-sidebar">
                      <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>Analoji</strong>
                      <p style={{ marginTop: '0.5rem' }}>{arg.analoji}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section id="curutmeler" style={{ marginBottom: '6rem' }}>
            <h2 className="section-title animate-on-scroll fade-up"><span style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>02</span> Karşı Tarafı Kendi Silahıyla Vurmak</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {siteData.tactics.map((tac, idx) => (
                <div key={idx} className="animate-on-scroll fade-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <Accordion title={tac.title} content={tac.text} />
                </div>
              ))}
            </div>

            <div id="tuzak" className="warning-box animate-on-scroll fade-up delay-300">
              <div className="warning-title">{siteData.warning.title}</div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{siteData.warning.text}</p>
              
              <div className="black-box" style={{ marginTop: '0' }}>
                <CopyButton text={siteData.warning.refleks} />
                <div className="black-box-title">▶ REFLEKS CEVAP</div>
                <p>{siteData.warning.refleks.replace("▶ REFLEKS CEVAP\n", "")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="no-print">
        <p>Takım Lideri: Doruk • LGS & Yapay Zeka Savunması • 2026</p>
      </footer>
    </>
  );
};

export default Home;