'use client'

import { useEffect, useRef, useState } from 'react'
import type { VideoAsset } from '@/config/media'

type Props = {
  video: VideoAsset
  /** Eager = hero: starts loading immediately. Lazy = only attaches sources near the viewport. */
  loading?: 'eager' | 'lazy'
  className?: string
}

/**
 * Decorative, muted background video.
 * - The poster is a plain <img>, so it paints with the HTML and doesn't wait for hydration.
 * - Under prefers-reduced-motion the video never loads; the poster stays.
 * - If the video errors or can't autoplay, the poster stays and nothing else changes.
 * - Lazy instances attach <source> only when within ~1 viewport, and pause when off-screen.
 */
export function AmbientVideo({ video, loading = 'lazy', className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (saveData) return

    let io: IntersectionObserver | undefined
    if (loading === 'eager') {
      // Defer one frame so the poster and text paint first.
      const id = requestAnimationFrame(() => setEnabled(true))
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()))
      io.observe(el)
      return () => {
        cancelAnimationFrame(id)
        io?.disconnect()
      }
    }
    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEnabled(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(el)
    const onChange = () => reduce.matches && el.pause()
    reduce.addEventListener('change', onChange)
    return () => {
      io?.disconnect()
      reduce.removeEventListener('change', onChange)
    }
  }, [loading])

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- poster must paint before hydration and stay as the fallback */}
      <img
        src={video.poster}
        alt=""
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
        loading={loading === 'eager' ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay={enabled}
        preload="none"
        poster={video.poster}
        tabIndex={-1}
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        onError={() => setPlaying(false)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
      >
        {enabled && video.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
    </div>
  )
}
