import './globals.css'

export const metadata = {
  title: 'CineVoyage - Movie Travel Planning',
  description: 'Discover filming locations and plan your movie-inspired adventures',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a2e',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            CineVoyage requires JavaScript to run.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}