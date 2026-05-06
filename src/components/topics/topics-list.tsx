import { db } from "@/db";
import Link from "next/link";
import paths from "@/paths";
import { Chip } from '@nextui-org/react';

export default async function TopicsList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => (
    <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
        <Chip color="primary">{topic.slug}</Chip>
        </Link>
        
    </div>
  ));

  return (
    <div>
      {renderedTopics}
    </div>
  );
}