import { formatDistanceToNow, differenceInSeconds } from 'date-fns';

export const formatDate = (date: number): string => {
    const secondsAgo = differenceInSeconds(new Date(), date);

    if (secondsAgo < 60) {
        return 'just now';
    }

    return formatDistanceToNow(date, { addSuffix: true });
};

