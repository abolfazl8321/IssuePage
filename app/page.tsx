import LatestIssues from "./issues/list/LatestIssues";

export default function Home({searchParams}:{searchParams:{page:string}}) {
  return (
    <LatestIssues/>
  )
}
