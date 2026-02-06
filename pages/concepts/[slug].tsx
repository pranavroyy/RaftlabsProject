import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import concepts from '../../data/concepts.json'

interface ConceptContent {
  introduction: string
  keyPoints: string[]
  useCases: string[]
  example: string
  commonPitfalls: string[]
}

interface Concept {
  slug: string
  title: string
  description: string
  category: string
  difficulty: string
  keywords: string[]
  content: ConceptContent
  relatedConcepts: string[]
  imageDescription: string
}

interface ConceptPageProps {
  concept: Concept
  relatedConcepts: Array<{
    slug: string
    title: string
    category: string
  }>
}

export default function ConceptPage({ concept, relatedConcepts }: ConceptPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.vercel.app'
  const pageUrl = `${baseUrl}/concepts/${concept.slug}`
  
  // JSON-LD structured data (Article type)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: concept.title,
    description: concept.description,
    author: {
      '@type': 'Organization',
      name: 'Programming Concepts Guide'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Programming Concepts Guide',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    },
    keywords: concept.keywords.join(', '),
    articleSection: concept.category,
    about: {
      '@type': 'Thing',
      name: concept.title,
      description: concept.description
    }
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Concepts',
        item: `${baseUrl}/concepts`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: concept.title,
        item: pageUrl
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{concept.title} | Programming Concepts Guide</title>
        <meta name="description" content={concept.description} />
        <meta name="keywords" content={concept.keywords.join(', ')} />
        
        {/* OpenGraph tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${concept.title} | Programming Concepts Guide`} />
        <meta property="og:description" content={concept.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Programming Concepts Guide" />
        <meta property="article:section" content={concept.category} />
        <meta property="article:tag" content={concept.keywords.join(', ')} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${concept.title} | Programming Concepts Guide`} />
        <meta name="twitter:description" content={concept.description} />
        
        {/* Additional SEO tags */}
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <main className="container">
        {/* Breadcrumb navigation */}
        <nav 
          aria-label="Breadcrumb"
          style={{
            padding: 'var(--spacing-md) 0',
            fontSize: '0.9rem',
            color: 'var(--color-muted)'
          }}
        >
          <Link href="/">Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href="/#concepts">Concepts</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>{concept.title}</span>
        </nav>

        <article>
          {/* Article header */}
          <header style={{
            paddingBottom: 'var(--spacing-lg)',
            borderBottom: '2px solid var(--color-border)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <span className={`badge badge-${concept.difficulty.toLowerCase()}`}>
                {concept.difficulty}
              </span>
              <span 
                style={{
                  marginLeft: 'var(--spacing-sm)',
                  fontSize: '0.95rem',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {concept.category}
              </span>
            </div>

            <h1>{concept.title}</h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--color-muted)',
              lineHeight: '1.6',
              maxWidth: '800px'
            }}>
              {concept.description}
            </p>
          </header>

          {/* Main content */}
          <div style={{ maxWidth: '800px' }}>
            <section>
              <h2>Introduction</h2>
              <p>{concept.content.introduction}</p>
            </section>

            <section>
              <h2>Key Points</h2>
              <ul>
                {concept.content.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Common Use Cases</h2>
              <ul>
                {concept.content.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Code Example</h2>
              <pre><code>{concept.content.example}</code></pre>
            </section>

            <section>
              <h2>Common Pitfalls</h2>
              <ul>
                {concept.content.commonPitfalls.map((pitfall, index) => (
                  <li key={index}>{pitfall}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Related concepts */}
          {relatedConcepts.length > 0 && (
            <section style={{
              marginTop: 'var(--spacing-xl)',
              paddingTop: 'var(--spacing-xl)',
              borderTop: '2px solid var(--color-border)'
            }}>
              <h2>Related Concepts</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-md)'
              }}>
                {relatedConcepts.map(related => (
                  <Link
                    key={related.slug}
                    href={`/concepts/${related.slug}`}
                    style={{
                      display: 'block',
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {related.category}
                    </div>
                    <div style={{
                      fontWeight: 600,
                      color: 'var(--color-text)'
                    }}>
                      {related.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Back to home */}
        <nav style={{
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)'
        }}>
          <Link 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            ← Back to All Concepts
          </Link>
        </nav>

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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }
  
  // Find the concept
  const concept = concepts.find(c => c.slug === slug)
  
  if (!concept) {
    return {
      notFound: true
    }
  }
  
  // Find related concepts
  const relatedConcepts = concepts
    .filter(c => 
      c.slug !== slug && 
      concept.relatedConcepts.includes(c.slug)
    )
    .map(({ slug, title, category }) => ({ slug, title, category }))
  
  return {
    props: {
      concept,
      relatedConcepts
    }
  }
}
