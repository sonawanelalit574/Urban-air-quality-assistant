import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[PureAir AI ErrorBoundary Caught]:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="glass-card max-w-md p-6 rounded-2xl border border-red-500/40 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">Something went wrong</h2>
            <p className="text-xs text-slate-300">
              PureAir AI encountered an unexpected interface error. Our telemetry engines are self-healing.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reload Assistant</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
