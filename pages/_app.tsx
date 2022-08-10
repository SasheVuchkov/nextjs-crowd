import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SSRProvider} from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {Router} from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

TimeAgo.addDefaultLocale(en);

//Binding events.
Router.events.on('routeChangeStart', () => {
  NProgress.start()
  if (typeof document !== 'undefined') {
    const layout = document.getElementById('layout');
    if (layout) {
      layout.className += ' animation';
      window.location.href = window.location.href.indexOf('#') < 0 ? `${window.location.href}#top` : window.location.href;
    }
  }
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
  if (typeof document !== 'undefined') {
    const layout = document.getElementById('layout');
    if (layout) {
      layout.className = layout.className.replaceAll('animation', '');
    }
  }
});

Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <Component {...pageProps} />
  </SSRProvider>
}

export default MyApp
