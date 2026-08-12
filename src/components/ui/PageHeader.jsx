import BannerHero from './BannerHero'

/**
 * 頁首橫幅。為了讓所有分頁與「新成屋驗屋」等房型頁視覺一致，
 * 這裡直接沿用 BannerHero（同樣的高度、遮罩、標題尺寸與往下捲動提示）。
 * 保留 PageHeader 這層是為了不動到既有呼叫端的 props 命名。
 */
export default function PageHeader({ title, desc, image, mobileImage, scrollTo }) {
  return (
    <BannerHero
      desktop={image}
      mobile={mobileImage}
      title={title}
      desc={desc}
      scrollTo={scrollTo}
    />
  )
}
