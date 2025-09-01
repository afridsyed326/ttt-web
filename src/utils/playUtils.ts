export const getUpdatedState = (
    currentState: number[][],
    move: [number, number],
    player: number
) => {
    let newState = currentState.map((row) => [...row]);
    newState[move[0]][move[1]] = player;
    return newState;
};

export const formatDate = (
    isoString: string,
    locale: string = navigator.language,
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }
): string => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(locale, options).format(date);
};
