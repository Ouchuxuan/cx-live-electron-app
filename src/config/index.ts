const isDev = process.env.NODE_ENV === 'development' ? true : false
const hostName = window.location.hostname
const liveName = 'room101'
export default {
    liveUrl: isDev ? `rtmp://${hostName}/live/${liveName}` : '',
}