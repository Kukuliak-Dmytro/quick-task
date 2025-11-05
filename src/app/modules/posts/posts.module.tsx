import { PostsSection } from "@/app/features/posts";
import { PageContainer } from "@/app/shared/components/page-container";
import { CreatePostForm } from "@/app/features/create-post/create-post-form.component";
import { getTranslations } from "next-intl/server";
/**
 * PostsModule component.
 *
 * This module renders the posts section feature with all post-related functionality.
 *
 * @returns Promise that resolves to JSX element representing the posts module
 */
export const PostsModule = async () => {
  const t = await getTranslations();
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-foreground text-center">
          {t("posts_title")}
        </h1>
        <CreatePostForm />
        <PostsSection />
      </div>
    </PageContainer>
  );
};
