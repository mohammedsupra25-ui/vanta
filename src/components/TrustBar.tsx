const items = [
  { label: 'Analyses Published', value: '3,240+' },
  { label: 'Accuracy Rate', value: '87%' },
  { label: 'Markets Covered', value: '12' },
  { label: 'Active Subscribers', value: '4,800+' },
  { label: 'Avg Signal Return', value: '14.2%' },
  { label: 'Years of Data', value: '8+' },
]

function TickerContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-sans font-medium text-vanta-400 uppercase tracking-[4px] text-[10px]">
            {item.label}
          </span>
          <span className="font-sans font-bold text-luxury-gold uppercase tracking-[2px] text-[11px] ml-3" style={{ textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
            {item.value}
          </span>
          <span className="mx-12 text-luxury-gold/40 text-[8px]">◆</span>
        </span>
      ))}
    </>
  )
}

export default function TrustBar() {
  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        padding: '18px 0',
      }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)' }}></div>
      <div className="ticker-track relative z-0">
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
