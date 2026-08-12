import './LogoLoop.css'

const COMMUNITIES = [
  { name: '台中龍井・新貌社區',    img: null },
  { name: '台中七期・美術館特區',  img: null },
  { name: '桃園中壢・首席大院',    img: null },
  { name: '彰化田中・富春山居',    img: null },
  { name: '台中北屯・中科新美地',  img: null },
  { name: '台南安平・大員皇居',    img: null },
  { name: '台中烏日・高鐵首席',    img: null },
  { name: '高雄左營・日光城',      img: null },
  { name: '新竹竹北・豐邑米蘭',    img: null },
  { name: '台中太平・御花園',      img: null },
  { name: '桃園八德・帝峰',        img: null },
  { name: '台中西屯・七期名宅',    img: null },
]

function Track({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="logo-loop__track">
      <div className="logo-loop__inner">
        {doubled.map((item, i) => (
          <div key={i} className="logo-loop__card">
            <div className="logo-loop__card-img">
              {item.img
                ? <img src={item.img} alt={item.name} loading="lazy" />
                : <span className="logo-loop__card-img-placeholder" />}
            </div>
            <p className="logo-loop__card-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoLoop() {
  return (
    <div className="logo-loop" aria-label="服務足跡">
      <div className="logo-loop__header">
        <p className="logo-loop__subtitle">遍及全台 130+ 社區建案</p>
      </div>
      <Track items={COMMUNITIES} />
    </div>
  )
}
