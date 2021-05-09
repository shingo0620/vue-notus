export default function ({router, next}) {
    if (!localStorage.getItem('accessToken')) {
        return router.push({ name: 'login' });
    }
    next()
}