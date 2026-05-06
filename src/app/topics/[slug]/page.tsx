import { db } from "@/db";
import { notFound } from "next/navigation";
import { Button, Chip } from "@nextui-org/react";
import paths from "@/paths";
import Link from "next/link";

interface ShowTopicsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ShowTopicsPage({ params }: ShowTopicsPageProps) {
  const { slug } = await params;

  const topic = await db.topic.findFirst({
    where: { slug },
    include: { posts: { include: { user: true } } },
  });

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href={paths.home()} className="w-fit">
          <Button variant="flat" color="primary">
            Back
          </Button>
        </Link>
        <Link href={paths.postCreate(topic.slug)} className="w-fit">
          <Button color="primary">Create Post</Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Chip color="primary" size="lg">
          {topic.slug}
        </Chip>
        <h1 className="text-2xl font-bold">{topic.slug}</h1>
      </div>

      <p className="text-default-600">{topic.description}</p>

      {/* <Divider />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">
          Posts ({topic.posts.length})
        </h2>

        {topic.posts.length === 0 ? (
          <p className="text-default-400 text-sm">No posts yet.</p>
        ) : (
          topic.posts.map((post) => (
            <Link
              key={post.id}
              href={paths.postShow(topic.slug, post.id)}
              className="border rounded-lg p-4 hover:bg-default-100 transition"
            >
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-default-500 mt-1 line-clamp-2">
                {post.content}
              </p>
              <p className="text-xs text-default-400 mt-2">
                by {post.user.name ?? post.user.email}
              </p>
            </Link>
          ))
        )}
      </div> */}
    </div>
  );
}
