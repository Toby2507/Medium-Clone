import Header from '@/components/Header';
import { Post } from '@/interfaces';
import { sanityClient, urlFor } from '@/sanity';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
interface postInterface {
  posts: Post[];
}

export default function Home({ posts }: postInterface) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read and connect
          </h1>
          <h2>It&apos;s easy and free to post your thinking on any topic and connect with millions of readers.</h2>
        </div>
        <figure className='hidden md:inline-flex h-32 lg:h-full'>
          <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
        </figure>
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className='h-60 w-full object-cover rounded-t-lg transition-transform duration-200 ease-in-out group-hover:scale-105'
                src={urlFor(post.mainImage).url()!}
                alt={post.title}
              />
              <div className='flex justify-between p-5 bg-white rounded-b-lg'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
    *[_type == "post"] {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }
  `;
  const posts = await sanityClient.fetch(query);
  return {
    props: { posts }
  };
};