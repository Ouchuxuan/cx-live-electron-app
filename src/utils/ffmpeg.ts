import FfmpegPath from 'ffmpeg-static'
import { execFile } from 'child_process';
import { promisify } from 'util'
import appConfig from '@/config';
import { message } from 'ant-design-vue'

const execFilePro = promisify(execFile)
class FFmpegUtils {
  static checkCameraExist() {
    const winParams = ['-hide_banner', '-list_devices', 'true', '-f', 'dshow', '-i', 'dummy']
    const darwinParams = ['-hide_banner', '-f', 'avfoundation', '-list_devices', 'true', '-i', '""']
    let execParams;
    process.platform === 'win32' ? execParams = winParams : execParams = darwinParams

    execFilePro(FfmpegPath, execParams).then(({ stdout, stderr }) => {
      console.log(stderr, stdout)
    }).catch(error => {
      console.log(error.stderr.split('\n'))
    })
  }
  static async fullscreenRecording() {
    // ffmpeg -f gdigrab -i desktop -vcodec libx264 -preset:v ultrafast -tune:v zerolatency -f flv rtmp://eguid.cc:1935/rtmp/destop
    const params = ['-f', 'gdigrab', '-i', 'desktop', '-vcodec', 'libx264', '-preset:v', 'ultrafast', '-tune:v', 'zerolatency', '-f', 'flv', appConfig.liveUrl]
    // const params = ['-version']
    try {
      const { stderr, stdout } = await execFilePro(FfmpegPath, params)
      console.log(stdout)
    } catch (error) {
      // message.error(error.stderr)
      console.log(error)
    }
  }
}

export default FFmpegUtils
