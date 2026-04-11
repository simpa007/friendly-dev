import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "~/component/ProjectCard";
import Pagination from "~/component/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "The Freindly Dev | Projects " },
		{ name: "description", content: "My website project portfolio" },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch("http://localhost:8000/projects");
	const data = await res.json();

	return { projects: data };
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
	const [category, setCategory] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 10;

	const { projects } = loaderData as { projects: Project[] };
	//Calculate total pages
	const totalPages = Math.ceil(projects.length / projectsPerPage);

	//Get Current pages projects
	const indexOfLast = currentPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentProjects = projects.slice(indexOfFirst, indexOfLast);

	const filterCurrentProjects = currentProjects.filter((data) => {
		return category === "All" || data.category === category;
	});

	const uniqueCategories: string[] = [
		"All",
		...new Set(currentProjects.map((cp) => cp.category)),
	];

	return (
		<>
			<h1 className="text-3xl text-white font-bold mb-8">Projects</h1>

			<div className="flex flex-wrap gap-2 mb-8">
				{uniqueCategories.map((uniqueCategorie) => {
					return (
						<button
							key={uniqueCategorie}
							onClick={() => setCategory(uniqueCategorie)}
							className={`cursor-pointer px-3 py-1 rounded text-sm ${uniqueCategorie === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
						>
							{uniqueCategorie}
						</button>
					);
				})}
			</div>

			{/* list */}
			<AnimatePresence mode="wait">
				<motion.div layout className="grid gap-6 sm:grid-cols-2">
					{filterCurrentProjects.map((project) => (
						<motion.div layout key={project.id}>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
		</>
	);
}
