// Toeco chỉ có success, sub3 (hổ phách) và destructive: chữ trên success/sub3 phải tối, destructive dùng nền 10% như Badge shadcn
const tones = {
  success: "bg-success text-main",
  warning: "bg-sub3 text-on-sub3",
  danger: "bg-destructive/10 text-destructive",
};

export type Tone = keyof typeof tones;

export function StatusBadge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
