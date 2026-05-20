import React from "react";
import { Outlet } from "react-router";
import Hero from "~/component/Hero";

export default function HomeLayout() {
	return (
		<>
			<Hero />
			<section className="max-w-6xl mx-auto px-6 my-8">
				<Outlet />
			</section>
		</>
	);
}
