type NavLink = {
    href: string;
    label: string;
};

export const profileLinks: NavLink[] = [{ href: '/profile', label: '프로필' }];

export const navMenuLinks: NavLink[] = [
    { href: '/service', label: '서비스 이용' },
    { href: '/mood', label: '기록 보기' },
    { href: '/settings', label: '계좌 관리' },
];
