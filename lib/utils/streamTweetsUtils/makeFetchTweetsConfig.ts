export default function makeFetchTweetsConfig(maxResults: number, minutes: number) {
    const minAgo = 23;
    const startDate = new Date();
    startDate.setTime(startDate.getTime() - (minAgo + minutes)*60*1000);

    const endDate = new Date();
    endDate.setTime(endDate.getTime() - minAgo*60*1000);

    return {
        maxResults: maxResults,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
    }
}