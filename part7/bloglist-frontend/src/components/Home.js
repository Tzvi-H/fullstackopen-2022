import { useRef } from "react";
import CreateBlogForm from "../components/CreateBlogForm";
import Togglable from "../components/Togglable";
import Blogs from "../components/Blogs";

const Home = () => {
  const togglableFormRef = useRef();
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new" ref={togglableFormRef}>
        <CreateBlogForm ref={blogFormRef} togglableFormRef={togglableFormRef} />
      </Togglable>
      <Blogs />
    </>
  );
};

export default Home;
