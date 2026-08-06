import { useEffect, useState, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import './FaqAccordion.css'

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="faq-accordion">
      {items.map((item, i) => (
        <FaqItem
          key={i}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}

function FaqItem({ question, answer, isOpen, onToggle }) {
  const bodyRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('0px')

  useEffect(() => {
    if (!bodyRef.current) return
    setMaxHeight(isOpen ? `${bodyRef.current.scrollHeight}px` : '0px')
  }, [isOpen, answer])

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-question">{question}</span>
        <span className="faq-icon">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div
        className="faq-body"
        ref={bodyRef}
        style={{ maxHeight }}
      >
        <div className="faq-answer">{answer}</div>
      </div>
    </div>
  )
}
