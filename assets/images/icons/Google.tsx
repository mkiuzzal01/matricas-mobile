import React from "react";
import Svg, { Path } from "react-native-svg";

export default function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.9-6.9C35.9 2.34 30.4 0 24 0 14.6 0 6.4 5.4 2.6 13.3l8.1 6.3C12.6 13.1 17.9 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v8h12.7c-.6 3.2-2.4 5.9-5.1 7.7l7.8 6.1C43.9 38.2 46.1 31.8 46.1 24.5z"
      />
      <Path
        fill="#FBBC05"
        d="M10.7 28.6c-1-3.2-1-6.6 0-9.8l-8.1-6.3C.9 17.3 0 20.5 0 24s.9 6.7 2.6 11.5l8.1-6.9z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.4 0 11.8-2.1 15.7-5.8l-7.8-6.1c-2.2 1.5-5.1 2.4-7.9 2.4-6.1 0-11.4-3.6-13.3-8.9l-8.1 6.9C6.4 42.6 14.6 48 24 48z"
      />
    </Svg>
  );
}
