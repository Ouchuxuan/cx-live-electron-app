import { Tray, Menu } from 'electron'
import path from 'path';
export const genAppTray = () => {
    const trayIcon = path.join(__dirname, '../public/assets');//app是选取的目录
    const tray = new Tray(path.join(trayIcon, 'appTaryLogo.png'));//app.ico是app目录下的ico文件
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'normal' },
        { label: 'Item2', type: 'normal' },
        { label: 'Item3', type: 'normal' },
        { label: 'Item56', type: 'normal' }
    ])
    tray.setToolTip('cx livePlayer')
    tray.setContextMenu(contextMenu);
    return tray;
}