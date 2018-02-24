export class DatesFilter {
    public fromMilliSec: number;
    public toMilliSec: number;

    constructor(from: number, to: number) {
        this.fromMilliSec = from;
        this.toMilliSec = to;
    }
}
