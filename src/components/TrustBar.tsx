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
          <span className="font-sans font-bold text-vanta-400 uppercase tracking-[3px] text-[10px]">
            {item.label}:
          </span>
          <span className="font-sans font-bold text-white uppercase tracking-[3px] text-[10px] ml-2">
            {item.value}
          </span>
          <span className="mx-8 text-vanta-700 font-light">·</span>
        </span>
      ))}
    </>
  )
}

export default function TrustBar() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '18px 0',
      }}
    >
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
