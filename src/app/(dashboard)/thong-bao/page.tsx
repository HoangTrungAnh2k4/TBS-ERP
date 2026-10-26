import type { Metadata } from "next";
import { LuMegaphone } from "react-icons/lu";
import { StatusBadge, type Tone } from "@/components/status-badge";

export const metadata: Metadata = { title: "Thông Báo" };

// shortcut: dữ liệu mẫu, thay bằng API khi có backend
const notices: { title: string; body: string; time: string; tag: string; tone: Tone }[] = [
  {
    title: "Cập nhật kế hoạch sản xuất tuần 44",
    body: "Kế hoạch sản lượng tuần 44 đã được duyệt. Các tổ trưởng kiểm tra và xác nhận trước 17:00.",
    time: "08:15 · 26/10/2026",
    tag: "Mới",
    tone: "success",
  },
  {
    title: "Bảo trì máy may Line 3 – Nhà máy Thái Bình",
    body: "Line 3 tạm dừng từ 13:00 đến 15:00 để bảo trì định kỳ.",
    time: "07:40 · 26/10/2026",
    tag: "Chờ xử lý",
    tone: "warning",
  },
  {
    title: "Trạm bấm di động #12 mất kết nối",
    body: "Thiết bị không gửi dữ liệu sản lượng trong 30 phút gần nhất.",
    time: "Hôm qua · 16:20",
    tag: "Lỗi",
    tone: "danger",
  },
];

export default function ThongBaoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-main">Thông Báo</h1>
      <ul className="space-y-4">
        {notices.map((n) => (
          <li key={n.title} className="flex gap-4 rounded-2xl border border-sub2/30 bg-card p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sub1 text-main">
              <LuMegaphone className="size-5" aria-hidden />
            </span>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-main">{n.title}</h2>
                <StatusBadge tone={n.tone}>{n.tag}</StatusBadge>
              </div>
              <p className="text-subText">{n.body}</p>
              <p className="text-sm text-subText">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
