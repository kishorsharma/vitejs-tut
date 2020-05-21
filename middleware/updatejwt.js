export default function updateJWT({router, to }) {
    if(to.query.jwt) {
        localStorage.setItem('jwt', to.query.jwt );
        return router.push({ name: 'profile' });
    } else {
        return router.push({ name: 'login' });
    }
}