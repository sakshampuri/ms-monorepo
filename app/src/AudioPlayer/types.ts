export type playerActions =
    | { type: "request" }
    | { type: "success" }
    | { type: "fail"; err: "string" }
    | { type: "close" }
    | { type: "launch"; playlistId: number }
    | { type: "play" }
    | { type: "pause" };

export type playerStateType = {
    visible: boolean;
    currentState: "playing" | "paused" | "buffering";
    error?: "string";
    playlistId?: number;
};
