// Error Handling Utilities for PoultryPro Application

import { Alert } from 'react-native';

export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  VALIDATION = 'VALIDATION',
  PERMISSION = 'PERMISSION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
}

class ErrorHandler {
  private errorLog: AppError[] = [];

  // Log error for debugging and analytics
  private logError(error: AppError): void {
    this.errorLog.push(error);
    console.error('App Error:', error);
    
    // In production, send to analytics service
    // Analytics.logError(error);
  }

  // Create standardized error object
  createError(type: ErrorType, message: string, code?: string, details?: any): AppError {
    return {
      type,
      message,
      code,
      details,
      timestamp: new Date(),
    };
  }

  // Handle network errors
  handleNetworkError(error: any): AppError {
    let message = 'Network connection failed';
    let code = 'NETWORK_ERROR';

    if (error.message?.includes('timeout')) {
      message = 'Request timed out. Please check your connection.';
      code = 'TIMEOUT';
    } else if (error.message?.includes('offline')) {
      message = 'You appear to be offline. Please check your internet connection.';
      code = 'OFFLINE';
    } else if (error.status === 0) {
      message = 'Unable to connect to server. Please try again later.';
      code = 'CONNECTION_FAILED';
    }

    const appError = this.createError(ErrorType.NETWORK, message, code, error);
    this.logError(appError);
    return appError;
  }

  // Handle authentication errors
  handleAuthError(error: any): AppError {
    let message = 'Authentication failed';
    let code = 'AUTH_ERROR';

    if (error.status === 401) {
      message = 'Your session has expired. Please log in again.';
      code = 'SESSION_EXPIRED';
    } else if (error.status === 403) {
      message = 'You do not have permission to perform this action.';
      code = 'PERMISSION_DENIED';
    } else if (error.message?.includes('invalid credentials')) {
      message = 'Invalid email or password. Please try again.';
      code = 'INVALID_CREDENTIALS';
    }

    const appError = this.createError(ErrorType.AUTHENTICATION, message, code, error);
    this.logError(appError);
    return appError;
  }

  // Handle validation errors
  handleValidationError(error: any): AppError {
    let message = 'Please check your input and try again';
    let code = 'VALIDATION_ERROR';

    if (error.details && Array.isArray(error.details)) {
      message = error.details.join(', ');
    } else if (error.message) {
      message = error.message;
    }

    const appError = this.createError(ErrorType.VALIDATION, message, code, error);
    this.logError(appError);
    return appError;
  }

  // Handle server errors
  handleServerError(error: any): AppError {
    let message = 'Server error occurred. Please try again later.';
    let code = 'SERVER_ERROR';

    if (error.status >= 500) {
      message = 'Server is temporarily unavailable. Please try again later.';
      code = 'SERVER_UNAVAILABLE';
    } else if (error.status === 404) {
      message = 'The requested resource was not found.';
      code = 'NOT_FOUND';
    } else if (error.status === 429) {
      message = 'Too many requests. Please wait a moment and try again.';
      code = 'RATE_LIMITED';
    }

    const appError = this.createError(ErrorType.SERVER, message, code, error);
    this.logError(appError);
    return appError;
  }

  // Handle permission errors
  handlePermissionError(permission: string): AppError {
    const message = `Permission required: ${permission}. Please grant access in settings.`;
    const appError = this.createError(ErrorType.PERMISSION, message, 'PERMISSION_REQUIRED', { permission });
    this.logError(appError);
    return appError;
  }

  // Generic error handler
  handleError(error: any): AppError {
    // Network errors
    if (error.name === 'NetworkError' || error.code === 'NETWORK_REQUEST_FAILED') {
      return this.handleNetworkError(error);
    }

    // HTTP status code errors
    if (error.status) {
      if (error.status === 401 || error.status === 403) {
        return this.handleAuthError(error);
      } else if (error.status >= 400 && error.status < 500) {
        return this.handleValidationError(error);
      } else if (error.status >= 500) {
        return this.handleServerError(error);
      }
    }

    // Validation errors
    if (error.type === 'validation' || error.name === 'ValidationError') {
      return this.handleValidationError(error);
    }

    // Default to unknown error
    const message = error.message || 'An unexpected error occurred';
    const appError = this.createError(ErrorType.UNKNOWN, message, 'UNKNOWN_ERROR', error);
    this.logError(appError);
    return appError;
  }

  // Show user-friendly error message
  showError(error: AppError, showAlert: boolean = true): void {
    if (showAlert) {
      Alert.alert(
        'Error',
        error.message,
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
      );
    }
  }

  // Show error with retry option
  showErrorWithRetry(error: AppError, onRetry: () => void): void {
    Alert.alert(
      'Error',
      error.message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Retry', style: 'default', onPress: onRetry },
      ],
      { cancelable: true }
    );
  }

  // Get error logs for debugging
  getErrorLogs(): AppError[] {
    return [...this.errorLog];
  }

  // Clear error logs
  clearErrorLogs(): void {
    this.errorLog = [];
  }

  // Check if error is recoverable
  isRecoverableError(error: AppError): boolean {
    return [
      ErrorType.NETWORK,
      ErrorType.SERVER,
    ].includes(error.type);
  }

  // Get user-friendly error message
  getUserMessage(error: AppError): string {
    switch (error.type) {
      case ErrorType.NETWORK:
        return 'Please check your internet connection and try again.';
      case ErrorType.AUTHENTICATION:
        return 'Please log in again to continue.';
      case ErrorType.VALIDATION:
        return error.message;
      case ErrorType.PERMISSION:
        return 'Please grant the required permissions in your device settings.';
      case ErrorType.SERVER:
        return 'Our servers are experiencing issues. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  // Handle async operations with error handling
  async withErrorHandling<T>(
    operation: () => Promise<T>,
    onError?: (error: AppError) => void
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error) {
      const appError = this.handleError(error);
      if (onError) {
        onError(appError);
      } else {
        this.showError(appError);
      }
      return null;
    }
  }
}

export const errorHandler = new ErrorHandler();
export default errorHandler;

// Error boundary component for React
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    const appError = errorHandler.createError(
      ErrorType.UNKNOWN,
      error.message,
      'COMPONENT_ERROR',
      { error, errorInfo }
    );
    errorHandler.logError(appError);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error!} />;
      }
      
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Something went wrong
          </Text>
          <Text style={{ textAlign: 'center', color: '#666' }}>
            We're sorry for the inconvenience. Please restart the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}