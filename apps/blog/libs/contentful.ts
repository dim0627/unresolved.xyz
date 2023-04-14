import * as contentful from "contentful";
import { settings } from "./settings";

export class ContentfulService {
  client: ReturnType<typeof contentful.createClient>;

  constructor() {
    console.log("settings", settings);
    const clientParams: contentful.CreateClientParams = {
      space: settings.contentfulSpace,
      accessToken: settings.contentfulAccessToken,
      host: settings.contentfulPreviewEnabled
        ? "preview.contentful.com"
        : undefined,
    };

    this.client = contentful.createClient(clientParams);
  }

  getPosts() {
    return this.client.getEntries({
      content_type: "2wKn6yEnZewu2SCCkus4as",
    });
  }
}
