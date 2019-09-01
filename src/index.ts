import { Game } from "./core/Logic/Game";
import { PageGameViewer } from "./core/Viewer/PageGameViewer";
import '../public/index.css';

const viewer = new PageGameViewer();
const game = new Game(viewer);

// game.start();
