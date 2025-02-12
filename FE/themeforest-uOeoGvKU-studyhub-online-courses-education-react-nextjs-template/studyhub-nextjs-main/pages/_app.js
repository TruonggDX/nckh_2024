import '@/assets/scss/style.scss';
import { Providers } from '@/redux/providers';

function StudyHubNextJS({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />  
    </Providers>
  );
}

export default StudyHubNextJS;
