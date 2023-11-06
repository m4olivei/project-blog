import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import Spinner from "@/components/Spinner";

async function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      <React.Suspense fallback={<Spinner />}>
        <BlogPosts />
      </React.Suspense>
    </div>
  );
}

async function BlogPosts() {
  const blogPosts = await getBlogPostList();
  return blogPosts.map(({ slug, ...rest }) => (
    <BlogSummaryCard key={slug} slug={slug} {...rest} />
  ));
}

export default Home;
