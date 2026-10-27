'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
    LuChevronsUpDown,
    LuEye,
    LuFilePlus,
    LuHistory,
    LuLogOut,
    LuMenu,
    LuMonitor,
    LuSettings,
    LuSmartphone,
    LuTable,
    LuUser,
    LuX,
} from 'react-icons/lu';
import { IoNotifications, IoStatsChart } from 'react-icons/io5';
import { MdFactory } from 'react-icons/md';
import { FaUsersBetweenLines } from 'react-icons/fa6';
import { PiNetworkFill } from 'react-icons/pi';
import { TiGroup } from 'react-icons/ti';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Chiều cao mỗi mục. PHẢI khớp với class `h-16` (64px) bên dưới,
 * vì thanh trượt (indicator) được dịch chuyển theo index * ITEM_H.
 */
const ITEM_H = 64;

// shortcut: user cứng, thay bằng user đăng nhập khi có auth
const user = { name: 'Nguyễn Văn A', role: 'Quản lý sản xuất', initials: 'NA' };

type NavItem = { label: string; href: string; icon: IconType };

const items: NavItem[] = [
    { label: 'Thông Báo', href: '/thong-bao', icon: IoNotifications },
    { label: 'Thống Kê', href: '/thong-ke', icon: IoStatsChart },
    { label: 'DS Nhà Máy', href: '/nha-may', icon: MdFactory },
    { label: 'DS Line', href: '#', icon: FaUsersBetweenLines },
    { label: 'DS Tổ', href: '#', icon: TiGroup },
    // { label: 'Tạo Sơ Đồ', href: '#', icon: PiNetworkFill },
    // { label: 'Tạo Sản Lượng', href: '#', icon: LuFilePlus },
    // { label: 'Thiết Lập Tăng Ca', href: '#', icon: LuHistory },
    // { label: 'Báo Cáo SL', href: '#', icon: LuTable },
    // { label: 'Xem Sản Lượng', href: '#', icon: LuEye },
    // { label: 'Trạm Bấm Di Động', href: '#', icon: LuSmartphone },
    // { label: 'Màn Hình CĐ', href: '#', icon: LuMonitor },
    // { label: 'Hệ Thống', href: '#', icon: LuSettings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const activeIndex = items.findIndex((item) => pathname === item.href || pathname.startsWith(item.href + '/'));

    return (
        <>
            <MobileTopBar activeIndex={activeIndex} />
            <aside
                data-collapsed={collapsed}
                className={`sidebar-root  sticky top-0 z-10 hidden md:flex h-dvh shrink-0 flex-col self-start bg-main ${
                    collapsed ? 'w-20' : 'w-64'
                }`}
            >
                <style>{`
        @keyframes sidebar-in {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes sidebar-pop {
          0%   { transform: scale(0.6) rotate(-20deg); }
          60%  { transform: scale(1.3) rotate(8deg); }
          100% { transform: scale(1.1) rotate(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sidebar-root, .sidebar-root * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

                {/* Header: logo kiêm nút thu gọn */}
                <div
                    className="z-20 relative flex justify-center items-center my-4"
                    style={{ animation: 'sidebar-in 500ms ease-out both' }}
                >
                    <button
                        type="button"
                        onClick={() => setCollapsed((v) => !v)}
                        aria-label={collapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
                        aria-expanded={!collapsed}
                        className="flex justify-center items-center hover:bg-white/10 px-2 rounded-lg focus-visible:outline-2 focus-visible:outline-sub3 h-16 cursor-pointer"
                    >
                        <Image
                            src="/img/logo-white.webp"
                            alt=""
                            width={191}
                            height={95}
                            preload
                            // ảnh gốc đã nhỏ + lossless, để Next nén lại chỉ làm mờ cạnh chữ
                            unoptimized
                            className={`w-auto transition-[height] ${collapsed ? 'h-6' : 'h-16'}`}
                        />
                    </button>
                </div>

                <SidebarNav activeIndex={activeIndex} collapsed={collapsed} />

                {/* Tài khoản: ghim đáy sidebar, xuất hiện ngay sau mục nav cuối */}
                <div
                    className="mt-auto p-3"
                    style={{
                        animation: `sidebar-in 600ms ${150 + items.length * 90}ms cubic-bezier(0.22,1,0.36,1) both`,
                    }}
                >
                    <UserMenu collapsed={collapsed} />
                </div>
            </aside>
        </>
    );
}

interface SidebarNavProps {
    activeIndex: number;
    collapsed: boolean;
    /** Gọi khi chọn một mục (đóng drawer trên mobile). */
    onNavigate?: () => void;
}

function SidebarNav({ activeIndex, collapsed, onNavigate }: SidebarNavProps) {
    return (
        // ERP nhiều mục hơn Toeco nên cho cuộn; -mt-8 pt-8 / pb-8 chừa chỗ cho 2 góc bo ngược của thanh trượt (không thì vùng cuộn cắt mất),
        // header phía trên đặt z-20 để vùng cuộn lấn lên không che nút,
        // -mr-px để pill lấn 1px sang nội dung (thay -right-px của Toeco, vì vùng cuộn cắt mất phần tràn)
        <div className="flex-1 -mt-8 -mr-px pt-8 pb-8 min-h-0 overflow-x-hidden overflow-y-auto scrollbar-none">
            <nav className="relative">
                {/* Thanh trượt: pill sáng + 2 góc bo ngược (trên & dưới) nối liền với nội dung */}
                <div
                    aria-hidden
                    className={`pointer-events-none absolute right-0 left-2 top-0 h-16 rounded-l-full bg-canvas transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] before:absolute before:-top-8 before:right-0 before:size-8 before:bg-[radial-gradient(circle_at_0_0,transparent_31.5px,var(--color-canvas)_32px)] before:content-[''] after:absolute after:-bottom-8 after:right-0 after:size-8 after:bg-[radial-gradient(circle_at_0_100%,transparent_31.5px,var(--color-canvas)_32px)] after:content-[''] ${
                        activeIndex < 0 ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ transform: `translateY(${Math.max(activeIndex, 0) * ITEM_H}px)` }}
                />

                <ul>
                    {items.map((item, i) => {
                        const active = i === activeIndex;
                        const Icon = item.icon;

                        return (
                            <li
                                key={item.label}
                                style={{
                                    animation: `sidebar-in 600ms ${150 + i * 90}ms cubic-bezier(0.22,1,0.36,1) both`,
                                }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={onNavigate}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative z-10 flex h-16 items-center gap-4 ${!active ? 'hover:bg-white/10' : ''} ${
                                        collapsed ? 'pl-7' : 'pl-9'
                                    }`}
                                >
                                    <Icon
                                        // key đổi theo active để chạy lại animation "pop" mỗi lần được chọn
                                        key={active ? 'on' : 'off'}
                                        className={`size-6 shrink-0 ${active ? 'text-black' : 'text-white'}`}
                                        style={active ? { animation: 'sidebar-pop 500ms ease-out both' } : undefined}
                                    />
                                    <span
                                        className={`whitespace-nowrap text-base  ${
                                            active ? 'text-black font-bold' : 'text-white font-semibold'
                                        } ${collapsed ? 'sr-only' : ''}`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

/** Khối tài khoản ở đáy sidebar: avatar + tên, bấm để mở menu tài khoản. */
function UserMenu({ collapsed }: { collapsed: boolean }) {
    const isMobile = useIsMobile();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 data-popup-open:bg-white/10 hover:bg-white/10 p-2 rounded-lg focus-visible:outline-2 focus-visible:outline-sub3 focus-visible:outline-offset-2 w-full overflow-hidden text-left transition-colors cursor-pointer">
                <Avatar size="lg" className="after:border-0">
                    <AvatarFallback className="bg-sub3 font-semibold text-on-sub3">{user.initials}</AvatarFallback>
                </Avatar>
                <span className={`flex-1 grid min-w-0 leading-tight ${collapsed ? 'sr-only' : ''}`}>
                    <span className="font-semibold text-white text-sm truncate">{user.name}</span>
                    <span className="text-sub1/70 text-xs truncate">{user.role}</span>
                </span>
                <LuChevronsUpDown
                    aria-hidden="true"
                    className={`size-4 text-sub1/70 shrink-0 ${collapsed ? 'hidden' : ''}`}
                />
            </DropdownMenuTrigger>

            {/* Desktop: bung sang phải, sideOffset = padding khung bọc (12px) + 8px để menu nằm ngoài mép sidebar */}
            <DropdownMenuContent
                side={isMobile ? 'top' : 'right'}
                align={isMobile ? 'start' : 'end'}
                sideOffset={isMobile ? 28 : 20}
                alignOffset={isMobile ? 0 : 50}
                className="w-60"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex items-center gap-2 py-1.5 font-normal text-sm">
                        <Avatar>
                            <AvatarFallback className="bg-sub3 font-semibold text-on-sub3 text-xs">
                                {user.initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className="flex-1 grid min-w-0 leading-tight">
                            <span className="font-semibold text-main truncate">{user.name}</span>
                            <span className="text-subText text-xs truncate">{user.role}</span>
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LuUser aria-hidden="true" />
                        Hồ sơ
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LuSettings aria-hidden="true" />
                        Cài đặt
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <LuLogOut aria-hidden="true" />
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/** Dưới `md`: thanh trên cùng với nút mở drawer chứa nav và khối tài khoản. */
function MobileTopBar({ activeIndex }: { activeIndex: number }) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <header className="md:hidden top-0 z-20 sticky flex items-center bg-main px-4 h-14">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                    aria-label="Mở menu điều hướng"
                    className="flex justify-center items-center hover:bg-white/10 rounded-lg focus-visible:outline-2 focus-visible:outline-sub3 size-10 text-white cursor-pointer"
                >
                    <LuMenu aria-hidden="true" className="size-6" />
                </SheetTrigger>
                <SheetContent side="left" showCloseButton={false} className="gap-0 bg-main border-none w-64">
                    <div className="z-20 relative flex justify-end items-center pr-3 pl-4 h-20">
                        <SheetTitle className="sr-only">Điều hướng</SheetTitle>
                        <SheetClose
                            aria-label="Đóng menu"
                            className="flex justify-center items-center hover:bg-white/10 rounded-lg focus-visible:outline-2 focus-visible:outline-sub3 size-10 text-white cursor-pointer"
                        >
                            <LuX aria-hidden="true" className="size-5" />
                        </SheetClose>
                    </div>
                    <SidebarNav activeIndex={activeIndex} collapsed={false} onNavigate={close} />
                    <div className="mt-auto p-3">
                        <UserMenu collapsed={false} />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}

/**
 * Khung giữ chỗ khi `usePathname` chưa resolve (route có param động),
 * cùng kích thước sidebar mở rộng để không bị giật layout.
 */
export function SidebarFallback() {
    return (
        <>
            <div aria-hidden="true" className="md:hidden top-0 z-20 sticky bg-main h-14" />
            <div aria-hidden="true" className="hidden md:block top-0 sticky self-start bg-main w-64 h-dvh shrink-0" />
        </>
    );
}
