import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/mainconfig";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      posts ? setPosts(posts.documents) : null;
    }, []);
    console.log(posts);
  }, []);
  // useEffect(() => {
  //   appwriteService.getPosts().then((post) => {
  //     if (post) {
  //       setPosts(post.documents);
  //       console.log(post);
  //     }
  //   });
  // }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center h-[80vh]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="xl:text-7xl md:text-5xl text-2xl mt-3 font-bold text-white hover:text-gray-500">
               Add some post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
