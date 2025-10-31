import { PostsPageComponent } from "@/modules/posts/posts-page/posts-page.component";
import { requireAuth } from "@/shared/utils/auth-utils";

export default async function PostsPage() {
  // await requireAuth();
  return <PostsPageComponent />;
}
