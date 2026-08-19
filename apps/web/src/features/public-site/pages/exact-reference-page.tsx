export function ExactReferencePage({ src, title, height = "18000px" }: { src: string; title: string; height?: string }) {
  return <iframe title={title} src={src} style={{ display: "block", width: "100%", height, border: 0, background: "#FAF9FC" }} />;
}
