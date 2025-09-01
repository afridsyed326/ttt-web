import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type TGameData = {
    gameState: number[][];
    id: string;
    userPlayer: number;
    gameOver: boolean;
};
