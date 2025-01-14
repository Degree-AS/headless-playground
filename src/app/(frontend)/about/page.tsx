const getFakeServerData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "Important server data";
};

export default async function About() {
  const fakeServerData = await getFakeServerData();
  return (
    <>
      <h1>ABOUT PAGE</h1>
      <h2>{fakeServerData}</h2>
    </>
  );
}
