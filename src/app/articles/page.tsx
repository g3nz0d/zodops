import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { publishedArticles } from "@/lib/content";

export const metadata: Metadata = {
  description:
    "Implementation-level articles on AI and agent security, data security, field notes, and security automation.",
};

export default function ArticlesPage() {
  return (
    <section className="container-page py-14 sm:py-16">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
        Articles
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight italic sm:text-4xl lg:whitespace-nowrap">
        &ldquo;The playbook I wish I&rsquo;d had.&rdquo;
      </h1>
      <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground lg:whitespace-nowrap">
        Implementation-level guides for securing cloud, data, and AI agents.
      </p>
      {publishedArticles.length > 0 ? (
        <div className="mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
          {publishedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          First essays are in progress. Check back soon.
        </p>
      )}
    </section>
  );
}
