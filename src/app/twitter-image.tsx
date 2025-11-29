import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "My Beamer - Premium BMW Aftermarket Aesthetics";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* M-stripe at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#81C4FF" }} />
          <div style={{ flex: 1, backgroundColor: "#16588E" }} />
          <div style={{ flex: 1, backgroundColor: "#E7222E" }} />
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              marginBottom: "16px",
              letterSpacing: "-2px",
            }}
          >
            My <span style={{ color: "#81C4FF" }}>Beamer</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Premium BMW Aftermarket Aesthetics
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#71717a",
                fontSize: 18,
              }}
            >
              <span style={{ color: "#81C4FF", fontSize: 24, marginBottom: "8px" }}>
                Gauteng Based
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#71717a",
                fontSize: 18,
              }}
            >
              <span style={{ color: "#81C4FF", fontSize: 24, marginBottom: "8px" }}>
                Nationwide Shipping
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#71717a",
                fontSize: 18,
              }}
            >
              <span style={{ color: "#81C4FF", fontSize: 24, marginBottom: "8px" }}>
                Plug & Play
              </span>
            </div>
          </div>
        </div>

        {/* M-stripe at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#81C4FF" }} />
          <div style={{ flex: 1, backgroundColor: "#16588E" }} />
          <div style={{ flex: 1, backgroundColor: "#E7222E" }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
