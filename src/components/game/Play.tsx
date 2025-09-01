import { Button } from "@heroui/button";
import PlayBoard from "./PlayBoard";
import { usePlayActions } from "@/store/play/playActions";
import { Tabs, Tab } from "@heroui/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
    selectPlayState,
    setCurrentGame,
    resetGame,
} from "@/store/play/playSlice";

const Play = () => {
    const { startNewGame } = usePlayActions();
    const dispatch = useDispatch();
    const { currentGame } = useSelector(selectPlayState);

    const handleStartGame = async () => {
        const res = await startNewGame(currentGame.userPlayer);
        const data = res.data;
        dispatch(
            setCurrentGame({
                ...currentGame,
                id: data.id,
                gameState: data.gameState,
            })
        );
    };

    const handlePlayerSelect = (userPlayer: number) => {
        dispatch(
            setCurrentGame({
                ...currentGame,
                userPlayer,
            })
        );
    };

    const handlePlayAgain = () => {
        dispatch(resetGame());
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5">
                {currentGame.id === "" ? (
                    <div className="w-1/2 flex flex-col justify-center gap-20">
                        <h2 className="font-bold text-[50px] text-center">
                            Choose who plays first
                        </h2>
                        <div className="flex items-center gap-2 w-full justify-center">
                            <Tabs
                                aria-label="Options"
                                selectedKey={`${currentGame.userPlayer}`}
                                onSelectionChange={(key) => {
                                    handlePlayerSelect(Number(key));
                                }}
                            >
                                <Tab
                                    key="-1"
                                    title="Me"
                                    className="w-32 h-32"
                                ></Tab>
                                <Tab
                                    key="1"
                                    title="Computer"
                                    className="w-32 h-32"
                                ></Tab>
                            </Tabs>
                        </div>

                        <div className="text-center">
                            <Button
                                className="h-16 text-[30px] w-32 bg-primary text-white"
                                onPress={handleStartGame}
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                ) : (
                    <PlayBoard />
                )}
            </div>
            {currentGame.gameOver && (
                <div className="text-center mt-10">
                    <Button
                        className="bg-primary text-white"
                        onPress={handlePlayAgain}
                    >
                        Play Again
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Play;
