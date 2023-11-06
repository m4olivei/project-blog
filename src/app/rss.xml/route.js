import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";
import { headers } from "next/headers";
var RSS = require("rss");

export async function GET(request) {
  const headersList = headers();
  const host = headersList.get("host");

  const blogPosts = (await getBlogPostList()).map(
    ({ slug, title, abstract, publishedOn }) => {
      return {
        title,
        description: abstract,
        url: `http://${host}/${slug}`,
        date: publishedOn,
        guid: slug,
      };
    }
  );
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });
  blogPosts.forEach((blogPost) => feed.item(blogPost));

  // @todo condition indent on dev mode
  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
