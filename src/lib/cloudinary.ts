/**
 * Cloudinary delivery helper — ENV-GATED, additive, non-breaking.
 *
 * If NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (or CLOUDINARY_CLOUD_NAME) is set,
 * returns a Cloudinary fetch-delivery URL with sensible transform defaults
 * (format: auto, quality: auto, width-capped).
 *
 * If neither env var is set, returns the original src unchanged so the site
 * continues to work without any Cloudinary account.
 *
 * Usage:
 *   import { cld } from '@/lib/cloudinary'
 *   <img src={cld('/images/foo.webp', { width: 1200 })} ... />
 *   <img src={cld('https://example.com/remote.jpg')} ... />
 *
 * Adoption path:
 *   - Drop `cld()` around any <img src=...> or backgroundImage value.
 *   - For Next.js <Image> loader integration see TIER_FIXES_NOTES.md.
 *   - Applet preview-image generation is a separate follow-up.
 */

export interface CldOpts {
  /** Max display width in px. Cloudinary will not upscale. Default: 1200 */
  width?: number
  /** Cloudinary quality string. Default: 'auto' */
  quality?: string | number
  /** Cloudinary format string. Default: 'auto' */
  format?: string
  /** Extra raw Cloudinary transformation string, e.g. 'e_sharpen:50'. */
  extra?: string
}

const CLOUD_NAME =
  (typeof process !== 'undefined' &&
    (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME)) ||
  ''

/**
 * Returns a Cloudinary delivery URL when the cloud name env var is present,
 * otherwise returns `src` unchanged (zero-config fallback).
 */
export function cld(src: string, opts: CldOpts = {}): string {
  if (!CLOUD_NAME) return src

  const { width = 1200, quality = 'auto', format = 'auto', extra } = opts

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    `c_limit`,
    extra,
  ]
    .filter(Boolean)
    .join(',')

  // Determine whether src is already absolute or a local /public path
  const isAbsolute = /^https?:\/\//.test(src)

  if (isAbsolute) {
    // Cloudinary fetch delivery: transform an arbitrary remote URL
    const encoded = encodeURIComponent(src)
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transforms}/${encoded}`
  }

  // Local /public asset: use upload delivery
  // Strip leading slash; Cloudinary public_id does not include the slash.
  const publicId = src.replace(/^\//, '')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`
}
