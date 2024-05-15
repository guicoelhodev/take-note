import { NextPage } from "next";
import Link from "next/link";

type TNotePage = {
  searchParams: {},
  params: {
    NotePage: string;
  }
};

type PageId = {
  parentPageId: null | string;
  pageId: string;
};

const NotePage: NextPage<TNotePage> = (props) => {

  const getPageId = (): PageId => {
    const ids = props.params.NotePage.split('_')

    return {
      parentPageId: ids.length === 1 ? null : ids[ids.length - 2],
      pageId: ids.length === 1 ? ids[0] : ids[ids.length - 1]
    }
  }

  const notePageId = getPageId();
  const newPageId = Math.floor(1000 + Math.random() * 9000)
  return (
    <div className="flex flex-col gap-4">

      <p>parent ID: {String(notePageId.parentPageId)}</p>
      <p>page ID: {notePageId.pageId}</p>

      <Link className="btn" href={`/auth/${notePageId.pageId}_${newPageId}`}>
        Adicionar página filha
      </Link>
    </div>
  )
}

export default NotePage
