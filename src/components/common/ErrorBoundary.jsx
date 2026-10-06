import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ADHA UI Crash Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', fontFamily: 'sans-serif', background: '#F8FAFC', minHeight: '100vh', color: '#0F172A' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#DC2626', fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              ⚠️ Application Interface Error
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>
              React encountered an error while rendering this view:
            </p>
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto', marginBottom: '16px' }}>
              {this.state.error?.toString()}
            </div>
            {this.state.errorInfo && (
              <details style={{ background: '#F1F5F9', padding: '12px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Component Stack Trace</summary>
                <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: '20px', background: '#123B63', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
