import { TestBed, inject } from "@angular/core/testing";

import { UserService } from "./user.service";

describe("UserService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });

    it("should be created", inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it("should provide the id of the currently connected user", inject([UserService], (service: UserService) => {
        const userId = service.getUserId();

        expect(typeof (userId)).toEqual("number");
    }));
});
