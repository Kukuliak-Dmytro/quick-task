import { PostsModule } from "@/app/modules/posts";

import { PageContainer } from "@/app/shared/components/page-container";

export default async function PostsPage() {
  return (
    <PageContainer>
      <PostsModule />
    </PageContainer>
  );
}
