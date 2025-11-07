import { PostsSection } from "@/app/features/posts";
import { PageContainer } from "@/app/shared/components/page-container";
import { CreatePostForm } from "@/app/features/create-post/create-post-form.component";
import { getTranslations } from "next-intl/server";

//interface
interface IProps {
  listViewType: string;
}

//component
/**
 * PostsModule component.
 */
export const PostsModule = async (props: IProps) => {
  const { listViewType } = props;
  const t = await getTranslations();

  //return
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-foreground text-center">
          {t("posts_title")}
        </h1>
        <div className="mb-4 rounded-md bg-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            GrowthBook Feature Flag:
          </p>
          <p className="mt-2 text-lg font-bold text-foreground">
            flag_recipe_list_view_optimization_v2 = {listViewType}
          </p>
        </div>
        <CreatePostForm />
        <PostsSection listViewType={listViewType} />
      </div>
    </PageContainer>
  );
};
