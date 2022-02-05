const lastDaySaved = (): number => {
  try {
    const lastDay = localStorage.getItem("lastDay");
    return lastDay ? JSON.parse(lastDay) : 0;
  } catch (e) {
    console.log({ e });
    return 0;
  }
};

export const dayCompleted = (): boolean => {
  const dayInSeconds = 86400;
  const now: number = Date.now();
  const typeElapsed: number = Math.abs(now - lastDaySaved()) / 1000;

  if (typeElapsed > dayInSeconds) {
    localStorage.setItem("lastDay", JSON.stringify(now));
    return true;
  }

  return false;
};
