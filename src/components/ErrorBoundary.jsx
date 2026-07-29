import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Simulation Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', background: 'white', borderRadius: '8px' }}>
          <h2>Something went wrong loading the 3D model.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
