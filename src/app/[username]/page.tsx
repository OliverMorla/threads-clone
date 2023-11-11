const Dashboard = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  return (
    <main>
      <h1>{username}</h1>
    </main>
  );
};

export default Dashboard;
