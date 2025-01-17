import { DefaultSeo } from 'next-seo';
import '../styles/globals.scss';
import { Toaster } from '@/ui/toaster';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <DefaultSeo
        title="Scoutflo: Manage production-ready Open-source apps on Kubernetes"
        description="Scoutflo is an automated GitOps platform that makes it easy to deploy and manage production-ready Open-source apps on Kubernetes."
        canonical="https://deploy.scoutflo.com/"
        openGraph={{
          title:
            'Scoutflo: Manage production-ready Open-source apps on Kubernetes',
          description:
            'Scoutflo is an automated GitOps platform that makes it easy to deploy and manage production-ready Open-source apps on Kubernetes.',
          images: [
            {
              url: 'https://files1-prod.sgp1.cdn.digitaloceanspaces.com/Deploy%20website%20preview%20image.png',
              width: 800,
              height: 600,
              alt: 'Scoutflo Deploy',
            },
          ],
        }}
        twitter={{
          handle: '@scout_flo',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
