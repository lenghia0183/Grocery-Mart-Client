const ServerComponent = async ({}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
}): Promise<JSX.Element> => {
  return <div className="dark:bg-dark-300 bg-blue-300">haha</div>;
};

export default ServerComponent;
