import { Game } from "./core/Logic/Game";
import { PageGameViewer } from "./core/Viewer/PageGameViewer";



const viewer = new PageGameViewer();
const game = new Game(viewer);
game.start();
