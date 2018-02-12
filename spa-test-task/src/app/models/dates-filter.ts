export class DatesFilter {
    fromMilliSec: number;
    toMilliSec: number;

    constructor(from: number, to: number) {
        this.fromMilliSec = from;
        this.toMilliSec = to;
    }
}