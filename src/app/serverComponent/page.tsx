import { getQueryState } from '@/utils/getQueryState';

const ServerComponent = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<JSX.Element> => {
  const searchParamsTest = await searchParams;
  console.log('searchParamsTest', searchParamsTest);
  const { page, pageSize } = await getQueryState(searchParamsTest);
  console.log('page', page);
  console.log('pageSize', pageSize);
  return <div>haha</div>;
};

export default ServerComponent;
