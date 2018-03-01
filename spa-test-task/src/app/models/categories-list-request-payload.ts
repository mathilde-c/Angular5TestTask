export class CategoriesListRequestPayload {
    public UserId: number;
    public CategoryId: number;
    public LoadAttributes: boolean;

    public isEqual(other: CategoriesListRequestPayload): boolean {
        return this.UserId === other.UserId
            && this.CategoryId === other.CategoryId
            && this.LoadAttributes === other.LoadAttributes;
    }
}
