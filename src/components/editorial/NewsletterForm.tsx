"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-0 max-w-sm mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-[#111111] border border-[#2A2A2A] border-r-0 rounded-l-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
      />
      <button
        type="submit"
        className="px-6 bg-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#0A0A0A] rounded-r-[2px] hover:bg-[#C9A730] transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
