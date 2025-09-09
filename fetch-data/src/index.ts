
import type { Post } from "./ResponseType";

    
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: Post[] = await response.json();
  return data;
}

// Promise chain style
function fetchPostsChain(): Promise<Post[]> {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: Post[]) => {
      return data;
    });
}

async function main() {
  console.log("=== Async/Await ===");
  try {
    const posts = await fetchPosts();
    console.log("Lấy bằng async/await:", posts.slice(0, 2));
  } catch (err) {
    console.error("Lỗi async/await:", err);
  }

  console.log("=== Promise Chain ===");
  fetchPostsChain()
    .then(posts => {
      console.log("Lấy bằng Promise chain:", posts.slice(0, 2));
    })
    .catch(err => {
      console.error("❌ Lỗi Promise chain:", err);
    });
}

main();