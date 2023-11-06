import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import notFound from "@/app/not-found";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

export async function generateMetadata({ params }) {
  try {
    const blogPost = await loadBlogPost(params.postSlug);

    return {
      title: blogPost.frontmatter.title,
      description: blogPost.frontmatter.abstract,
    };
  } catch (error) {
    return {};
  }
}

async function BlogPost({ params }) {
  try {
    const blogPost = await loadBlogPost(params.postSlug);

    const {
      frontmatter: { title, publishedOn },
      content,
    } = blogPost;

    return (
      <article className={styles.wrapper}>
        <BlogHero title={title} publishedOn={publishedOn} />
        <div className={styles.page}>
          <MDXRemote
            source={content}
            components={{
              pre: CodeSnippet,
              DivisionGroupsDemo,
              CircularColorsDemo,
            }}
          />
        </div>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}

export default BlogPost;
