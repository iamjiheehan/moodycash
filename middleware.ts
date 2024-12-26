import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/bankingaccount(.*)',
    '/mood(.*)',
    '/profile(.*)',
    '/service(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});

// export default clerkMiddleware(async (auth, req) => {
//     const start = performance.now(); // 시작 시간 기록
//     const end = performance.now(); // 종료 시간 기록
//     console.log(`Middleware execution time: ${end - start}ms`);

//     if (isProtectedRoute(req)) {
//         await auth.protect();
//     }
// });

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
