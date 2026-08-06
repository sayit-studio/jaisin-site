/**
 * Preview analytics adapter.
 *
 * Events stay in the browser and are not sent to an external service.
 * A future backend integration can subscribe here without changing page code.
 */
const notify = (type, payload) => {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent('site:analytics', {
    detail: { type, payload },
  }))
}

export const trackPageView = (path) => {
  notify('page_view', {
    path,
    location: window.location.href,
  })
}

export const trackEvent = (eventName, params = {}) => {
  notify(eventName, params)
}

export const GA_EVENTS = {
  CTA_LINE_CLICK: 'cta_line_click',
  ENTERPRISE_FORM_SUBMIT: 'enterprise_form_submit',
  FAQ_EXPAND: 'faq_expand',
}
