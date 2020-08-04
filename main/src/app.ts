import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from 'electron';
import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const devMenu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'toggleDevTools' },
    ],
  },
];

const menu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    role: 'fileMenu',
  },
  ...(isDev ? devMenu : []),
];

const initializeAppWindow = () => {
  const appWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: isDev ? true : false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (isDev) appWindow.webContents.openDevTools({ mode: 'undocked' });

  appWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  appWindow.on('closed', () => appWindow.destroy());
};

app.on('ready', () => {
  initializeAppWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});
