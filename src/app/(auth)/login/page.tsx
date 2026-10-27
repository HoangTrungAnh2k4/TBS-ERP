import type { Metadata } from 'next';
import AuthCard from '../_components/AuthCard';
import LoginForm from '../_components/LoginForm';

export const metadata: Metadata = {
    title: 'Đăng nhập',
};

export default function LoginPage() {
    return (
        <AuthCard
            title="Chào mừng trở lại"
            description="Đăng nhập để theo dõi sản lượng và vận hành nhà máy."
            alternate={{ prompt: 'Chưa có tài khoản?', label: 'Liên hệ quản trị viên', href: '#' }}
        >
            <LoginForm />
        </AuthCard>
    );
}
