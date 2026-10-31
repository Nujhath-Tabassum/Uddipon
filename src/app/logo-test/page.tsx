export default function LogoTest() {
  return (
    <div style={{ background: "#eee", padding: 16, display: "flex", gap: 16 }}>
      {/* A: bare inline style, exact bytes that work in <img> */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: "#12301f",
          backgroundImage: "url('/Uddipon_ Together for a Better Tomorrow.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1536px 1024px",
          backgroundPosition: "-265px -243px",
        }}
      />
      {/* B: same but with class */}
      <div
        className="logo-mark"
        style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#12301f" }}
      />
      {/* C: img reference crop */}
      <div
        style={{ width: 44, height: 44, borderRadius: 12, background: "#12301f", overflow: "hidden", position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Uddipon_ Together for a Better Tomorrow.png"
          alt=""
          style={{ position: "absolute", width: 1536, left: -265, top: -243 }}
        />
      </div>
      {/* D: img reference crop, zoomed 2x for visibility */}
      <div
        style={{ width: 44, height: 44, borderRadius: 12, background: "#12301f", overflow: "hidden", position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Uddipon_ Together for a Better Tomorrow.png"
          alt=""
          style={{ position: "absolute", width: 3072, left: -530, top: -486 }}
        />
      </div>
    </div>
  );
}
