type NavLink = {
    href: string;
    label: string;
};

export const profileLinks: NavLink[] = [{ href: '/profile', label: '프로필' }];

export const navMenuLinks: NavLink[] = [
    { href: '/service', label: 'service' },
    { href: '/mood', label: 'mood' },
    { href: '/settings', label: 'settings' },
];
