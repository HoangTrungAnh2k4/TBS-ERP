'use client';

import Link from 'next/link';
import { LuLockKeyhole, LuUser } from 'react-icons/lu';
import Button from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import AuthCheckboxField from './AuthCheckboxField';
import AuthTextField from './AuthTextField';

// shortcut: chỉ là giao diện, submit chưa làm gì; nối API đăng nhập khi có backend
export default function LoginForm() {
    return (
        // method="post": bấm trước khi hydrate thì không để mật khẩu lên URL
        <form method="post" noValidate onSubmit={(e) => e.preventDefault()}>
            <FieldGroup className="gap-4">
                <AuthTextField
                    name="username"
                    label="Tên đăng nhập"
                    icon={LuUser}
                    autoComplete="username"
                    placeholder="Mã nhân viên hoặc email"
                />
                <AuthTextField
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    icon={LuLockKeyhole}
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                />
                <div className="flex justify-between items-center gap-4">
                    <AuthCheckboxField name="remember" defaultChecked label="Ghi nhớ đăng nhập" />
                    <Link
                        href="#"
                        className="rounded-sm focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2 font-semibold text-main text-sm hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" className="gap-2 mt-2">
                    Đăng nhập
                </Button>
            </FieldGroup>
        </form>
    );
}
