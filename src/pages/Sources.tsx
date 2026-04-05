import { siteData } from '../data';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

const Sources = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <nav className="no-print">
        <div><a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>← ANA SAYFAYA DÖN</a></div>
        <div className="nav-links">
          <button onClick={() => setDarkMode(!darkMode)} title="Karanlık Mod">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <div className="layout-container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'block' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
          Akademik Kaynaklar ve Referanslar
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Münazara metninde yer alan argümanların dayandığı felsefi, ekonomik ve hukuki temeller aşağıda listelenmiştir. Argümanlarınızı savunurken bu kaynaklara atıf yapmanız elinizi güçlendirecektir.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {siteData.sources.map((source) => (
            <div key={source.id} id={source.id} style={{ 
              padding: '2rem', 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-light)', 
              borderRadius: '8px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                background: 'var(--accent-red)',
                color: 'white',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontWeight: 'bold',
                fontFamily: "'Playfair Display', serif"
              }}>
                {source.number}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                {source.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-red)', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {source.author} • {source.year}
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                Yayın: {source.publication}
              </p>
              <div style={{ 
                paddingTop: '1rem', 
                borderTop: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                {source.desc}
              </div>
              <a href={source.url} target="_blank" rel="noreferrer" style={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'var(--bg-light)',
                backgroundColor: 'var(--text-main)',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '4px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-red)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--text-main)'}>
                Kaynağa Git →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sources;