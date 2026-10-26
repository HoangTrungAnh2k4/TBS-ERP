import type { Metadata } from "next";
import { LuFactory, LuMapPin } from "react-icons/lu";
import { StatusBadge, type Tone } from "@/components/status-badge";

export const metadata: Metadata = { title: "DS Nhà Máy" };

// shortcut: dữ liệu mẫu, thay bằng API khi có backend
const factories: { name: string; location: string; lines: number; workers: number; status: string; tone: Tone }[] = [
  { name: "Nhà máy Thái Bình", location: "KCN Phúc Khánh, Thái Bình", lines: 14, workers: 820, status: "Hoạt động", tone: "success" },
  { name: "Nhà máy Hải Phòng", location: "KCN Nomura, Hải Phòng", lines: 10, workers: 610, status: "Hoạt động", tone: "success" },
  { name: "Nhà máy Nam Định", location: "KCN Hòa Xá, Nam Định", lines: 8, workers: 450, status: "Bảo trì", tone: "warning" },
  { name: "Nhà máy Hưng Yên", location: "KCN Phố Nối A, Hưng Yên", lines: 6, workers: 0, status: "Tạm dừng", tone: "danger" },
];

export default function NhaMayPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-main">DS Nhà Máy</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {factories.map((f) => (
          <div key={f.name} className="space-y-4 rounded-2xl border border-sub2/30 bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-sub1 text-main">
                  <LuFactory className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-semibold text-main">{f.name}</h2>
                  <p className="flex items-center gap-1 text-sm text-subText">
                    <LuMapPin className="size-3.5" aria-hidden />
                    {f.location}
                  </p>
                </div>
              </div>
              <StatusBadge tone={f.tone}>{f.status}</StatusBadge>
            </div>
            <dl className="grid grid-cols-2 gap-3 border-t pt-4">
              <div>
                <dt className="text-sm text-subText">Số line</dt>
                <dd className="text-lg font-semibold">{f.lines}</dd>
              </div>
              <div>
                <dt className="text-sm text-subText">Công nhân</dt>
                <dd className="text-lg font-semibold">{f.workers}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
