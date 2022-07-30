import App from './index'

const app = new App(window.innerWidth, window.innerHeight)
window.addEventListener('resize', () => {
    app.resize(window.innerWidth, window.innerHeight)
}, false)