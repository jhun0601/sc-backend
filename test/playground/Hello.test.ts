import { handler } from "../../services/SpacesTable/Create";

const event = {
    body: {
        location: "Philippines"
    }
}

handler(event as any, {} as any);
