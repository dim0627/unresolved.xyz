import * as contentful from "contentful";
import { settings } from "./settings";

export class ContentfulService {
  client: ReturnType<typeof contentful.createClient>;

  constructor() {
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

  async getPost(slug: string) {
    const posts = await this.getPosts();
    return posts.items.find((post) => post.fields.slug === slug);
  }
}
