export const isExpired = (dateToCheck: string): boolean => {
    return (new Date(dateToCheck)).getTime() < new Date().getTime();
};
