import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#03091e",
          borderRadius: 40
        }}
      >
        <svg width="124" height="124" viewBox="0 0 32 32" fill="none">
          <path
            d="M4.5 18.5L13.5 14L20.5 7.5L18.5 15L27.5 13.5L21 19.5L25 24.5L16.5 21.5L9.5 25L12.5 19L4.5 18.5Z"
            fill="#38e8ff"
          />
          <path d="M25 13.8L29 12.5L26.5 15.6Z" fill="#90e0ef" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
