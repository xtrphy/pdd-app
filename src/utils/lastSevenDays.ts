import { Attempt } from "./rtk/reducers/profileSlice";

export const filterLast7Days = (attempts: Attempt[]) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    return attempts.filter(item => {
        const createdAt = new Date(item.created_at);
        return createdAt >= sevenDaysAgo && createdAt <= now;
    });
};