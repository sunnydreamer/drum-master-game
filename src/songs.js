import Don, { Ka, Ballon } from "/src/drums.js";

export const songs = {
  song1: [
    // bar 1
    { time: (82 / 60) * 2400, note: new Don(), isLock: false },
    { time: (82 / 60) * 2915, note: new Don(), isLock: false },
    { time: (82 / 60) * 3430, note: new Ballon(), isLock: false },

    // bar 2
    { time: (82 / 60) * 4600, note: new Don(), isLock: false },
    { time: (82 / 60) * 5100, note: new Don(), isLock: false },
    { time: (82 / 60) * 5600, note: new Ballon(), isLock: false },

    // bar 3
    { time: (82 / 60) * 6700, note: new Don(), isLock: false },
    { time: (82 / 60) * 7200, note: new Don(), isLock: false },
    { time: (82 / 60) * 7700, note: new Ballon(), isLock: false },

    // bar 4
    { time: (82 / 60) * 8800, note: new Don(), isLock: false },
    { time: (82 / 60) * 9300, note: new Don(), isLock: false },
    { time: (82 / 60) * 9800, note: new Ka(), isLock: false },
    { time: (82 / 60) * 10300, note: new Ballon(), isLock: false },
  ],
};
