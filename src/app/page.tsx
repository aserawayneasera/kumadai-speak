// import AboutPageContent from '@/components/AboutPageContent';
import AppShell from '@/components/AppShell';
import SupportFreeApp from '@/components/SupportFreeApp';
import AppFooter from '@/components/AppFooter';
import AdSenseAd from '@/components/AdSenseAd';

export default function HomePage() {
  return (
    <>
      <AppShell />
      <SupportFreeApp />
      <AdSenseAd slot="4662267919" label="Advertisement" />
      <AppFooter appName='Kumadai Tap & Speak' />
     
    </>
  );
}
