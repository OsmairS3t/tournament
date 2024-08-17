type Team = string;
type Group = string;
type Match = [Team, Team, Group];

export function generateMatches(teams: Team[], group: string): Match[] {
    const matches: Match[] = [];
    const n = teams.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            matches.push([teams[i], teams[j], group]);
        }
    }

    return matches;
}

export function intercalateMatches(groupA: Match[], groupB: Match[]): Match[] {
    const intercalated: Match[] = [];
    const maxLength = Math.max(groupA.length, groupB.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < groupA.length) {
            intercalated.push(groupA[i]);
        }
        if (i < groupB.length) {
            intercalated.push(groupB[i]);
        }
    }

    return intercalated;
}

