type Team = string;
type Match = [Team, Team];

// Times de cada chave
const groupA: Team[] = ['Equipe A1', 'Equipe A2', 'Equipe A3', 'Equipe A4'];
const groupB: Team[] = ['Equipe B1', 'Equipe B2', 'Equipe B3', 'Equipe B4'];

export function generateMatches(teams: Team[]): Match[] {
    const matches: Match[] = [];
    const n = teams.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            matches.push([teams[i], teams[j]]);
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

// const matchesGroupA = generateMatches(groupA);
// const matchesGroupB = generateMatches(groupB);
// const tournamentMatches = intercalateMatches(matchesGroupA, matchesGroupB);

// tournamentMatches.forEach(match => {
//     console.log(`${match[0]} vs ${match[1]}`);
// });
