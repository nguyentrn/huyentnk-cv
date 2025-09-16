export const Avatar = () => {
  return (
    <div
      className={
        "relative !m-auto h-fit w-fit rounded-full border-2 border-rose-400 p-1"
      }
    >
      <div className={"relative h-40 w-40 overflow-hidden rounded-full"}>
        <img src={"avatar.png"} className={"relative -top-4 !my-0 bg-cover"} />
      </div>
    </div>
  );
};
