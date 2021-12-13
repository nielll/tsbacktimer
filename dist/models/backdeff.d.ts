import Attacker from './attacker';
interface IBackDeff {
    readonly autoReturnAt: Date;
    readonly departure: Date;
    readonly durationMs: number;
    readonly domElement: HTMLTableElement;
    readonly duration: string;
    execute: () => void;
}
export default class BackDeff implements IBackDeff {
    private readonly attacker;
    readonly autoReturnAt: Date;
    readonly departure: Date;
    readonly durationMs: number;
    readonly domElement: HTMLTableElement;
    readonly duration: string;
    readonly arrival: Date;
    constructor(duration: string, arrival: string, attacker: Attacker);
    execute(): void;
    private getDurationMs;
    private getDeparture;
    private generateMsFromRegex;
    private getAutoReturnAt;
    private generateDateFromString;
}
export {};
