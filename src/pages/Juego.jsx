export default function Juego() {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Harvest Farm!</h2>
      <h3>Mientras llega tu pedido, ¿por qué no juegas un rato?</h3>
      <iframe
        width="560"
        height="315"
        allow="fullscreen; autoplay; encrypted-media"
        src="https://games.construct.net/67984/latest"
        frameBorder="0"
        allowFullScreen
        msAllowFullScreen
        mozAllowFullScreen
        webkitAllowFullScreen
        allowPaymentRequest={false}
        referrerPolicy="unsafe-url"
        sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups"
        scrolling="no"
        title="Juego Construct"
        style={{ maxWidth: '100%', borderRadius: 8 }}
      />
    </div>
  );
}