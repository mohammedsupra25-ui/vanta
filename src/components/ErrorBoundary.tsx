import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: "'Syne', sans-serif",
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 300,
              marginBottom: '1rem',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '2rem' }}>
            Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
