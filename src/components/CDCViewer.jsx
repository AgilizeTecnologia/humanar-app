export default function CDCViewer() {
  return (
    <div style={{ position: "relative", paddingTop: "max(60%, 324px)", width: "100%", height: 0 }}>
      <iframe
        style={{ position: "absolute", border: "none", width: "100%", height: "100%", left: 0, top: 0 }}
        src="https://online.fliphtml5.com/agilizetecnologia/kuuh/"
        seamless="seamless"
        scrolling="no"
        frameBorder="0"
        allowTransparency={true}
        allowFullScreen={true}
        title="CDC Flipbook"
      ></iframe>
    </div>
  );
}
