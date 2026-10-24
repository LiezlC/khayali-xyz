export default function HouseArrow({ down = false }: { down?: boolean }) {
  return <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d={down ? 'M10 3v14m-6-6 6 6 6-6' : 'M4 16 16 4M4 4h12v12'} stroke="currentColor" strokeWidth="1.2" />
  </svg>
}
