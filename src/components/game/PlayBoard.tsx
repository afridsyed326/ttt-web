import { usePlayActions } from "@/store/play/playActions";
import { selectPlayState, setCurrentGame } from "@/store/play/playSlice";
import { getUpdatedState } from "@/utils/playUtils";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

const PlayBoard = () => {
    const { makeAMove } = usePlayActions();
    const dispatch = useDispatch();
    const { currentGame } = useSelector(selectPlayState);

    const markPlay = async (i: number, j: number) => {
        if (currentGame.gameState[i][j] !== 0) return;
        const newState = getUpdatedState(
            currentGame.gameState,
            [i, j],
            currentGame.userPlayer
        );

        dispatch(
            setCurrentGame({
                ...currentGame,
                gameState: newState,
            })
        );
        const moveResult = await makeAMove(currentGame.id, newState);

        const returnedState = moveResult.data.gameState;
        dispatch(
            setCurrentGame({
                ...currentGame,
                gameState: returnedState,
            })
        );

        const gameStatus = moveResult.data.gameStatus;

        if (gameStatus !== "ONGOING") {
            if (gameStatus === "DRAW") {
                addToast({
                    title: "No Result",
                    description: "Its a Draw",
                    color: "warning",
                });
            } else {
                const didPlayerWin =
                    moveResult.data.winner === currentGame.userPlayer;
                addToast({
                    title: didPlayerWin ? "Congrats!" : "Sorry!",
                    description: didPlayerWin ? "You Won" : "You Lost",
                    color: didPlayerWin ? "success" : "danger",
                });
            }
            dispatch(
                setCurrentGame({
                    ...currentGame,
                    gameOver: true,
                    gameState: returnedState,
                })
            );
        }
    };

    const borderClasses: any = {
        "00": "border-t-0 border-l-0",
        "01": "border-t-0",
        "02": "border-t-0 border-r-0",
        "10": "border-l-0",
        "11": "",
        "12": "border-r-0",
        "20": "border-l-0 border-b-0",
        "21": "border-b-0",
        "22": "border-b-0 border-r-0",
    };

    return (
        <div className="">
            {currentGame.gameState.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={clsx(
                                "w-32 h-32 border-2 flex justify-center text-bold text-[100px] items-center border-primary",
                                borderClasses[`${i}${j}`]
                            )}
                            onClick={() => {
                                markPlay(i, j);
                            }}
                        >
                            {cell === 0 ? "" : cell === -1 ? "X" : "O"}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PlayBoard;
