import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNoteById } from "@/server/notes";
import { JSONContent } from "@tiptap/core";

type Params = Promise<{ noteid: string }>;

export default async function NotePage({ params }: { params: Params }) {
  const { noteid } = await params;

  const { note } = await getNoteById(noteid);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`,
        },
        {
          label: note?.title ?? "Note",
          href: `/dashboard/notebook/${note?.notebook?.id}/note/${noteid}`,
        },
      ]}
    >
      <RichTextEditor
        content={note?.content as JSONContent[]}
        noteId={noteid}
      />
    </PageWrapper>
  );
}
