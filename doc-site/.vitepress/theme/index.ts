import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom, { type Zoom } from 'medium-zoom'
import './custom.css'

let zoom: Zoom | undefined

// Click any content image to open it full-size in a lightbox overlay.
function setupImageZoom() {
  void nextTick(() => {
    if (!zoom) {
      zoom = mediumZoom({ background: 'var(--vp-c-bg)', margin: 24 })
    }
    // Re-target the current page's images (skip linked images and the masthead).
    zoom.detach()
    zoom.attach('.vp-doc img:not(a img):not(.no-zoom)')
  })
}

function normalizeDocsLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/docs-site"]').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href) return

    const [withoutHash, hash = ''] = href.split('#')
    const normalized = withoutHash.replace(/\.html$/, '').replace(/\/$/, '')
    anchor.setAttribute('href', `${normalized}${hash ? `#${hash}` : ''}`)
  })
}

function labelAppearanceSwitches() {
  document.querySelectorAll<HTMLElement>('.VPSwitchAppearance[role="switch"]').forEach((switchControl) => {
    if (!switchControl.getAttribute('aria-label')) {
      switchControl.setAttribute('aria-label', 'Toggle colour theme')
    }
  })
}

const Layout = {
  setup() {
    const route = useRoute()
    let observer: MutationObserver | null = null

    const applyDocsUiEnhancements = () => {
      void nextTick(() => {
        const content = document.getElementById('VPContent')
        if (content) {
          if (content.classList.contains('is-home')) {
            content.setAttribute('role', 'main')
          } else {
            content.removeAttribute('role')
          }
        }

        normalizeDocsLinks()
        labelAppearanceSwitches()
      })
    }

    if (!import.meta.env.SSR) {
      watch(
        () => route.path,
        () => {
          applyDocsUiEnhancements()
          setupImageZoom()
        },
        { immediate: true, flush: 'post' },
      )

      onMounted(() => {
        observer = new MutationObserver(applyDocsUiEnhancements)
        observer.observe(document.documentElement, { childList: true, subtree: true })
        applyDocsUiEnhancements()
        setupImageZoom()
      })

      onUnmounted(() => {
        observer?.disconnect()
        observer = null
      })
    }

    return () => h(DefaultTheme.Layout)
  },
}

export default {
  extends: DefaultTheme,
  Layout,
}
