import { Editor } from "@/components/UI/Editor";
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


const fetchTestApi = async () => {
  return await fetch('http://localhost:3000/api', {
    headers: { Accept: "application/json", method: "GET" }
  }).then(res => res.json())
}

const NotePage: NextPage<TNotePage> = async (props) => {

  const response = await fetchTestApi();

  console.log('response', response);

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

      <Editor />
    </div>
  )
}

export default NotePage
