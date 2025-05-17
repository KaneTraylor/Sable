import { useEffect, useRef } from "react";

export default function CreditOverviewWidget({
  userToken,
}: {
  userToken: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://embed.array.io/cms/array-web-component.js?appKey=YOUR_KEY";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://embed.array.io/cms/array-credit-overview.js?appKey=YOUR_KEY";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    if (ref.current) {
      ref.current.innerHTML = `
        <array-credit-overview
          appKey="YOUR_KEY"
          userToken="${userToken}"
          apiUrl="https://sandbox.array.io"
          sandbox="true"
        ></array-credit-overview>
      `;
    }

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [userToken]);

  return <div ref={ref} />;
}
