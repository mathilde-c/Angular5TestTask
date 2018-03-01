export class CategoriesCompletedAuditListRequestPayload {
    public UserId: number;
    public EndMillis: number;
    public StartMillis: number;

    public isEqual(other: CategoriesCompletedAuditListRequestPayload): boolean {
        return this.UserId === other.UserId
            && this.EndMillis === other.EndMillis
            && this.StartMillis === other.StartMillis;

    }
}
