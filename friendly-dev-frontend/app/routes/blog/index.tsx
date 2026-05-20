import React, { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "~/component/PostCard";
import Pagination from "~/component/Pagination";
import PostFilter from "~/component/PostFilter";

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
	const url = new URL("/posts-meta.json", request.url);
	const res = await fetch(url.href);
	if (!res.ok) throw new Error("Failed to fetch data");

	const data = await res.json();
	data.sort((a: PostMeta, b: PostMeta) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return { posts: data };
}

export default function Blog({ loaderData }: Route.ComponentProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 10;
	const { posts } = loaderData;

	//Calculate total pages
	const totalPages = Math.ceil(posts.length / projectsPerPage);

	//Get Current pages projects
	const indexOfLast = currentPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentPosts = posts.slice(indexOfFirst, indexOfLast);

	//filter posts by Search

	const filterPosts = currentPosts.filter((post) => {
		const query = searchQuery.toLowerCase();
		return (
			post.title.toLowerCase().includes(query) ||
			post.excerpt.toLowerCase().includes(query)
		);
	});

	return (
		<div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
			<h2 className="text-3xl text-white font-bold mb-8">Blog</h2>

			<PostFilter
				searchQuery={searchQuery}
				onSearchChange={(value) => {
					setSearchQuery(value);
					setCurrentPage(1);
				}}
			/>

			<div className="space-y-8">
				{filterPosts.length === 0 ? (
					<p className="text-gray-400 text-center">No posts found</p>
				) : (
					filterPosts.map((post) => <PostCard key={post.slug} post={post} />)
				)}
			</div>

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
