import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import concepts from '../data/concepts.json'

interface Concept {
  slug: string
  title: string
  description: string
  category: string
  difficulty: string
}

interface HomeProps {
  concepts: Concept[]
  categories: string[]
}

export default function Home({ concepts, categories }: HomeProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.vercel.app'
  
  // JSON-LD structured data for homepage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Programming Concepts Guide',
    description: 'Comprehensive guide to essential programming concepts, algorithms, and design patterns',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/concepts/{search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <Head>
        <title>Programming Concepts Guide | Learn Essential Dev Skills</title>
        <meta 
          name="description" 
          content="Master essential programming concepts including algorithms, design patterns, JavaScript fundamentals, and backend development. Comprehensive guides for developers at all levels." 
        />
        <meta name="keywords" content="programming concepts, algorithms, design patterns, javascript, software development, coding tutorials" />
        
        {/* OpenGraph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Programming Concepts Guide | Learn Essential Dev Skills" />
        <meta property="og:description" content="Master essential programming concepts including algorithms, design patterns, JavaScript fundamentals, and backend development." />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:site_name" content="Programming Concepts Guide" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programming Concepts Guide | Learn Essential Dev Skills" />
        <meta name="twitter:description" content="Master essential programming concepts including algorithms, design patterns, JavaScript fundamentals, and backend development." />
        
        {/* Additional SEO tags */}
        <link rel="canonical" href={baseUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="container">
        <header style={{ 
          padding: 'var(--spacing-xl) 0',
          borderBottom: '2px solid var(--color-border)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem',
            marginBottom: 'var(--spacing-sm)',
            background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Programming Concepts
          </h1>
          <p style={{ 
            fontSize: '1.25rem',
            color: 'var(--color-muted)',
            maxWidth: '700px'
          }}>
            Explore essential programming concepts, algorithms, and design patterns. 
            Each concept includes clear explanations, practical examples, and best practices.
          </p>
        </header>

        <section>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2>Browse by Category</h2>
            <div style={{ 
              display: 'flex',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
              marginTop: 'var(--spacing-md)'
            }}>
              {categories.map(category => (
                <span 
                  key={category}
                  className="badge"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-bg)',
                    fontSize: '0.9rem'
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-xl)'
          }}>
            {concepts.map((concept, index) => (
              <article 
                key={concept.slug}
                style={{
                  backgroundColor: 'var(--color-card)',
                  borderRadius: '12px',
                  padding: 'var(--spacing-lg)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--color-border)',
                  animation: `fadeIn 0.5s ease ${index * 0.1}s backwards`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }}
              >
                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <span className={`badge badge-${concept.difficulty.toLowerCase()}`}>
                    {concept.difficulty}
                  </span>
                  <span 
                    style={{
                      marginLeft: 'var(--spacing-xs)',
                      fontSize: '0.85rem',
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {concept.category}
                  </span>
                </div>
                
                <h3 style={{ marginTop: 'var(--spacing-sm)' }}>
                  <Link href={`/concepts/${concept.slug}`}>
                    {concept.title}
                  </Link>
                </h3>
                
                <p style={{ 
                  color: 'var(--color-muted)',
                  marginBottom: 'var(--spacing-md)',
                  fontSize: '0.95rem'
                }}>
                  {concept.description}
                </p>
                
                <Link 
                  href={`/concepts/${concept.slug}`}
                  style={{
                    display: 'inline-block',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  Learn More →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer style={{
          marginTop: 'var(--spacing-xl)',
          padding: 'var(--spacing-xl) 0',
          borderTop: '2px solid var(--color-border)',
          textAlign: 'center',
          color: 'var(--color-muted)'
        }}>
          <p>© {new Date().getFullYear()} Programming Concepts Guide. Built with Next.js for optimal SEO.</p>
        </footer>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Extract unique categories
  const categories = Array.from(new Set(concepts.map(c => c.category))).sort()
  
  return {
    props: {
      concepts: concepts.map(({ slug, title, description, category, difficulty }) => ({
        slug,
        title,
        description,
        category,
        difficulty
      })),
      categories
    }
  }
}
