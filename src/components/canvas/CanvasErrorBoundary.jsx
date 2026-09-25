import React from "react";
import PropTypes from "prop-types";
import WebGLFallback from "./WebGLFallback";

export class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas Error caught by boundary:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === "function"
          ? this.props.fallback(this.state.error, this.resetError)
          : this.props.fallback;
      }
      return (
        <WebGLFallback
          type={this.props.type || "general"}
          title={this.props.fallbackTitle}
          description={this.props.fallbackDescription}
          icon={this.props.icon}
        />
      );
    }

    return this.props.children;
  }
}

CanvasErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  type: PropTypes.string,
  fallbackTitle: PropTypes.string,
  fallbackDescription: PropTypes.string,
  icon: PropTypes.string,
  onError: PropTypes.func,
};

export default CanvasErrorBoundary;
