import { Attempt } from "./rtk/reducers/profileSlice";

export const filterLast7Days = (attempts: Attempt[]) => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return attempts.filter(attempt => {
        const attemptDate = new Date(attempt.created_at);
        return attemptDate >= sevenDaysAgo && attemptDate <= now;
    });
};