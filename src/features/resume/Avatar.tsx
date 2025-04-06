export const Avatar = () => {
  return (
    <div
      className={
        "relative !m-auto h-fit w-fit rounded-full border-2 border-rose-400 p-1"
      }
    >
      <div className={"relative h-40 w-40 overflow-hidden rounded-full"}>
        <img
          src={
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={"relative -top-4 !my-0 bg-cover"}
        />
      </div>
    </div>
  );
};
