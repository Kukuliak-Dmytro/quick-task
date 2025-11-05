import { PostModule } from "@/app/modules/post";

import { PageContainer } from "@/app/shared/components/page-container";

interface IProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function FullPostPage(props: IProps) {
  const { id } = await props.params;

  return (
    <PageContainer>
      <PostModule postId={id} />
    </PageContainer>
  );
}
