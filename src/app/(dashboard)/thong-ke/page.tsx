import type { Metadata } from 'next';
import { LuClock, LuFactory, LuPackage, LuTarget } from 'react-icons/lu';

export const metadata: Metadata = { title: 'Thống Kê' };

// shortcut: dữ liệu mẫu, thay bằng API khi có backend
const stats = [
    { label: 'Sản lượng hôm nay', value: '12.480', unit: 'sp', icon: LuPackage },
    { label: 'Đạt kế hoạch', value: '92,4', unit: '%', icon: LuTarget },
    { label: 'Line đang chạy', value: '38', unit: '/ 42', icon: LuFactory },
    { label: 'Giờ tăng ca', value: '164', unit: 'giờ', icon: LuClock },
];

export default function ThongKePage() {
    return (
        <div className="space-y-6">
            <div className="gap-4 grid sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, unit, icon: Icon }) => (
                    <div key={label} className="bg-card p-5 border border-sub2/30 rounded-2xl">
                        <div className="flex justify-between items-center text-subText">
                            <span className="text-sm">{label}</span>
                            <Icon className="size-5 text-sub2" aria-hidden />
                        </div>
                        <p className="mt-3 font-semibold text-3xl">
                            {value} <span className="font-normal text-subText text-base">{unit}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
