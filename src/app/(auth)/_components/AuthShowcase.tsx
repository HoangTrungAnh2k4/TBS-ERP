import type { IconType } from 'react-icons';
import { IoNotifications, IoStatsChart } from 'react-icons/io5';
import { MdFactory } from 'react-icons/md';
import { cn } from 'cn';
import Image from 'next/image';

type Highlight = {
    icon: IconType;
    title: string;
    detail: string;
    /** Màu ô icon + độ nghiêng của thẻ. */
    tone: string;
    tilt: string;
};

const HIGHLIGHTS: Highlight[] = [
    {
        icon: IoStatsChart,
        title: 'Sản lượng',
        detail: 'Theo dõi sản lượng từng line theo giờ',
        tone: 'bg-sub3 text-black',
        tilt: 'sm:-rotate-2',
    },
    {
        icon: MdFactory,
        title: 'Nhà máy & Line',
        detail: 'Quản lý nhà máy, line, tổ tập trung một chỗ',
        tone: 'bg-sub2 text-white',
        tilt: 'sm:rotate-1 sm:translate-y-2.5',
    },
    {
        icon: IoNotifications,
        title: 'Thông báo',
        detail: 'Nhận cảnh báo dừng máy, trễ kế hoạch ngay',
        tone: 'bg-success text-black',
        tilt: 'sm:-rotate-1',
    },
];

/** Phần giới thiệu bên trái: tiêu đề nổi bật + 3 thẻ tính năng. */
export default function AuthShowcase() {
    return (
        <section
            aria-label="Giới thiệu TBS ERP"
            className="flex flex-col flex-1 gap-5 lg:gap-7 pt-6 min-w-0 motion-safe:animate-fade"
        >
            <header className="flex items-center gap-2.5">
                <span className="place-items-center grid bg-main px-2.5 rounded-lg h-12">
                    <Image src="/img/logo-white.webp" alt="" width={191} height={95} preload unoptimized className="w-auto h-8" />
                </span>
                <span className="font-bold text-main text-2xl tracking-tight">TBS ERP</span>
            </header>
            <p className="font-bold text-main text-3xl sm:text-5xl xl:text-6xl text-balance leading-tight tracking-tight">
                Mọi chuyền sản xuất, gói gọn trong{' '}
                <span className="inline-block bg-sub3 shadow-[4px_4px_0_0_#000] px-2 border-2 border-black rounded-lg">
                    một màn hình.
                </span>
            </p>

            <ul className="hidden sm:flex flex-wrap gap-8 xl:gap-4.5 pt-2">
                {HIGHLIGHTS.map(({ icon: Icon, title, detail, tone, tilt }) => (
                    <li
                        key={title}
                        className={cn(
                            'flex flex-col flex-1 gap-2.5 bg-card shadow-[4px_4px_0_0_#000] p-4.5 border-2 border-black rounded-xl basis-44',
                            tilt,
                        )}
                    >
                        <span className={cn('place-items-center grid border-2 border-black rounded-lg size-10', tone)}>
                            <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <strong className="font-bold text-main">{title}</strong>
                        <span className="text-subText text-sm leading-normal">{detail}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
