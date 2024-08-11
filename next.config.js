module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://smart-board-backend.vercel.app',
            },
        ];
    },
};