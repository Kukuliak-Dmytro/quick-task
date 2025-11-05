import { PostModule } from "@/app/modules/post";

import { PageContainer } from "@/app/shared/components/page-container";

export default async function PostDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  // await requireAuth();
  const { id } = await props.params;
  return (
    <PageContainer>
      <PostModule postId={id} />
    </PageContainer>
  );
}
