import { PostPageComponent } from "@/modules/posts/post-page/post-page.component";

export default async function PostDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  // await requireAuth();
  const { id } = await props.params;
  return <PostPageComponent postId={id} />;
}
