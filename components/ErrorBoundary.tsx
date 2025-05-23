// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  Image,
  Divider,
} from "@chakra-ui/react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("🔥 Error caught by ErrorBoundary:", error, errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    if (process.env.NODE_ENV === "production") {
      // logErrorToService(error, errorInfo);
    }
  }

  handleReload = () => {
    // Reset the error boundary state
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    // Reload the page
    window.location.reload();
  };

  handleGoHome = () => {
    // Reset the error boundary state
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    // Navigate to home
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box minH="100vh" bg="sable.tan" py={12}>
          <Container maxW="2xl">
            <VStack spacing={8} textAlign="center">
              {/* Error Icon/Illustration */}
              <Box>
                <AlertTriangle size={64} color="var(--chakra-colors-red-500)" />
              </Box>

              {/* Main Error Message */}
              <VStack spacing={4}>
                <Heading size="xl" color="sable.warm.900">
                  Oops! Something went wrong
                </Heading>
                <Text fontSize="lg" color="sable.warm.700" maxW="md">
                  We're sorry for the inconvenience. Our team has been notified
                  and is working to fix this issue.
                </Text>
              </VStack>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <Alert status="error" textAlign="left" borderRadius="lg">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Error Details (Development Mode)</AlertTitle>
                    <AlertDescription>
                      <Text fontFamily="mono" fontSize="sm" mt={2}>
                        {this.state.error.message}
                      </Text>
                      {this.state.errorInfo && (
                        <Text
                          fontFamily="mono"
                          fontSize="xs"
                          mt={2}
                          color="gray.600"
                        >
                          {this.state.errorInfo.componentStack}
                        </Text>
                      )}
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

              <Divider />

              {/* Action Buttons */}
              <HStack spacing={4}>
                <Button
                  leftIcon={<RefreshCw size={16} />}
                  colorScheme="green"
                  size="lg"
                  onClick={this.handleReload}
                >
                  Try Again
                </Button>
                <Button
                  leftIcon={<Home size={16} />}
                  variant="outline"
                  size="lg"
                  onClick={this.handleGoHome}
                >
                  Go Home
                </Button>
              </HStack>

              {/* Help Text */}
              <VStack spacing={2}>
                <Text fontSize="sm" color="sable.warm.600">
                  If this problem persists, please contact our support team.
                </Text>
                <Button
                  as="a"
                  href="mailto:support@sable.com"
                  variant="link"
                  size="sm"
                  colorScheme="green"
                >
                  support@sable.com
                </Button>
              </VStack>

              {/* Optional: Company Logo for Brand Consistency */}
              <Box mt={8}>
                <Image
                  src="/mockups/logo/sable-logo.svg"
                  alt="Sable Credit"
                  h="40px"
                  opacity={0.6}
                  mx="auto"
                />
              </Box>
            </VStack>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}

// Hook for handling async errors (since Error Boundaries don't catch these)
export function useErrorHandler() {
  const [, setError] = React.useState();

  return React.useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

// Custom error boundary for specific sections
export function SectionErrorBoundary({
  children,
  sectionName,
}: {
  children: ReactNode;
  sectionName: string;
}) {
  return (
    <ErrorBoundary
      fallback={
        <Alert status="error" borderRadius="lg" my={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>Failed to load {sectionName}</AlertTitle>
            <AlertDescription>
              This section encountered an error. Please refresh the page or try
              again later.
            </AlertDescription>
          </Box>
        </Alert>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;
