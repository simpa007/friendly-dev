import React from "react";
import { Outlet } from "react-router";
import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "The Freindly Dev" },
		{ name: "description", content: "My portfolio page" },
	];
}

export default function MainLayout() {
	return (
		<>
			<section className="max-w-6xl mx-auto px-6 my-8">
				<Outlet />
			</section>
		</>
	);
}
