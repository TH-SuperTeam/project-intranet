import { useEffect, useState } from "react";

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(() => new Date());

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now);

            // Calculate milliseconds until the next minute
            const msUntilNextMinute =
                60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());

            timeoutId = setTimeout(updateTime, msUntilNextMinute);
        };

        updateTime();

        return () => clearTimeout(timeoutId);
    }, []);

    return currentTime;
};
