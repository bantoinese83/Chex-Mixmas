import { Component, ErrorInfo, ReactNode } from 'react';
import { Icon } from './ui/Icon';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-sm p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
              <Icon name="alert-triangle" size={32} className="text-[#D31212]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-slate-600 mb-2">
              Don't worry, even the best recipes sometimes need a second try. Let's get you back on track!
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Your recipes are safely saved, so you won't lose any of your delicious creations.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#D31212] text-white rounded-sm hover:bg-red-800 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50 transition-colors"
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-slate-500 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
