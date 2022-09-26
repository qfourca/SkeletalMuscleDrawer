//@ts-ignore
import foward from '../../static/image/icons/foward.svg'
//@ts-ignore
import replay from '../../static/image/icons/replay.svg'
//@ts-ignore
import skip_next from '../../static/image/icons/skip_next.svg'
//@ts-ignore
import skip_previous from '../../static/image/icons/skip_previous.svg'
//@ts-ignore
import setting from '../../static/image/icons/setting.svg'
//@ts-ignore
import fullscreen from '../../static/image/icons/fullscreen.svg'
//@ts-ignore
import fullscreen_exit from '../../static/image/icons/fullscreen_exit.svg'
//@ts-ignore
import pause from '../../static/image/icons/pause.svg'
export default interface IconInfo {
    src: string,
    onClick?: (e: any) => void
    color?: string
}
export {
    foward as foward,
    replay as replay,
    skip_next as skip_next,
    skip_previous as skip_previous,
    setting as setting,
    fullscreen as fullscreen,
    fullscreen_exit as fullscreen_exit,
    pause as pause
}