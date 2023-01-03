import "../styles/globals.css";
import { PosterProvider } from "../providers/PosterProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <PosterProvider>
        <Component {...pageProps} />
      </PosterProvider>
    </>
  );
}

export default MyApp;
