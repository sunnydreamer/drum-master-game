import Don, { Ka, Ballon } from "/src/drums.js";

const timeGenerator = (barIndex, noteIndex) => {
  let bpm = 82;
  let startTime = 3350;
  let time =
    startTime + barIndex * (60000 / bpm) * 4 + noteIndex * (60000 / 82);

  return time;
};

export const songs = {
  song1: [
    // bar 1
    { time: timeGenerator(0, 0), note: new Don(), isLock: false },
    { time: timeGenerator(0, 1), note: new Don(), isLock: false },
    { time: timeGenerator(0, 1.5), note: new Ballon(), isLock: false },

    // bar 2
    { time: timeGenerator(1, 0), note: new Don(), isLock: false },
    { time: timeGenerator(1, 1), note: new Don(), isLock: false },
    { time: timeGenerator(1, 1.5), note: new Ballon(), isLock: false },

    // bar 3
    { time: timeGenerator(2, 0), note: new Don(), isLock: false },
    { time: timeGenerator(2, 1), note: new Don(), isLock: false },
    { time: timeGenerator(2, 1.5), note: new Ballon(), isLock: false },

    // bar 4
    { time: timeGenerator(3, 0), note: new Don(), isLock: false },
    { time: timeGenerator(3, 1), note: new Don(), isLock: false },
    { time: timeGenerator(3, 1.5), note: new Ballon(), isLock: false },
    // { time: timeGenerator(3, 2.5), note: new Ka(), isLock: false },
    // { time: timeGenerator(3, 3.5), note: new Don(), isLock: false },

    // bar 5
    { time: timeGenerator(4, 0), note: new Ka(), isLock: false },
    { time: timeGenerator(4, 1), note: new Ka(), isLock: false },
    { time: timeGenerator(4, 2), note: new Don(), isLock: false },
    { time: timeGenerator(4, 2.25), note: new Ballon(), isLock: false },

    // bar 6
    { time: timeGenerator(5, 0), note: new Ka(), isLock: false },
    { time: timeGenerator(5, 1), note: new Ka(), isLock: false },
    { time: timeGenerator(5, 2), note: new Don(), isLock: false },
    { time: timeGenerator(5, 2.25), note: new Ballon(), isLock: false },

    // bar7
    { time: timeGenerator(6, 0), note: new Ka(), isLock: false },
    { time: timeGenerator(6, 1), note: new Ka(), isLock: false },
    // { time: timeGenerator(6, 2), note: new Ka(), isLock: false },
    // { time: timeGenerator(6, 3), note: new Ka(), isLock: false },

    // bar8
    { time: timeGenerator(7, 0), note: new Don(), isLock: false },
    { time: timeGenerator(7, 1), note: new Don(), isLock: false },
    // { time: timeGenerator(7, 2), note: new Don(), isLock: false },
    // { time: timeGenerator(7, 3), note: new Don(), isLock: false },

    // bar9
    { time: timeGenerator(8, 0), note: new Ka(), isLock: false },
    { time: timeGenerator(8, 1), note: new Ka(), isLock: false },
    { time: timeGenerator(8, 2), note: new Don(), isLock: false },
    { time: timeGenerator(8, 2.5), note: new Ballon(), isLock: false },

    // bar10
    { time: timeGenerator(9, 0), note: new Ka(), isLock: false },
    { time: timeGenerator(9, 1), note: new Ka(), isLock: false },
    { time: timeGenerator(9, 2), note: new Don(), isLock: false },
    { time: timeGenerator(9, 2.5), note: new Ballon(), isLock: false },

    // bar11
    { time: timeGenerator(10, 0), note: new Ka(), isLock: false },

    // bar12
    { time: timeGenerator(11, 0), note: new Ballon(), isLock: false },
  ],
};
