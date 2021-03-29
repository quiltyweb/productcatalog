import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <h1>
          Se ha producido un Error, Refresque la página e intente nuevamente.
          Atte. Gattoni.cl
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
