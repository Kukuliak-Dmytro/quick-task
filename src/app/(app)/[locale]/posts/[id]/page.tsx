import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PostModule } from "@/app/modules/post";
import { PageContainer } from "@/app/shared/components/page-container";
import { routing } from "@/pkg/libraries/locale/routing";

export const revalidate = 30;

interface IProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function FullPostPage(props: IProps) {
  const { id, locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <PageContainer>
      <PostModule postId={id} />
    </PageContainer>
  );
}
