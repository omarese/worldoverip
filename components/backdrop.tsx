// The soft decorative circles behind every page (same shapes as the original home page).
export function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Peach Circle - Top Center */}
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#FCD8B5]/50 blur-xl" />

      {/* Warm Orange Circle - Top Right */}
      <div className="absolute top-[-50px] right-[-80px] w-[450px] h-[450px] rounded-full bg-[#FCE5CD]/60 blur-2xl" />

      {/* Soft Pastel Blue/Teal Circle - Left Center */}
      <div className="absolute top-[40%] left-[-120px] w-[500px] h-[500px] rounded-full bg-[#D4F1F4]/40 blur-3xl" />

      {/* Coral Warm Circle - Bottom Right */}
      <div className="absolute bottom-[10%] right-[-100px] w-[420px] h-[420px] rounded-full bg-[#FBE4D8]/60 blur-2xl" />

      {/* Floating Crisp Solid Peach Circles */}
      <div className="absolute top-[280px] right-[15%] w-24 h-24 rounded-full bg-[#FCD8B5]/80 hidden lg:block" />
      <div className="absolute top-[120px] left-[10%] w-16 h-16 rounded-full bg-[#FCE5CD] hidden lg:block" />
    </div>
  );
}