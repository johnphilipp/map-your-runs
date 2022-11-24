import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
