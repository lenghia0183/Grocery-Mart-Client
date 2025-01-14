const ServerComponent = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<JSX.Element> => {
  const filters = await searchParams;
  console.log("filters", filters);
  console.log("ParseUrl");

  return <div>haha</div>;
};

export default ServerComponent;
