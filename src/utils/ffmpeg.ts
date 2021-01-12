import FfmpegCommand from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
FfmpegCommand.setFfmpegPath(ffmpegPath);
class FFmpegUtils{
  private command:FfmpegCommand.FfmpegCommand;
  constructor(){
    this.command = FfmpegCommand()
  }
  static checkCameraExist(){
    // ffmpeg -f avfoundation -list_devices true -i ""
  }
}

export default FFmpegUtils
