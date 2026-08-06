import { useEffect, useRef } from 'react'
import './HomePage.css'
import Seo from '../components/seo/Seo'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSectionPager } from '../hooks/useSectionPager'
import HeroSection from '../components/sections/home/HeroSection'
import PainPointsSection from '../components/sections/home/PainPointsSection'
import HowWeWorkSection from '../components/sections/home/HowWeWorkSection'
import InspectionSection from '../components/sections/home/InspectionSection'
import ReviewsSection from '../components/sections/home/ReviewsSection'
import HomeFaqSection from '../components/sections/home/HomeFaqSection'
import ReportValueSection from '../components/sections/home/ReportValueSection'
import HomeSeminarSection from '../components/sections/home/HomeSeminarSection'
import ServiceTypesSection from '../components/sections/home/ServiceTypesSection'
import { asset } from '../config/site'

export default function HomePage() {
  const pageRef = useRef(null)
  useScrollReveal(pageRef)
  useSectionPager(pageRef)

  useEffect(() => {
    document.documentElement.classList.add('home-pager-mode')
    document.body.classList.add('home-pager-mode')
    return () => {
      document.documentElement.classList.remove('home-pager-mode')
      document.body.classList.remove('home-pager-mode')
    }
  }, [])

  return (
    <>
      <Seo routeKey="home" fallback={{
        title: '宅心驗屋｜台中專業驗屋公司 — 新成屋、社區驗屋全台服務',
        description: '宅心驗屋是台灣專業驗屋公司，提供台中新成屋驗屋、社區驗屋、裝潢細清與全屋整裝服務。儀器檢測、圖像化報告，讓你交屋有所依據。',
        keywords: '宅心驗屋, 專業驗屋公司, 台中新成屋驗屋, 社區驗屋, 驗屋, 裝潢細清, 全屋整裝, 台中驗屋, 全台驗屋',
        ogTitle: '宅心驗屋｜比你更在乎家的細節',
        ogDescription: '專業驗屋、裝潢細清、全屋整裝。LINE 立即諮詢。',
        ogImage: asset('assets/og/og-home.jpg'),
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: '宅心驗屋',
          alternateName: '宅心驗屋專業驗屋公司',
          description: '台灣專業驗屋公司，提供台中新成屋驗屋、社區驗屋、裝潢細清與全屋整裝服務。',
          telephone: '',
          areaServed: ['台灣', '台中', '台北', '新竹', '桃園'],
          serviceType: ['專業驗屋', '台中新成屋驗屋', '社區驗屋', '裝潢細清', '全屋整裝'],
          sameAs: [
            'https://www.facebook.com/js0971866797/',
            'https://www.instagram.com/p/DRTvOOPEh9B/',
            'https://line.me/R/ti/p/@301thssm',
          ],
        },
      }} />

      <div ref={pageRef} className="home-page">
        <HeroSection />
        <PainPointsSection />
        <InspectionSection />
        <HowWeWorkSection />
        <ReportValueSection />
        <HomeSeminarSection />
        <ServiceTypesSection />
        <ReviewsSection />
        <HomeFaqSection />
      </div>
    </>
  )
}
