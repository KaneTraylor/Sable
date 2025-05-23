// components/dashboard/ArrayIntegrationWidget.tsx
import { Box, Spinner, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  userToken: string | null;
  widgetType: "credit-overview" | "credit-monitoring" | "credit-report";
  height?: string;
}

export function ArrayIntegrationWidget({
  userToken,
  widgetType,
  height = "300px",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userToken) return;

    const loadArrayWidget = async () => {
      try {
        // Load Array scripts
        const script1 = document.createElement("script");
        script1.src =
          "https://embed.array.io/cms/array-web-component.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = `https://embed.array.io/cms/array-${widgetType.replace(
          "-",
          "-"
        )}.js?appKey=3F03D20E-5311-43D8-8A76-E4B5D77793BD`;
        script2.async = true;

        // Wait for scripts to load
        await Promise.all([
          new Promise((resolve, reject) => {
            script1.onload = resolve;
            script1.onerror = reject;
            document.body.appendChild(script1);
          }),
          new Promise((resolve, reject) => {
            script2.onload = resolve;
            script2.onerror = reject;
            document.body.appendChild(script2);
          }),
        ]);

        // Create widget element
        if (containerRef.current) {
          const widgetElement = document.createElement(`array-${widgetType}`);
          widgetElement.setAttribute(
            "appKey",
            "3F03D20E-5311-43D8-8A76-E4B5D77793BD"
          );
          widgetElement.setAttribute("userToken", userToken);
          widgetElement.setAttribute("apiUrl", "https://sandbox.array.io");
          widgetElement.setAttribute("sandbox", "true");

          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(widgetElement);
        }

        setLoading(false);
      } catch (err) {
        console.error("Array widget loading error:", err);
        setError("Failed to load credit data");
        setLoading(false);
      }
    };

    loadArrayWidget();
  }, [userToken, widgetType]);

  if (!userToken) {
    return (
      <Alert status="warning" borderRadius="lg">
        <AlertIcon />
        Authentication required to load credit data
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box position="relative" minH={height}>
      {loading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner size="lg" color="green.500" />
        </Box>
      )}
      <Box
        ref={containerRef}
        h={height}
        opacity={loading ? 0.3 : 1}
        transition="opacity 0.3s ease"
      />
    </Box>
  );
}
