import type { Route } from "./+types/home";
import type { Project } from "~/types";
import FeaturedProjects from "~/component/FeaturedProjects";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "The Freindly Dev" },
		{ name: "description", content: "My portfolio page" },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
	const data = await res.json();

	return { projects: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { projects } = loaderData;

	return (
		<>
			<FeaturedProjects projects={projects} count={2} />
		</>
	);
}
